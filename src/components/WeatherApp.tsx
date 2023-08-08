
import { AiFillGithub } from "react-icons/ai";
import { imgs } from "./../assets/imgs";
import { CurrentWeather } from "./Home";
import { Forecast } from "./Forecast";
import { SearchInput } from "./SearchInput";
import { useEffect, useState } from "react";
import { City } from "../models/city.model";
import { getWeather } from "../api/WhetherApiService";
import { WeatherData } from "../models/weather.model";
import { ForeCastData } from "../models/forecast.model";



export function WeatherApp(): JSX.Element {
  const date = new Date();


  const [city, setCity] = useState<City | null>(null);
  const [cw, setCW] = useState<WeatherData | null>(null);
  const [tw, setTW] = useState<ForeCastData | null>(null);



  useEffect(() => {

    const lat = 11.258753;
    const long = 75.780411;

    
    async function onSetCity() {
      const [c, t] = await getWeather(city?.latitude ?? lat, city?.longitude ?? long);

      setCW(c);
      setTW(t);

    }

    onSetCity();

  }, [city])


  



  return (
    <div style={{ backgroundImage: `url(${imgs})` }} className=" w-full bg-cover bg-center h-screen flex flex-col items-center bg-gradient-to-r from-[#000428] to-[#004E92]">

      <div className=" card w-1/2  h-full p-4 mt-8 rounded-2xl relative flex flex-col z-10">
        <div className="text-white flex justify-between">
          <p className="text-xs font-bold">{date.toUTCString()}</p>
          <AiFillGithub size={25} />
        </div>

        <SearchInput setCity={setCity} />


        {cw && <CurrentWeather data={cw} />}
        {tw && <Forecast data={tw} />}



      </div>
    </div>
  );
} 