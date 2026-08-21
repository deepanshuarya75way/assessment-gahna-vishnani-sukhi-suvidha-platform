import { useState } from "react";
import SymptomChat from "../components/SymptomChat";
import RiskDashboard from "../components/RiskDashboard";
import SuggestionsPanel from "../components/SuggestionsPanel";

export default function SymptomAnalyzerPage() {
  const [result, setResult] = useState(null);

  return (
    <div className="h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4 flex flex-col">

      <h1 className="text-2xl font-bold mb-4">
        🧠 AI Symptom Analyzer
      </h1>

      {/* MAIN GRID */}
      <div className="flex-1 grid grid-cols-2 gap-6">

        {/* CHAT */}
        <div className="h-full">
          <SymptomChat setResult={setResult} />
        </div>

        {/* RESULTS */}
        <div className="h-full overflow-y-auto pr-2 space-y-4">
          <RiskDashboard result={result} />
          <SuggestionsPanel result={result} />
        </div>

      </div>
    </div>
  );
}