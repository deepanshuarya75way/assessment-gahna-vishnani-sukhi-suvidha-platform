import { useState } from "react";
import { detectSpecialty } from "../services/aiService";
import { doctors } from "../data/doctors";

export default function HealthAssessmentForm({setRecommendedDoctor,setStep}){

const [symptoms,setSymptoms] = useState("")
const [loading,setLoading] = useState(false)

const analyze = async () => {

setLoading(true)

const data = await detectSpecialty(symptoms)

const doctor = doctors.find(
d => d.specialty.toLowerCase() === data.recommended_specialty.toLowerCase()
)

if(!doctor){
setRecommendedDoctor(doctors[0])
}else{
setRecommendedDoctor(doctor)
}

setLoading(false)

setStep(3)

}

return(

<div className="bg-white p-8 rounded-xl shadow">

<h2 className="text-xl font-semibold mb-4">Describe Symptoms</h2>

<textarea
placeholder="Example: chest pain, dizziness..."
value={symptoms}
onChange={(e)=>setSymptoms(e.target.value)}
className="border p-4 rounded-lg w-full"
/>

<button
onClick={analyze}
className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
>

{loading ? "Analyzing..." : "Analyze Symptoms"}

</button>

</div>

)

}