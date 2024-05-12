import MainWeather from "./components/MainWeatherComponents/MainWeather";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import darkModeBackground from "./assets/darkMode_background.jpg";
import lightModeBackground from "./assets/lightMode_background.jpg";
import { AppProvider, useAppContext } from "./components/AppContext";
import InfoPopup from "./components/Popup/InfoPopup";
import Map from "./components/Map/Map";

const App = () => {
  const { theme } = useAppContext();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const backgroundImage = theme === "dark" ? darkModeBackground : lightModeBackground;

  return (
    <div className="h-screen duration-300 ease-in bg-cover" style={{ backgroundImage: `url(${backgroundImage})`, filter: "brightness(85%)" }}>
      <Map />
      <InfoPopup />
      <Navbar />
      <MainWeather />
    </div>
  );
};

export default App;
