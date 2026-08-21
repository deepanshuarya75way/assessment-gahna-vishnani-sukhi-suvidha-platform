import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Video, Hospital, Star } from "lucide-react"

import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
PieChart,
Pie,
Cell,
LineChart,
Line
} from "recharts"

const COLORS = ["#6366F1", "#22C55E"]

const patientTrend = [
{ day: "Mon", patients: 8, type: "Online" },
{ day: "Tue", patients: 12, type: "Offline" },
{ day: "Wed", patients: 6, type: "Online" },
{ day: "Thu", patients: 14, type: "Offline" },
{ day: "Fri", patients: 9, type: "Online" },
{ day: "Sat", patients: 11, type: "Offline" }
]

const consultationType = [
{ name: "Online", value: 40 },
{ name: "Offline", value: 60 }
]

export default function DoctorDashboardPage(){

const [filter,setFilter] = useState("All")

/* FILTER LOGIC */

const filteredTrend =
filter === "All"
? patientTrend
: patientTrend.filter((item)=>item.type === filter)

const filteredConsultation =
filter === "All"
? consultationType
: consultationType.filter((item)=>item.name === filter)

const totalPatients = filteredTrend.reduce(
(acc,item)=>acc + item.patients,
0
)

const onlinePatients = patientTrend
.filter(i=>i.type==="Online")
.reduce((a,b)=>a+b.patients,0)

const offlinePatients = patientTrend
.filter(i=>i.type==="Offline")
.reduce((a,b)=>a+b.patients,0)

return(

<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-indigo-200 p-10">

<div className="max-w-7xl mx-auto">

{/* HEADER */}

<motion.div
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="flex justify-between items-center mb-10"
>

<h1 className="text-4xl font-bold text-gray-800">
Doctor Analytics Dashboard
</h1>

<select
className="px-4 py-2 rounded-lg border shadow-sm bg-white"
value={filter}
onChange={(e)=>setFilter(e.target.value)}
>

<option>All</option>
<option>Online</option>
<option>Offline</option>

</select>

</motion.div>

{/* KPI CARDS */}

<div className="grid md:grid-cols-4 gap-6 mb-10">

<motion.div whileHover={{scale:1.05}}
className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg flex items-center gap-4">

<Users className="text-indigo-500"/>

<div>
<p className="text-gray-500 text-sm">Total Patients</p>
<h2 className="text-3xl font-bold">{totalPatients}</h2>
</div>

</motion.div>

<motion.div whileHover={{scale:1.05}}
className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg flex items-center gap-4">

<Video className="text-green-500"/>

<div>
<p className="text-gray-500 text-sm">Online</p>
<h2 className="text-3xl font-bold">{onlinePatients}</h2>
</div>

</motion.div>

<motion.div whileHover={{scale:1.05}}
className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg flex items-center gap-4">

<Hospital className="text-blue-500"/>

<div>
<p className="text-gray-500 text-sm">Offline</p>
<h2 className="text-3xl font-bold">{offlinePatients}</h2>
</div>

</motion.div>

<motion.div whileHover={{scale:1.05}}
className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg flex items-center gap-4">

<Star className="text-yellow-500"/>

<div>
<p className="text-gray-500 text-sm">Avg Rating</p>
<h2 className="text-3xl font-bold">4.8</h2>
</div>

</motion.div>

</div>

{/* CHARTS */}

<div className="grid md:grid-cols-2 gap-8">

{/* LINE CHART */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="bg-white p-6 rounded-xl shadow-lg">

<h3 className="font-semibold mb-4 text-lg">
Patient Trend
</h3>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={filteredTrend}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="day"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="patients"
stroke="#6366F1"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</motion.div>


{/* PIE CHART */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="bg-white p-6 rounded-xl shadow-lg">

<h3 className="font-semibold mb-4 text-lg">
Consultation Distribution
</h3>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={filteredConsultation}
dataKey="value"
outerRadius={100}
label
>

{filteredConsultation.map((entry,index)=>(

<Cell key={index} fill={COLORS[index]}/>

))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</motion.div>


{/* BAR CHART */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="bg-white p-6 rounded-xl shadow-lg md:col-span-2">

<h3 className="font-semibold mb-4 text-lg">
Patients Per Day
</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={filteredTrend}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="day"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="patients" fill="#6366F1"/>

</BarChart>

</ResponsiveContainer>

</motion.div>

</div>

</div>

</div>

)
}