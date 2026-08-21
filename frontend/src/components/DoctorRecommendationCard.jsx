import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DoctorRecommendationCard({ doctor, setStep }) {

  const navigate = useNavigate();

  // Safety check (prevents crash if doctor is undefined)
  if (!doctor) {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h2 className="text-xl font-semibold text-red-500">
          No suitable doctor found
        </h2>
        <p className="text-gray-500 mt-2">
          Please try describing your symptoms differently.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >

      <div className="flex items-center gap-6">

        {/* Doctor Photo */}
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover"
        />

        {/* Doctor Details */}
        <div>

          <h2 className="text-xl font-bold">
            {doctor.name}

            {doctor.verified && (
              <span className="text-green-600 ml-2 text-sm">
                ✔ Verified
              </span>
            )}
          </h2>

          <p className="text-indigo-600 font-medium">
            {doctor.specialty}
          </p>

          <p className="text-gray-500">
            {doctor.hospital}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {doctor.degree}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            ⭐ {doctor.rating} • {doctor.experience}
          </p>

          <p className="text-sm text-gray-500">
            {doctor.patients}
          </p>

        </div>

      </div>


      {/* Buttons Section */}

      <div className="mt-6 flex gap-4">

        <button
          onClick={() => navigate("/doctor-dashboard")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          View Doctor Analytics
        </button>

        <button
          onClick={() => setStep(4)}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Proceed to Appointment
        </button>

      </div>

    </motion.div>
  );
}