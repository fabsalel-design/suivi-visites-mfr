"use client";
 
import { useRouter } from "next/navigation";
 
export default function AffecterButton({
entreprise,
}: {
entreprise: string;
}) {
const router = useRouter();
 
return (
<button
onClick={() =>
router.push(
"/dashboard/affectations/" +
encodeURIComponent(entreprise)
)
}
style={{
backgroundColor: "#005CA9",
color: "white",
border: "none",
padding: "8px 12px",
borderRadius: "8px",
fontWeight: "bold",
cursor: "pointer",
marginBottom: "15px",
}}
>
✏️ Affecter
</button>
);
}
