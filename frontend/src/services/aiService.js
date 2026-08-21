// EXISTING FUNCTION (KEEP)
export const detectSpecialty = async (symptoms) => {
  const formData = new FormData();
  formData.append("symptoms", symptoms);

  const res = await fetch("http://localhost:8000/detect-specialty", {
    method: "POST",
    body: formData,
  });

  return res.json();
};

// ✅ NEW: CHAT FUNCTION (GEMINI)
export const sendMessage = async (message) => {
  try {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    return await res.json();
  } catch (error) {
    console.error("Chat error:", error);
    return { reply: "Error connecting to AI." };
  }
};

// ✅ NEW: PREDICTION FUNCTION
export const getPrediction = async (data) => {
  try {
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.error("Prediction error:", error);
    return null;
  }
};