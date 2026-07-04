"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { useEffect } from "react";

import L from "leaflet";

const pinIcon = (nombre: number) =>
  L.divIcon({
    html: `
      <div
        style="
          width:36px;
          height:36px;
          border-radius:50%;
          background:#005CA9;
          color:white;
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:bold;
          font-size:14px;
          border:3px solid white;
          box-shadow:0 2px 6px rgba(0,0,0,0.25);
        "
      >
        ${nombre}
      </div>
    `,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});




type Etablissement = {
  entreprise: string;
  adresse?: string;
  cp?: string;
  ville: string;
  tuteur?: string;
  telephone?: string;
  latitude: number;
  longitude: number;
  apprentis?: string[];
};




function FitBounds({
  etablissements,
}: {
  etablissements: Etablissement[];
}) {
  const map = useMap();

  useEffect(() => {
    if (etablissements.length === 0) return;

    const bounds = L.latLngBounds(
      etablissements.map((e) => [
        e.latitude,
        e.longitude,
      ])
    );

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [etablissements, map]);

  return null;
}

export default function FormateurMap({
  etablissements,
}: {
  etablissements: Etablissement[];
}) {
  return (
    <MapContainer
      center={[43.8367, 4.3601]}
      zoom={8}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds
        etablissements={etablissements}
      />

      {etablissements.map((e, index) => (
       

<Marker
  key={index}
  icon={pinIcon(
    e.apprentis?.length || 1
  )}
  position={[
    e.latitude,
    e.longitude,
  ]}
>


<Popup minWidth={260}>
  <div
    style={{
      minWidth: "260px",
    }}
  >
    <h3
      style={{
        margin: 0,
        color: "#333",
      }}
    >
      {e.entreprise}
    </h3>

    <p
      style={{
        color: "#666",
        marginTop: "8px",
        marginBottom: "12px",
        fontSize: "13px",
      }}
    >
      {e.adresse}
      <br />
      {e.cp} {e.ville}
    </p>

    {e.tuteur && (
      <div
        style={{
          marginBottom: "5px",
        }}
      >
        👤 {e.tuteur}
      </div>
    )}

    {e.telephone && (
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        📞 {e.telephone}
      </div>
    )}

    <hr />

    <div
      style={{
        fontWeight: "bold",
        color: "#888",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      👨‍🎓 {e.apprentis?.length || 0} élève(s)
    </div>

    {e.apprentis?.map(
      (nom, index) => (
        <div
          key={index}
          style={{
            marginBottom: "6px",
          }}
        >
          🟠 {nom}
        </div>
      )
    )}

    <hr />

   
<hr />

<a
  href={`https://maps.googleencodeURIComponent("
  rel="noreferrer"
  style={{
    color: "#005CA9",
    fontWeight: "bold",
    textDecoration: "none",
  }}
>
  📍 Ouvrir dans Google Maps
</a>

  </div>
</Popup>



        </Marker>
      ))}
    </MapContainer>
  );
}
