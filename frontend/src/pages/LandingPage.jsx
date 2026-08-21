import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const doctors = [
  {
    name: "Dr. Priya Sharma",
    specialty: "Gynecologist",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwZG9jdG9yfGVufDB8fDB8fHww",
  },
  {
    name: "Dr. Rohan Mehta",
    specialty: "Cardiologist",
    rating: "5.0",
    img: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwZG9jdG9yfGVufDB8fDB8fHww",
  },
  {
    name: "Dr. Aman Patel",
    specialty: "Pediatrician",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwZG9jdG9yfGVufDB8fDB8fHww",
  },
  {
    name: "Dr. Kavita Desai",
    specialty: "General Physician",
    rating: "5.0",
    img: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwZG9jdG9yfGVufDB8fDB8fHww",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const name = localStorage.getItem("userName") || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f7f1] via-[#eef4ff] to-[#d9f3ec]">

      {/* CONTAINER (IMPORTANT FIX) */}
      <div className="max-w-7xl mx-auto px-6">

        {/* NAVBAR */}
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold text-green-700">
            🌸 Sukhi Suvidha
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">
              Hello, {name}
            </span>
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              {name[0]}
            </div>
          </div>
        </div>

        {/* HERO */}
        <div className="grid md:grid-cols-2 items-center gap-10 py-12">

          <div>
            <h1 className="text-5xl font-bold text-green-800 leading-tight">
              Healthcare Made Simple,
              <br /> Accessible & Smart
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              AI-powered health services at your fingertips
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => navigate("/facilities")}
                className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700"
              >
                Explore Facilities
              </button>

              <button className="bg-white px-6 py-3 rounded-full shadow">
                Get Started 🚀
              </button>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54"
            className="rounded-2xl shadow-2xl"
          />
        </div>

        {/* DOCTORS */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center text-green-800">
            Our Best Doctors
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {doctors.map((doc, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition"
              >
                <img
                  src={doc.img}
                  className="w-full h-35 object-cover rounded-xl"
                />

                <h3 className="mt-3 font-semibold">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.specialty}</p>
                <p className="text-yellow-500">⭐ {doc.rating}</p>

                <button
                  onClick={() => navigate("/doctors-consultation")}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg"
                >
                  Consult Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES + REVIEWS */}
        <div className="grid md:grid-cols-2 gap-8 py-12">

          {/* FEATURES */}
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Most Loved Features
            </h2>

            <div className="space-y-4">
              <div
                onClick={() => navigate("/doctors-consultation")}
                className="bg-white p-5 rounded-xl shadow cursor-pointer hover:scale-105 transition"
              >
                Doctor Consultation →
              </div>

              <div
                onClick={() => navigate("/report-analyzer")}
                className="bg-white p-5 rounded-xl shadow cursor-pointer hover:scale-105 transition"
              >
                Report Analyzer →
              </div>

              <div
                onClick={() => navigate("/nearby-hospitals")}
                className="bg-white p-5 rounded-xl shadow cursor-pointer hover:scale-105 transition"
              >
                Nearby Hospitals →
              </div>
            </div>
          </div>

          {/* REVIEWS */}
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Customer Reviews
            </h2>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="font-semibold">
                Anita Devi ⭐⭐⭐⭐⭐
              </p>
              <p className="text-gray-600 mt-2">
                This app helped me find a doctor instantly in my village.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold text-green-800">
            What Makes Us Different
          </h2>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => navigate("/facilities")}
              className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg"
            >
              Explore Facilities
            </button>

            <button
              onClick={() => navigate("/facilities")}
              className="bg-white px-6 py-3 rounded-full shadow"
            >
              Upload Prescription
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center py-6 border-t">
          <h3 className="text-green-700 font-semibold">
            🌸 Sukhi Suvidha
          </h3>
          <p className="text-gray-500 text-sm">
            Making healthcare accessible for everyone
          </p>
        </div>

      </div>
    </div>
  );
}