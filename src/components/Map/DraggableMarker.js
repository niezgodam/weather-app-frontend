import React, { useState } from "react";
import { Marker, useMapEvents, Popup } from "react-leaflet";
import { useAppContext } from "../AppContext";
import { Icon } from "leaflet";

const DraggableMarker = ({ onPositionChange }) => {
  const { latitude, setLatitude, longitude, setLongitude } = useAppContext();
  const [markerPosition, setMarkerPosition] = useState([latitude, longitude]);

  const legalIcon = new Icon({
    iconAnchor: [20, 41],
    iconSize: [35, 35],
    iconUrl: "https://img.icons8.com/?size=48&id=13800&format=png",
  });

  const map = useMapEvents({
    click: (e) => {
      if (latitude !== null && longitude !== null && !isNaN(latitude) && !isNaN(longitude) && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        const newPosition = [e.latlng.lat, e.latlng.lng];
        setMarkerPosition(newPosition);
        onPositionChange(newPosition);
      }
    },
  });

  return (
    <Marker position={markerPosition} draggable={false} eventHandlers={{ click: () => map.flyTo(markerPosition, map.getZoom()) }} icon={legalIcon}>
      <Popup>Latitude: {Number.parseFloat(markerPosition[0]).toFixed(3)} | Longitude: {Number.parseFloat(markerPosition[1]).toFixed(3)}</Popup>
    </Marker>
  );
};

export default DraggableMarker;
