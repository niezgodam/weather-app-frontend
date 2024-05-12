import React from "react";
import WeatherCard from "./WeatherCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const numberOfDays = 7;

const MainWeather = () => {

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 300;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 300;
  };

  return (
    <div className="h-[90%] flex bg">
      <div className={`relative group w-full mx-auto flex items-center   max-w-[500px] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1500px] rounded-lg  h-[100%] my-auto`}>
        <MdChevronLeft className="absolute left-0 z-20 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block" size={40} onClick={slideLeft} fill="black" />
        <div id={"slider"} className="relative flex items-center w-full h-full py-8 overflow-x-auto scroll-smooth scrollbar-hide">
          {Array.from({ length: numberOfDays }, (_, index) => (
            <WeatherCard key={index} index={index}/>
          ))}
        </div>
        <MdChevronRight className="absolute right-0 z-20 hidden bg-white rounded-full opacity-50 cursor-pointer hover:opacity-100 group-hover:block" size={40} onClick={slideRight} fill="black" />
      </div>
    </div>
  );
};

export default MainWeather;
