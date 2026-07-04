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
  ville: string;
  latitude: number;
  longitude: number;
  adresse?: string;
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
    e.latitude,
    e.longitude,
  ]}
>

          
<Popup>
  <strong>
    🏢 {e.entreprise}
  </strong>

  <br />

  📍 {e.ville}

  <br />
  <br />

  {e.apprentis?.map(
    (nom, index) => (
      <div key={index}>
        👨‍🎓 {nom}
      </div>
    )
  )}

  <br />

  <a
    href={`https://maps.google.com/?q=${encodeURIComponent(
      `${e.adresse || ""} ${e.ville}`
    )}`}
    target="_blank"
    rel="noreferrer"
    style={{
      color: "#005CA9",
      fontWeight: "bold",
      }}
  >
    📍 Ouvrir dans Google Maps
  </a>
</Popup>

        </Marker>
      ))}
    </MapContainer>
  );
}
