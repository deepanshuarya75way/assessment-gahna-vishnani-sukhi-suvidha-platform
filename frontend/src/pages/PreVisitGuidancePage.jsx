import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { preVisitGuides } from "../data/preVisitGuides";
import { pharmacies } from "../data/pharmacies";

export default function PreVisitGuidancePage(){

const {state} = useLocation()
const navigate = useNavigate()

const doctor = state?.doctor
const type = state?.type

const guide = preVisitGuides[doctor?.specialty]

return(

<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">

<div className="max-w-4xl mx-auto">

{/* Page Title */}

<motion.h1
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="text-3xl font-bold text-center mb-10"
>

Before Your Visit

</motion.h1>


{/* Doctor Card */}

<motion.div
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center gap-6"
>

<img
src={doctor.photo}
className="w-20 h-20 rounded-full"
/>

<div>

<h2 className="text-xl font-semibold">

{doctor.name}
<span className="text-green-600 ml-2 text-sm">✔ Verified</span>

</h2>

<p className="text-indigo-600">{doctor.specialty}</p>

<p className="text-gray-500">{doctor.hospital}</p>

<p className="text-sm text-gray-400">
Consultation Type: {type}
</p>

</div>

</motion.div>


{/* Medicines */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.2}}
className="bg-white rounded-xl shadow p-6 mb-6"
>

<h3 className="text-lg font-semibold mb-3">

💊 Temporary Medicines

</h3>

<ul className="list-disc pl-5 text-gray-600">

{guide?.medicines.map((m,i)=>(
<li key={i}>{m}</li>
))}

</ul>

<p className="text-sm text-gray-400 mt-3">
These medicines are for temporary relief until your consultation.
</p>

</motion.div>


{/* Tests */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.3}}
className="bg-white rounded-xl shadow p-6 mb-6"
>

<h3 className="text-lg font-semibold mb-3">

🧪 Recommended Tests

</h3>

<ul className="list-disc pl-5 text-gray-600">

{guide?.tests.map((t,i)=>(
<li key={i}>{t}</li>
))}

</ul>

</motion.div>


{/* Pharmacies */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.4}}
className="bg-white rounded-xl shadow p-6 mb-6"
>

<h3 className="text-lg font-semibold mb-3">

🏥 Nearby Partner Pharmacies

</h3>

<ul className="text-gray-600">

{pharmacies.map((p,i)=>(

<li key={i} className="flex justify-between border-b py-2">

<span>{p.name}</span>

<span className="text-gray-400">{p.distance}</span>

</li>

))}

</ul>

</motion.div>


{/* Things to Bring */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{delay:0.5}}
className="bg-white rounded-xl shadow p-6 mb-8"
>

<h3 className="text-lg font-semibold mb-3">

📋 Things to Bring for Your Visit

</h3>

<ul className="list-disc pl-5 text-gray-600">

<li>Previous prescriptions</li>
<li>Medical reports</li>
<li>Insurance card (if available)</li>
<li>ID proof</li>

</ul>

</motion.div>


{/* Back Button */}

<div className="text-center">

<button
onClick={()=>navigate("/facilities")}
className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
>

Back to Facilities

</button>

</div>

</div>

</div>

)

}