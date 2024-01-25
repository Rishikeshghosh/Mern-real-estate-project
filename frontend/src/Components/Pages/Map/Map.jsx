import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import GeoCoderMarker from "../../GeoCoderMarker/GeoCoderMarker";

const Map = ({ address, city, country }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={7}
      scrollWheelZoom={false}
      style={{
        height: "40vh",
        width: "100%",
        zIndex: 0,
        marginTop: "20px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoCoderMarker></GeoCoderMarker>
    </MapContainer>
  );
};

export default Map;
