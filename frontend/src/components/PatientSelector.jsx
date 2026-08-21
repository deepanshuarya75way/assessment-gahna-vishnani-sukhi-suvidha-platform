import { motion } from "framer-motion";
import { useState } from "react";
import FamilyMemberForm from "./FamilyMemberForm";

export default function PatientSelector({setSelectedPatient,setStep}){

const [family,setFamily] = useState([
{name:"You",relation:"Self"}
])

const [showForm,setShowForm] = useState(false)

return(

<div>

<h2 className="text-2xl font-semibold mb-6">Select Patient</h2>

<div className="grid md:grid-cols-3 gap-6">

{family.map((member,i)=>(

<motion.div
whileHover={{scale:1.05}}
key={i}
onClick={()=>{
setSelectedPatient(member)
setStep(2)
}}
className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
>

<h3 className="text-lg font-semibold">{member.name}</h3>
<p className="text-gray-500">{member.relation}</p>

</motion.div>

))}

</div>

<button
onClick={()=>setShowForm(true)}
className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
>
+ Add Family Member
</button>

{showForm &&
<FamilyMemberForm
setFamily={setFamily}
family={family}
setShowForm={setShowForm}
/>
}

</div>

)

}