import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function ReportAnalyzerPage(){

const navigate = useNavigate()

const [reportType,setReportType] = useState("")
const [file,setFile] = useState(null)
const [result,setResult] = useState(null)
const [loading,setLoading] = useState(false)
const [error,setError] = useState("")


const handleAnalyze = async () => {

if(!reportType){
setError("Please select report type")
return
}

if(!file){
setError("Please upload report")
return
}

setError("")
setLoading(true)

const formData = new FormData()
formData.append("file",file)
formData.append("report_type",reportType)

try{

const res = await fetch("http://localhost:8000/analyze-report",{
method:"POST",
body:formData
})

const data = await res.json()

setResult(data)

}catch(err){

setError("Failed to analyze report")

}

setLoading(false)

}



return(

<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-10">

<div className="max-w-3xl mx-auto">

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="bg-white p-8 rounded-xl shadow-lg"
>

<h1 className="text-3xl font-bold mb-6">
Medical Report Analyzer
</h1>

<p className="text-gray-500 mb-6">
Upload your medical report and our AI will analyze it and explain the findings.
</p>


{/* REPORT TYPE */}

<label className="block font-medium mb-2">
Select Report Type
</label>

<select
className="w-full border p-3 rounded-lg mb-5"
value={reportType}
onChange={(e)=>setReportType(e.target.value)}
>

<option value="">Choose report type</option>
<option value="blood">Blood Report</option>
<option value="xray">X-Ray Report</option>
<option value="lab">Lab Report</option>

</select>



{/* FILE UPLOAD */}

<label className="block font-medium mb-2">
Upload Report (PDF or Image)
</label>

<input
type="file"
accept="image/*,application/pdf"
onChange={(e)=>setFile(e.target.files[0])}
className="mb-6"
/>



{/* ERROR */}

{error && (
<p className="text-red-500 mb-4">
{error}
</p>
)}



{/* BUTTON */}

<button
onClick={handleAnalyze}
className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
>

Analyze Report

</button>



{/* LOADING */}

{loading && (

<p className="mt-4 text-blue-600">
Analyzing report...
</p>

)}



{/* RESULTS */}

{result && (

<div className="mt-10">

<h2 className="text-xl font-semibold mb-3">
AI Analysis
</h2>

<div className="bg-gray-100 p-4 rounded-lg mb-4">

<p>
{result.ai_explanation}
</p>

</div>


<h3 className="font-semibold mb-2">
Detected Findings
</h3>

<ul className="list-disc ml-6">

{result.findings.map((f,i)=>(
<li key={i}>{f}</li>
))}

</ul>


<button
onClick={()=>navigate("/doctor-consultation")}
className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
>

Consult Doctor

</button>


</div>

)}

</motion.div>

</div>

</div>

)

}