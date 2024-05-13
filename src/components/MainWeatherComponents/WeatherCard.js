import React from "react";
import allWeather from "../../IconsImport/WeatherIcons";
import { useAppContext } from "../AppContext";

const dayOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WeatherCard = ({ index }) => {
  const { theme, apiData } = useAppContext();

  const currentDate = new Date(apiData?.daily?.time?.[index]);
  const numberDayWeek = currentDate.getDay();
  const nameDayWeek = dayOfTheWeek[numberDayWeek];
  
  const originalDate = new Date(apiData?.daily?.time?.[index]);
  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1; 
  const year = originalDate.getFullYear();
  const formattedDateString = `${day}/${month}/${year}`;

  return (
    <div
      className={
        `min-w-[250px] h-[450px] sm:min-w-[300px] sm:h-[650px] mx-4 dark:bg-white/30 rounded-3xl hover:shadow-md  hover:shadow-black font-semibold tracking-wide shadow-sm shadow-black dark:shadow-white  dark:hover:shadow-white hover:mx-[50px] hover:scale-110 ease-in-out duration-300 dark:text-white ` +
        `${theme === "dark" ? "" : "bg-gradient-to-br from-white/40 to bg-teal-100/35"}`
      }
    >
      <img className="mx-auto w-[150px] h-[150px] sm:w-[256px] sm:h-[256px]" src={allWeather?.[apiData?.daily?.weather_code?.[index]]} alt="Icon" />
      <h1 className="py-2 text-xl text-center">{nameDayWeek}</h1>
      <h1 className="text-2xl text-center">{formattedDateString}</h1>
      <div className="grid grid-cols-2 border-b border-black dark:border-white mt-[10%] mx-2">
        <h1 className="p-2 text-sm text-center sm:text-xl">HIGH TEMPERATURE</h1>
        <h1 className="flex items-center justify-center mx-2 text-sm text-center sm:text-3xl">{apiData?.daily?.temperature_2m_max?.[index]} °C</h1>
      </div>
      <div className="grid grid-cols-2 mx-2 border-b border-black dark:border-white">
        <h1 className="p-2 text-sm text-center sm:text-xl">LOW TEMPERATURE</h1>
        <h1 className="flex items-center justify-center text-sm text-center sm:text-3xl">{apiData?.daily?.temperature_2m_min?.[index]} °C</h1>
      </div>
      <div className="grid grid-cols-2 mx-2">
        <h1 className="p-2 text-sm text-center sm:text-xl">PREDICTED ENERGY</h1>
        <h1 className="flex items-center justify-center text-sm text-center sm:text-3xl">{apiData?.daily?.generated_energy_kwh?.[index]} kWh</h1>
      </div>
    </div>
  );
};

export default WeatherCard;
