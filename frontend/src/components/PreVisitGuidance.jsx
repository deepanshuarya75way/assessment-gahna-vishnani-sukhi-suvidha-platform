import { preVisitGuides } from "../data/preVisitGuides"
import { pharmacies } from "../data/pharmacies"

export default function PreVisitGuidance({doctor}){

const guide = preVisitGuides[doctor.specialty]

return(

<div>

<h2>Before Visiting {doctor.name}</h2>

<h3>Temporary Medicines</h3>

<ul>
{guide.medicines.map((m,i)=>(
<li key={i}>{m}</li>
))}
</ul>

<h3>Recommended Tests</h3>

<ul>
{guide.tests.map((t,i)=>(
<li key={i}>{t}</li>
))}
</ul>

<h3>Nearby Pharmacies</h3>

<ul>
{pharmacies.map((p,i)=>(
<li key={i}>{p.name} – {p.distance}</li>
))}
</ul>

</div>

)

}