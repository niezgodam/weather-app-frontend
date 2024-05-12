import React from "react";
import { useAppContext } from "../AppContext";
import { VscError } from "react-icons/vsc";

const InfoPopup = () => {
  const { alertInformation,setAlertInformation, setIsLoading } = useAppContext();

  const handleConfirm = () => {
    setAlertInformation("");
    setIsLoading(false);
  };

  return alertInformation !== "" ? (
    <div className="absolute z-10 flex items-center justify-center w-screen h-screen bg-black/70">
      <div className="bg-white min-h-[400px] rounded-3xl">
        <div className="flex justify-center py-8">
          <VscError fill="red" size={100} />
        </div>
        <div className="pb-8 mx-4 min-w-[500px] block ">
          <h1 className="flex justify-center py-2 text-4xl font-bold tracking-widest">ERROR</h1>
          <h1 className="text-lg text-center text-pretty max-w-[400px] mx-auto h-[80px]">{alertInformation}</h1>
        </div>
        <div className="mb-8">
          <button className="flex items-center justify-center p-4 px-4 mx-auto text-center text-white bg-red-600 rounded-full min-w-[300px] font-thin tracking-widest" onClick={handleConfirm}>
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default InfoPopup;
