
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

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
  apprentis?: string[];
};

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

      {etablissements.map((e, index) => (
        <Marker
          key={index}
          position={[
            e.latitude,
            e.longitude,
          ]}
        >
         
<Popup>
  <strong>{e.entreprise}</strong>

  <br />

  {e.ville}

  <br />
  <br />

  {e.apprentis?.map((nom, index) => (
    <div key={index}>
      👨‍🎓 {nom}
    </div>
  ))}
</Popup>

        </Marker>
      ))}
    </MapContainer>
  );
}
