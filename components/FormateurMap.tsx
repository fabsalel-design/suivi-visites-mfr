
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Etablissement = {
  entreprise: string;
  adresse: string;
  cp: string;
  ville: string;
  latitude: number;
  longitude: number;
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
        height: "450px",
        width: "100%",
      }}
    >
      <TileLayer
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
            <strong>
              {e.entreprise}
            </strong>

            <br />

            {e.ville}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
