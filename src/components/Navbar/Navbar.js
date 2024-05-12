import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { RiGlobalLine } from "react-icons/ri";
import { RiMapPin2Fill } from "react-icons/ri";
import Service from "../../Services/ApiService";
import { FaMap } from "react-icons/fa6";

const Navbar = () => {
  const { setApiData, theme, setTheme, setLatitude, setLongitude, setAlertInformation, setIsMapVisible, isLoading, setIsLoading } = useAppContext();
  const [nav, setNav] = useState(true);
  const [searchLatitude, setSearchLatitude] = useState("");
  const [searchLongitude, setSearchLongitude] = useState("");
  const service = new Service();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          const data = await service.get(position.coords.latitude, position.coords.longitude);
          setApiData(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  const fetchCurrentPosition = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const data = await service.get(position.coords.latitude, position.coords.longitude);
          setApiData(data);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setIsLoading(false);
          setSearchLatitude("");
          setSearchLongitude("");
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setSearchLatitude("");
    setSearchLongitude("");
    if (!isNaN(searchLatitude) && !isNaN(searchLongitude)) {
      if (searchLatitude >= -90 && searchLatitude <= 90 && searchLongitude >= -180 && searchLongitude <= 180) {
        const data = await service.get(searchLatitude, searchLongitude);
        setApiData(data);
        setLatitude(searchLatitude);
        setLongitude(searchLongitude);
        setIsLoading(false);
      } else {
        setAlertInformation("Latitude must be within the range of -90 to 90, and Longitude must be within the range of -180 to 180");
      }
    } else {
      setAlertInformation("Latitude and longitude must be numeric values");
    }
  };

  const handleMap = () => {
    setIsMapVisible(true);
  };

  const handleNavbar = () => {
    setNav(!nav);
    if (nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  const handleLatitudeChange = (event) => {
    setSearchLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setSearchLongitude(event.target.value);
  };

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <div className="w-full items-center flex bg-white/35 dark:bg-white/15 h-[50px] max-h-[80px] min-h-[70px]">
        <AiOutlineMenu className="flex items-center self-center ml-4 cursor-pointer lg:hidden dark:text-white" size={24} onClick={handleNavbar} />
        <h1 className=" items-center justify-center ml-[2%] dark:text-3xl text-3xl font-bold dark:text-white dark:text-shadow-md lg:flex lg:visible hidden">WeatherApp</h1>
        <div className="flex items-center pl-4 pr-4">
          <h1 className="items-center hidden font-semibold lg:flex lg:visible dark:text-white">Latitude</h1>
          <input className="hidden pl-4 m-2 rounded-full outline-none bg-white/35 lg:flex lg:visible" value={searchLatitude} onChange={handleLatitudeChange}></input>
          <h1 className="items-center hidden font-semibold lg:flex lg:visible dark:text-white">Longitude</h1>
          <input className="hidden pl-4 m-2 rounded-full outline-none bg-white/35 lg:flex lg:visible" value={searchLongitude} onChange={handleLongitudeChange}></input>
          <div className="items-center hidden p-2 font-extrabold cursor-pointer lg:flex lg:visible dark:text-white" onClick={handleSearch}>
            <RiSearchLine size={24} />
          </div>
          {isLoading && (
            <div>
              <svg className="w-6 h-6 mr-3 animate-spin" viewBox="0 0 24 24">
                <circle className="text-white bg-red-500" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} class="opacity-25"></circle>
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" class="opacity-75" fill="white"></path>
              </svg>
            </div>
          )}
        </div>
        <div className="flex ml-auto  md:mr-[5%] rounded-full max-h-[50px] min-w-[200px] justify-around">
          <div className="items-center hidden py-2 duration-300 ease-in-out border-black cursor-pointer dark:border-white lg:flex lg:visible dark:text-white hover:border-b-4 hover:scale-125" onClick={fetchCurrentPosition}>
            <RiMapPin2Fill size={36} />
          </div>
          <div className="hidden py-2 duration-300 ease-in-out border-black cursor-pointer lg:flex lg:visible dark:text-white hover:border-b-4 hover:scale-125 dark:border-white" onClick={handleMap}>
            <FaMap size={36} />
          </div>
          <div className="flex py-2 duration-300 ease-in-out border-black hover:border-b-4 hover:scale-125 dark:border-white">{theme !== "dark" ? <MdDarkMode className="flex cursor-pointer " onClick={handleThemeSwitch} size={36} /> : <MdLightMode className="flex cursor-pointer" onClick={handleThemeSwitch} size={36} fill="white" />}</div>
        </div>
      </div>

      <div className={nav ? "bg-black/80 w-full  flex-col justify-center items-center text-center hidden" : "h-[100vh] bg-black/80 w-full flex flex-col items-center text-center lg:hidden"}>
        <h1 className="mt-[5%] absolute text-4xl font-bold text-white">WeatherApp</h1>
        <div className="flex w-full mb-[200px] pt-2"></div>
        <div>
          <ul className="block">
            <li className="px-12 py-4 text-2xl font-bold text-white border-b-2 border-gray-400">
              <h1 className="items-center font-semibold text-white">Latitude</h1>
              <input className="visible pl-4 m-2 rounded-full outline-none bg-white/35" value={searchLatitude} onChange={handleLatitudeChange}></input>
            </li>
            <li className="px-12 py-4 text-2xl font-bold text-white border-b-2 border-gray-400">
              <h1 className="items-center font-semibold dark:text-white">Longitude</h1>
              <input className="pl-4 m-2 rounded-full outline-none bg-white/35 " value={searchLongitude} onChange={handleLongitudeChange}></input>
            </li>
            <li className="flex items-center justify-center px-12 py-4 text-2xl font-bold text-white border-b-2 border-gray-400">
              <div
                className="items-center p-2 font-extrabold cursor-pointer dark:text-white"
                onClick={() => {
                  handleSearch();
                  setNav(!nav);
                }}
              >
                <RiSearchLine size={24} />
              </div>
            </li>
            <li className="flex items-center justify-center px-12 py-4 text-2xl font-bold text-white border-b-2 border-gray-400">
              <div
                className="items-center p-2 font-extrabold cursor-pointer dark:text-white"
                onClick={() => {
                  fetchCurrentPosition();
                  setNav(!nav);
                }}
              >
                <RiGlobalLine size={24} />
              </div>
            </li>
            <li className="flex items-center justify-center px-12 py-4 text-2xl font-bold text-white border-b-2 border-gray-400">
              <div
                className="items-center p-2 font-extrabold cursor-pointer dark:text-white"
                onClick={() => {
                  handleMap();
                  setNav(!nav);
                }}
              >
                <RiMapPin2Fill size={24} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
