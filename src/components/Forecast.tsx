import { BsClouds, BsCloudRainFill } from "react-icons/bs";
import { RiWindyFill } from "react-icons/ri";
import { FaCloudSunRain } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { ForeCastData } from "../models/forecast.model";
import dayjs from "dayjs";
import "weather-icons/css/weather-icons.css";
import { weatherIcons } from "../Weathericons.json";

export function Forecast({ data }: { data: ForeCastData }): JSX.Element {
  // console.log(data?.list,'ddddd');

  const today = dayjs().format("DD");
  console.log(today);
  data
  // const list=data.list
  const weekly = [];
  const todayWeather = []
  // console.log('llll',list);

  const ForeCastitem = data?.list.filter((days) => {
    const dt = dayjs(days.dt_txt).format("DD");
    // console.log('dt',dt);
    if (dt === today) {
      todayWeather.push(days)
    }
    if (dt !== today) {
      if (weekly.length === 0)
        weekly.push(days)
      if (dayjs(weekly[weekly.length - 1].dt_txt).format("DD") !== dt)
        weekly.push(days)
    }
    console.log(weekly, 'jjjjjj');
    console.log(todayWeather, 'tttttt');


  });


  return (
    <>


      <div className=" text-white flex ml-[20px] mt-3 gap-3 h-[235px] w-[1000px] ">

        {/* card1 */}
        {
          weekly?.map((item) => (
            <div className="flex items-center flex-col h-full w-1/6 bg-white/10 rounded-xl ">
              <h3 className=" flex flex-col pt-1 text-xl justify-center items-center ">{dayjs(item.dt_txt).format("ddd")}</h3>


              {/* { forcast weather icon} */}

              <div className="pt-2 flex justify-center items-center h-30 w-20">

              <i className={` text-7xl wi wi-${(weatherIcons as any)[item.weather[0].id].icon}`}></i>

              </div>


              {/* current degree */}
              <div className=" flex mt-3 justify-center">
                <h1 className="text-2xl text-white pt-2">{Math.round(item.main?.temp)}°</h1>
              </div>



              {/* weather description */}

              <div className=" text-xs items-center flex justify-center">
                <p className="flex justify-center items-center text-white">{item.weather[0]?.description}</p>

              </div>




              {/* air conditions*/}
              <div className="flex justify-center  pt-3 ">
                <div className=" flex gap-[4px] justify-center  h-[30px] w-[130px]">

                  <div className=" w-10 pl-3">
                    <RiWindyFill size={20}
                      style={{
                        color: 'white',
                      }} />
                    <p className=" -pl-3 text-[10px] text-white">{item.wind.speed}</p>
                  </div>

                  <div className="w-10 pl-3 ">
                    <BsClouds size={20}
                      style={{
                        color: 'white',
                      }} />
                    <p className=" text-[10px] text-white">{item.clouds.all}%</p>
                  </div>

                  <div className=" w-10 pl-3 ">
                    <WiHumidity size={20}
                      style={{
                        color: 'white',
                      }} />
                    <p className=" text-[10px] text-white">{item.main.humidity}%</p>
                  </div>

                </div>
              </div>
            </div>
          ))
        }

      </div>

      <div
        className="flex flex-col  justify-center items-center absolute -z-10 left-[920px] top-[120px] text-white backdrop-blur-10 rounded-3xl  ml-[20px]  h-auto w-[300px]">
          <p className="font-sans">Today's Forcast</p>
        {
          todayWeather?.map((item) => (

            <div className="mx-2 flex flex-row my-2 h-[120px]  w-[263px] bg-black/30 rounded-2xl backdrop-blur-10">
              <p className="w-16 pl-2 font-sans pt-1 text-m">{dayjs(item.dt_txt).format("HH:MM")} </p>
              <div className="absolute left-8 w-20 pt-2 pl-3 ">
              <i className={` pt-3 pl-5 text-7xl wi wi-${(weatherIcons as any)[item.weather[0].id].icon}`}></i>
              </div>
              <p className="font-sans ml-[84px] mt-7 text-6xl">{Math.round(item.main.temp)}°</p>

            </div>
          ))
        }
      </div>
    </>
  )
      }
