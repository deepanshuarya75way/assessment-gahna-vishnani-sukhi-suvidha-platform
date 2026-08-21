import os
import uuid
import logging
from typing import Dict

import cv2
import easyocr
from gtts import gTTS
from pdf2image import convert_from_path

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from sentence_transformers import SentenceTransformer, util

# ---------------- INIT ----------------

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("backend")

app = FastAPI(title="AI Healthcare Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- FOLDERS ----------------

os.makedirs("uploads", exist_ok=True)
os.makedirs("uploads/processed", exist_ok=True)
os.makedirs("audio/output", exist_ok=True)

# =========================================================
# 🧠 SYMPTOM ANALYZER (FULL SYSTEM)
# =========================================================

SYMPTOM_FLOWS = {
    "Headache": ["duration", "severity"],
    "Fever": ["temperature", "other"],
    "Stomach Pain": ["location", "duration"],
    "Fatigue": ["duration", "sleep"],
    "Chest Pain": ["severity", "breathing"],
    "Cold": ["duration", "cough"],
    "Dizziness": ["frequency", "trigger"],
    "Body Pain": ["area", "severity"]
}

QUESTIONS = {
    "duration": {
        "question": "How long have you been experiencing this?",
        "options": ["Today", "2-3 days", "More than a week"]
    },
    "severity": {
        "question": "How severe is it?",
        "options": ["Mild", "Moderate", "Severe"]
    },
    "temperature": {
        "question": "What is your fever level?",
        "options": ["Low", "High"]
    },
    "other": {
        "question": "Any other symptoms?",
        "options": ["Cough", "Cold", "Weakness"]
    },
    "location": {
        "question": "Where exactly?",
        "options": ["Upper abdomen", "Lower abdomen"]
    },
    "sleep": {
        "question": "Are you getting proper sleep?",
        "options": ["Yes", "No"]
    },
    "breathing": {
        "question": "Any breathing issues?",
        "options": ["Yes", "No"]
    },
    "cough": {
        "question": "Do you have cough?",
        "options": ["Yes", "No"]
    },
    "frequency": {
        "question": "How often?",
        "options": ["Occasional", "Frequent"]
    },
    "trigger": {
        "question": "When does it happen?",
        "options": ["Standing", "Walking"]
    },
    "area": {
        "question": "Where exactly?",
        "options": ["Neck", "Back", "Joint"]
    }
}

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()

    message = data.get("message")
    step = data.get("step", "start")
    symptom = data.get("symptom")
    answers = data.get("answers", {})

    if step == "start":
        return {
            "reply": "Hi 👋 How are you feeling today?",
            "options": ["Good", "Okay", "Not well"],
            "next_step": "symptoms",
            "answers": {}
        }

    elif step == "symptoms":
        return {
            "reply": "What symptoms are you experiencing?",
            "options": list(SYMPTOM_FLOWS.keys()),
            "next_step": "q1",
            "symptom": message,
            "answers": {}
        }

    elif step == "q1":
        answers["symptom"] = symptom
        return {
            "reply": "How long have you had this?",
            "options": ["Today", "2-3 days", "More than a week"],
            "next_step": "q2",
            "symptom": symptom,
            "answers": answers
        }

    elif step == "q2":
        answers["duration"] = message
        return {
            "reply": "How severe is it?",
            "options": ["Mild", "Moderate", "Severe"],
            "next_step": "q3",
            "symptom": symptom,
            "answers": answers
        }

    elif step == "q3":
        answers["severity"] = message
        return {
            "reply": "Any other symptoms?",
            "options": ["Yes", "No"],
            "next_step": "predict",
            "symptom": symptom,
            "answers": answers
        }

    return {"reply": "Analyzing...", "options": []}


@app.post("/predict")
async def predict(request: Request):
    data = await request.json()

    symptom = data.get("symptom")
    answers = data.get("answers", {})

    severity = (answers.get("severity") or "").lower()
    duration = (answers.get("duration") or "").lower()

    risk = 30
    level = "Low"
    diseases = ["General issue"]
    action = "✅ Home care sufficient"

    # ---------------- BODY PAIN ----------------
    if symptom == "Body Pain":

        if severity == "severe" and duration == "more than a week":
            risk = 85
            level = "High"
            diseases = ["Chronic muscle inflammation"]
            action = "🚨 You should visit a doctor immediately"

        elif severity == "severe":
            risk = 70
            level = "High"
            diseases = ["Muscle injury"]
            action = "⚠️ Consult doctor soon"

        elif duration == "more than a week":
            risk = 60
            level = "Medium"
            diseases = ["Muscle strain"]
            action = "⚠️ Monitor and consider doctor visit"

    # ---------------- HEADACHE ----------------
    elif symptom == "Headache":

        if severity == "severe":
            risk = 75
            level = "High"
            diseases = ["Migraine"]
            action = "⚠️ Consult doctor"

        else:
            risk = 40
            level = "Medium"
            diseases = ["Stress headache"]
            action = "Rest and hydration"

    # ---------------- CHEST PAIN ----------------
    elif symptom == "Chest Pain":
        risk = 90
        level = "High"
        diseases = ["Heart condition"]
        action = "🚨 Immediate medical attention required"

    return {
        "risk_score": risk,
        "risk_level": level,
        "diseases": diseases,
        "action": action,
        "symptom": symptom
    }

# =========================================================
# 🏥 SPECIALTY DETECTION
# =========================================================

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

SPECIALTIES = {
    "cardiologist": ["chest pain", "heart pain", "shortness of breath"],
    "orthopedicSurgeon": ["knee pain", "joint pain", "bone fracture"],
    "pediatrician": ["child fever", "baby illness"],
    "gynecologist": ["pregnancy", "pcos", "period pain"],
    "dermatologist": ["skin rash", "acne"]
}

def detect_specialty(symptom: str):
    emb = embedding_model.encode(symptom, convert_to_tensor=True)

    best, score = None, 0

    for sp, examples in SPECIALTIES.items():
        ex_emb = embedding_model.encode(examples, convert_to_tensor=True)
        s = util.cos_sim(emb, ex_emb).max()

        if s > score:
            best, score = sp, s

    return best


@app.post("/detect-specialty")
async def detect_specialty_api(symptoms: str = Form(...)):
    return {
        "symptoms": symptoms,
        "recommended_specialty": detect_specialty(symptoms)
    }

# =========================================================
# 📄 OCR (UPLOAD PRESCRIPTION)
# =========================================================

OCR_LANG_MAP = {"en": ["en"], "hi": ["hi", "en"]}
readers: Dict[str, easyocr.Reader] = {}

def get_reader(lang: str):
    if lang not in readers:
        readers[lang] = easyocr.Reader(OCR_LANG_MAP[lang], gpu=False)
    return readers[lang]


def preprocess_image(path: str):
    try:
        img = cv2.imread(path)
        if img is None:
            return path

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)

        thresh = cv2.adaptiveThreshold(
            blur, 255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY, 11, 2
        )

        out = f"uploads/processed/{os.path.basename(path)}"
        cv2.imwrite(out, thresh)
        return out
    except Exception as e:
        print("OpenCV error:", e)
        return path


def make_audio(text: str, lang: str):
    if not text:
        return None

    fn = f"{uuid.uuid4().hex}.mp3"
    gTTS(text=text, lang=lang if lang in ["en", "hi"] else "en")\
        .save(f"audio/output/{fn}")

    return fn


@app.post("/upload-ocr")
async def upload_ocr(uploadFile: UploadFile = File(...), language_code: str = Form(...)):
    path = f"uploads/{uuid.uuid4().hex}_{uploadFile.filename}"

    with open(path, "wb") as f:
        f.write(uploadFile.file.read())

    processed = preprocess_image(path)

    results = get_reader(language_code).readtext(processed, detail=0)
    text = " ".join(results)

    audio = make_audio(text, language_code)

    return {
        "text": text,
        "audio_url": f"/audio/{audio}" if audio else None
    }

# =========================================================
# 📊 REPORT ANALYZER
# =========================================================

REPORT_TYPES = {
    "blood": ["hemoglobin", "wbc", "rbc", "glucose"],
    "xray": ["fracture", "infection", "pneumonia"],
    "lab": ["vitamin", "thyroid", "creatinine"]
}

def convert_pdf_to_image(pdf_path):
    pages = convert_from_path(pdf_path)
    img_path = f"uploads/processed/{uuid.uuid4().hex}.png"
    pages[0].save(img_path, "PNG")
    return img_path


@app.post("/analyze-report")
async def analyze_report(file: UploadFile = File(...), report_type: str = Form(...)):
    path = f"uploads/{uuid.uuid4().hex}_{file.filename}"

    with open(path, "wb") as f:
        f.write(file.file.read())

    if file.filename.endswith(".pdf"):
        path = convert_pdf_to_image(path)

    processed = preprocess_image(path)

    results = get_reader("en").readtext(processed, detail=0)
    text = " ".join(results)

    findings = [k for k in REPORT_TYPES.get(report_type, []) if k in text.lower()]

    return {
        "report_type": report_type,
        "extracted_text": text,
        "findings": findings
    }

# =========================================================
# 🔊 AUDIO ROUTE
# =========================================================

@app.get("/audio/{file}")
def audio(file: str):
    return FileResponse(f"audio/output/{file}")