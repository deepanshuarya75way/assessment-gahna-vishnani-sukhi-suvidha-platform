import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";

export default function RiskDashboard({ result }) {
  if (!result) {
    return (
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
        <p className="text-gray-500">No analysis yet</p>
      </div>
    );
  }

  const data = [
    { name: "Risk", value: result.risk_score },
    { name: "Safe", value: 100 - result.risk_score },
  ];

  const COLORS =
    result.risk_level === "High"
      ? ["#ef4444", "#fecaca"]
      : result.risk_level === "Medium"
      ? ["#f59e0b", "#fde68a"]
      : ["#22c55e", "#bbf7d0"];

  return (
    <motion.div
      key={result.risk_score} // 🔥 force re-render
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
    >
      <h2 className="text-xl font-bold mb-4">
        📊 Health Analysis
      </h2>

      {/* PIE CHART */}
      <div className="flex justify-center">
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </div>

      {/* INFO */}
      <div className="mt-4 space-y-2 text-center">
        <p className="font-semibold text-lg">
          Risk Level: {result.risk_level}
        </p>

        <p className="text-sm text-gray-600">
          Score: {result.risk_score}%
        </p>

        <p className="text-sm font-medium">
          {result.action}
        </p>
      </div>
    </motion.div>
  );
}