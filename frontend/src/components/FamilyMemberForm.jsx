import { useState } from "react"

export default function FamilyMemberForm({family,setFamily,setShowForm}){

const [name,setName] = useState("")
const [relation,setRelation] = useState("")

const addMember = ()=>{

setFamily([...family,{name,relation}])

setShowForm(false)

}

return(

<div className="mt-4">

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-2"
/>

<input
placeholder="Relation"
value={relation}
onChange={(e)=>setRelation(e.target.value)}
className="border p-2 ml-2"
/>

<button
onClick={addMember}
className="bg-green-600 text-white px-3 py-2 ml-2"
>

Add

</button>

</div>

)

}