import { useState } from "react";
import { motion } from "framer-motion";

import PatientSelector from "../components/PatientSelector";
import HealthAssessmentForm from "../components/HealthAssessmentForm";
import DoctorRecommendationCard from "../components/DoctorRecommendationCard";
import AppointmentTypeSelector from "../components/AppointmentTypeSelector";

export default function DoctorsConsultationPage(){

const [step,setStep] = useState(1)
const [selectedPatient,setSelectedPatient] = useState(null)
const [recommendedDoctor,setRecommendedDoctor] = useState(null)

const steps = ["Patient","Symptoms","Doctor","Appointment"]

return(

<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">

<div className="max-w-4xl mx-auto">

{/* Header */}

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-4xl font-bold text-center mb-10"
>
AI Doctor Consultation
</motion.h1>


{/* Step Progress */}

<div className="flex justify-between mb-10">

{steps.map((s,i)=>(
<div key={i} className="flex flex-col items-center">

<div className={`w-10 h-10 flex items-center justify-center rounded-full
${step >= i+1 ? "bg-indigo-600 text-white" : "bg-gray-300"}`}>

{i+1}

</div>

<p className="text-sm mt-2">{s}</p>

</div>
))}

</div>


{/* Step Views */}

<motion.div
key={step}
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{duration:0.4}}
>

{step===1 &&
<PatientSelector
setSelectedPatient={setSelectedPatient}
setStep={setStep}
/>
}

{step===2 &&
<HealthAssessmentForm
setRecommendedDoctor={setRecommendedDoctor}
setStep={setStep}
/>
}

{step===3 && recommendedDoctor &&
<DoctorRecommendationCard
doctor={recommendedDoctor}
setStep={setStep}
/>
}

{step===4 &&
<AppointmentTypeSelector
doctor={recommendedDoctor}
/>
}

</motion.div>

</div>

</div>

)

}