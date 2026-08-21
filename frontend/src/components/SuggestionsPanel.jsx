import { motion } from "framer-motion";

export default function SuggestionsPanel({ result }) {
  if (!result) return null;

  const symptom = (result?.symptom || "").toLowerCase().trim();

  // ---------------- EXERCISE ----------------
  const exerciseMap = {
    "body pain": {
      title: "Stretching Exercises",
      image: "/images/exercise/bodypain.jpg",
      tips: [
        "Neck rotation (10 reps)",
        "Back stretching",
        "Light walking"
      ]
    },
    "headache": {
      title: "Relaxation Exercises",
      image: "/images/exercise/headache.jpg",
      tips: [
        "Deep breathing",
        "Neck stretch",
        "Eye relaxation"
      ]
    },
    "fatigue": {
      title: "Energy Boost Exercises",
      image: "/images/exercise/fatigue.jpg",
      tips: [
        "Morning walk",
        "Light yoga",
        "Stretching"
      ]
    },
    "fever": {
      title: "Light Activity",
      image: "/images/exercise/bodypain.jpg",
      tips: [
        "Rest properly",
        "Stay hydrated",
        "Avoid heavy activity"
      ]
    },
    "cold": {
      title: "Breathing Exercises",
      image: "/images/exercise/headache.jpg",
      tips: [
        "Steam inhalation",
        "Deep breathing",
        "Warm rest"
      ]
    },
    "dizziness": {
      title: "Balance & Rest",
      image: "/images/exercise/bodypain.jpg",
      tips: [
        "Sit or lie down",
        "Avoid sudden movement",
        "Drink water"
      ]
    },
    "stomach pain": {
      title: "Gentle Movement",
      image: "/images/exercise/bodypain.jpg",
      tips: [
        "Avoid heavy exercise",
        "Light walking",
        "Relax body"
      ]
    },
    "chest pain": {
      title: "⚠️ No Exercise Recommended",
      image: "/images/exercise/bodypain.jpg",
      tips: [
        "Avoid physical activity",
        "Sit calmly",
        "Seek medical help immediately"
      ]
    }
  };

  // ---------------- DIET ----------------
  const dietMap = {
    "headache": [
      "Drink plenty of water",
      "Eat magnesium-rich foods (banana, nuts)",
      "Avoid caffeine"
    ],
    "fever": [
      "Drink fluids (ORS, coconut water)",
      "Eat light food (khichdi, soup)",
      "Avoid oily food"
    ],
    "body pain": [
      "High protein diet",
      "Turmeric milk",
      "Green vegetables"
    ],
    "fatigue": [
      "Iron-rich foods",
      "Balanced meals",
      "Stay hydrated"
    ],
    "cold": [
      "Warm fluids",
      "Soup and herbal tea",
      "Vitamin C foods"
    ],
    "dizziness": [
      "Stay hydrated",
      "Avoid skipping meals",
      "Eat light food"
    ],
    "stomach pain": [
      "Avoid spicy food",
      "Eat light meals",
      "Drink warm water"
    ],
    "chest pain": [
      "Avoid heavy meals",
      "Stay calm",
      "Seek medical help"
    ]
  };

  // ---------------- ROUTINE ----------------
  const routine = [
    "Sleep 7–8 hours",
    "Avoid screens before sleep",
    "Stay hydrated",
    "Maintain a fixed daily routine"
  ];

  // ---------------- FALLBACK ----------------
  const exercise =
    exerciseMap[symptom] || exerciseMap["body pain"];

  const diet =
    dietMap[symptom] || ["Eat a balanced healthy diet"];

  // ---------------- RISK COLOR ----------------
  const riskColor =
    result.risk_level === "High"
      ? "border-red-400 bg-red-50"
      : result.risk_level === "Medium"
      ? "border-yellow-400 bg-yellow-50"
      : "border-green-400 bg-green-50";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1 }}
      className={`p-6 rounded-2xl shadow-2xl border ${riskColor} mt-4 backdrop-blur-lg`}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🧠 <span>Smart AI Recommendations</span>
      </h2>

      {/* ACTION */}
      <div className="mb-4 font-semibold text-gray-800">
        {result.action}
      </div>

      {/* EXERCISE */}
      <div className="bg-white/70 p-4 rounded-xl shadow-md mb-4">
        <h3 className="font-bold text-lg">
          🏃 {exercise.title}
        </h3>

        <img
          src={exercise.image}
          alt="exercise"
          className="w-full h-auto max-h-60 object-contain rounded-lg mt-3 bg-gray-100"
        />

        <ul className="list-disc ml-5 mt-3 text-sm">
          {exercise.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* DIET */}
      <div className="bg-white/70 p-4 rounded-xl shadow-md mb-4">
        <h3 className="font-bold text-lg">🥗 Diet Plan</h3>
        <ul className="list-disc ml-5 mt-3 text-sm">
          {diet.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>

      {/* ROUTINE */}
      <div className="bg-white/70 p-4 rounded-xl shadow-md">
        <h3 className="font-bold text-lg">🛌 Daily Routine</h3>
        <ul className="list-disc ml-5 mt-3 text-sm">
          {routine.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}