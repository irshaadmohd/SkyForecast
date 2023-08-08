import axios from "axios";
import { WeatherData } from "../models/weather.model";
import { ForeCastData } from "../models/forecast.model";
const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const RAPIDAPI_HOST = "wft-geo-db.p.rapidapi.com";
const RAPIDAPI_KEY = "21384cceeemsh69807e758d5acd8p1c9ffejsn7090126e49f4";


export const fetchCities = async (city: string) => {
  try {
    const { data } = await axios.get(`${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${city}`, {
      // method:"get",
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
    });
    console.log(data)
    return data.data
  } catch (error) {
    console.log(error);
  }
};





export const getWeather = async (lat: number, lon: number): Promise<[WeatherData, ForeCastData]> => {
  console.log("lat", lat, lon);
  const CURRENT_CLIMATE_API_KEY = "ef34c8a5badb973d8af36cb8ba2bcef3";

  const [currentWeather, forcast] = await Promise.all([axios.get<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CURRENT_CLIMATE_API_KEY}&units=metric`
  ), axios.get<ForeCastData>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${CURRENT_CLIMATE_API_KEY}&units=metric`
  )]);
  
        
  
  return [currentWeather.data, forcast.data]
  
};

