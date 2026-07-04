
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function FormateurMap() {
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

      <Marker
        position={[43.8367, 4.3601]}
      >
        <Popup>
          Nîmes
        </Popup>
      </Marker>

      <Marker
        position={[43.6766, 4.6278]}
      >
        <Popup>
          Arles
        </Popup>
      </Marker>
    </MapContainer>
  );
}
