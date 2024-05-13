import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DraggableMarker from "./DraggableMarker";
import { useAppContext } from "../AppContext";
import Service from "../../Services/ApiService";
import { IoMdClose } from "react-icons/io";

const Map = () => {
  const { isMapVisible, setIsMapVisible, setApiData, setIsLoading } = useAppContext();
  const { latitude, longitude } = useAppContext();
  const position = [latitude, longitude];
  const [markerPosition, setMarkerPosition] = useState([52.301049, 19.244988711]);
  const service = new Service();

  const handleMapAppear = async () => {
    setIsLoading(true);
    setIsMapVisible(false);
    const data = await service.get(markerPosition[0], markerPosition[1]);
    setApiData(data);
    setIsLoading(false);
  };

  const handleMarkerPositionChange = async (position) => {
    setMarkerPosition(position);
  };

  return (
    isMapVisible && (
      <div className="absolute z-10 flex items-center justify-center w-screen h-screen bg-black/70">
        <div className="block">
          <div className="flex items-center justify-end text-4xl mb-[50px] text-white mr-[50px] sm:mr-0">
            <IoMdClose className="cursor-pointer hover:scale-150 " onClick={() => setIsMapVisible(false)} />
          </div>
          <div className="items-center justify-center block map">
            <MapContainer center={position} zoom={5} scrollWheelZoom={true}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <DraggableMarker onPositionChange={handleMarkerPositionChange} />
            </MapContainer>
          </div>
          <div className="flex">
            <button className="w-full p-2 my-8 text-2xl font-semibold tracking-wider bg-blue-500 rounded-full maxtext-white hover:bg-blue-700 max-w-[400px] sm:w-full mx-auto text-white" onClick={handleMapAppear}>
              SEARCH
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Map;
