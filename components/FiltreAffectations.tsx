"use client";
 
import { useState } from "react";
 
export default function FiltreAffectations({
enfants,
}: {
enfants: React.ReactNode;
}) {
const [nonAffectesSeulement, setNonAffectesSeulement] =
useState(false);
 
return (
<>
<div
style={{
marginBottom: "20px",
display: "flex",
gap: "10px",
}}
>
<button
onClick={() =>
setNonAffectesSeulement(false)
}
style={{
backgroundColor:
!nonAffectesSeulement
? "#005CA9"
: "#e5e7eb",
color:
!nonAffectesSeulement
? "white"
: "#333",
border: "none",
padding: "10px 16px",
borderRadius: "8px",
cursor: "pointer",
fontWeight: "bold",
}}
>
Tous
</button>
 
<button
onClick={() =>
setNonAffectesSeulement(true)
}
style={{
backgroundColor:
nonAffectesSeulement
? "#d97706"
: "#e5e7eb",
color:
nonAffectesSeulement
? "white"
: "#333",
border: "none",
padding: "10px 16px",
borderRadius: "8px",
cursor: "pointer",
fontWeight: "bold",
}}
>
Non affectés
</button>
</div>
 
<div
data-filtre={
nonAffectesSeulement
? "non-affectes"
: "tous"
}
>
{enfants}
</div>
</>
);
}
