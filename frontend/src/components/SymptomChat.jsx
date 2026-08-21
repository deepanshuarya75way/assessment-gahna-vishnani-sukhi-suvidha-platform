import { useState, useEffect, useRef } from "react";

export default function SymptomChat({ setResult }) {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState("start");
  const [symptom, setSymptom] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const initialized = useRef(false);
  const chatEndRef = useRef(null);

  // 🔥 MAIN SEND FUNCTION
  const send = async (msg, isInitial = false) => {
    if (!isInitial) {
      setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    }

    setLoading(true);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: msg, step, symptom, answers }),
    });

    const data = await res.json();

    // ✅ FIX STATE
    const finalSymptom = data.symptom || symptom;
    const finalAnswers = data.answers || answers;

    // ✅ ADD BOT MESSAGE
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: data.reply,
        options: data.options,
      },
    ]);

    setStep(data.next_step);
    setSymptom(finalSymptom);
    setAnswers(finalAnswers);
    setLoading(false);

    // 🔥 CALL PREDICTION
    if (data.next_step === "predict") {
      const pred = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptom: finalSymptom,
          answers: finalAnswers,
        }),
      });

      const result = await pred.json();
      setResult(result);
    }
  };

  // 🔥 INITIAL MESSAGE (NO DUPLICATE)
  useEffect(() => {
    if (!initialized.current) {
      send("", true);
      initialized.current = true;
    }
  }, []);

  // 🔥 AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white/70 backdrop-blur-lg h-full rounded-2xl shadow-xl flex flex-col">

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-3 rounded-2xl shadow ${
              m.sender === "user"
                ? "bg-green-500 text-white ml-auto"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {m.text}

            {/* OPTIONS */}
            {m.options && (
              <div className="mt-3 flex flex-wrap gap-2">
                {m.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => send(opt)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* LOADING */}
        {loading && (
          <div className="bg-gray-200 px-4 py-2 rounded-xl w-fit text-sm">
            🤖 Analyzing...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
}