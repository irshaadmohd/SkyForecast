
import { BsCloudSun, BsClouds } from "react-icons/bs";
import { RiWindyFill } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
import { WeatherData } from '../models/weather.model';




export function CurrentWeather({ data }: { data: WeatherData }): JSX.Element {
  return <div>
    {/* city name */}

    <div className="mt-8 item-center flex city justify-center text-white text-2xl ">
      <p className=" city text-5xl name justify-center items-center ">{data.name}</p>
    </div>

    {/* { current weather icon} */}

    <div className="  flex justify-center w-[280px] ml-[325px] mt-[20px]">
      <BsCloudSun style={{
        color: 'white',
        fontSize: '200px'
      }} />

    </div>

    {/* current degree */}
    <div className=" flex justify-center items-center">
      <h1 className="text-5xl text-white mt-[20px] ">{Math.round(data.main.temp)}° </h1>
    </div>


    {/* weather description*/}
    <div className="mt-[16px] text-2xl items-center flex justify-center">
      <p className="  flex justify-center items-center text-white">{data.weather[0].description}</p>

    </div>

    {/* air conditions*/}
    <div className="flex justify-center mt-4">
      <div className=" flex gap-20 justify-center  h-[80px] w-[350px]">

        <div className=" w-10 ">
          <RiWindyFill size={40}
            style={{
              color: 'white',
            }} />
          <p className=" text-sm text-white">{Math.round(data.wind.speed)}m/s</p>
        </div>

        <div className="w-10  ">
          <BsClouds size={40}
            style={{
              color: 'white',
            }} />
          <p className="   text-sm text-white">{data.clouds.all}%</p>
        </div>

        <div className=" w-10  ">
          <WiHumidity size={40}
            style={{
              color: 'white',
            }} />
          <p className=" pl-1 text-sm text-white">{Math.round(data.main.humidity)}%</p>
        </div>


      </div>
    </div>
  </div>
}