import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AppointmentTypeSelector({doctor}){

const navigate = useNavigate()

const selectType = (type)=>{

navigate("/pre-visit",{
state:{doctor,type}
})

}

return(

<div>

<h2 className="text-2xl font-semibold mb-6">
Choose Consultation Type
</h2>

<div className="grid md:grid-cols-2 gap-6">

<motion.div
whileHover={{scale:1.05}}
onClick={()=>selectType("Offline")}
className="cursor-pointer bg-white p-8 rounded-xl shadow text-center"
>

🏥

<h3 className="font-semibold mt-2">
Visit Hospital
</h3>

</motion.div>

<motion.div
whileHover={{scale:1.05}}
onClick={()=>selectType("Online")}
className="cursor-pointer bg-white p-8 rounded-xl shadow text-center"
>

💻

<h3 className="font-semibold mt-2">
Online Consultation
</h3>

</motion.div>

</div>

</div>

)

}