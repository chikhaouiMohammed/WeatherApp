import axios from 'axios';
import { useEffect, useState } from 'react';

import sunrise from '../images/sunrise-white 1.png';
import sunset from '../images/sunset-white 1.png';
import humidity from '../images/humidity 1.png';
import wind from '../images/wind 1.png';
import pressure from '../images/pressure-white 1.png';
import uv from '../images/uv-white 1.png';
import '../style/generalStyle.css'




function Content({cityName}) {
  const [data, setData] = useState({});
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: cityName ? cityName : 'Tlemcen',
      days: '3'
    },
    headers: {
      'X-RapidAPI-Key': '342013445emsha88565f2c52b826p1626a3jsnbd514f92609f',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cityName]);
  
  let localTime = 'Loading...';
  if (data.location && data.location.localtime) 
    localTime = data.location.localtime.split(' ')[1].substring(0, 5);
  
  let localDate = 'Loading...'
  if(data.location && data.location.localtime)
  localDate = data.location.localtime.split(' ')[0].substring(0, 10)

  return (
    <div id='content' className="container mx-auto grid grid-cols-5 gap-10 py-[63px] ">
      {/* Actual city */}
      <div id='currentCity' className="bg-[#D9D9D9] dark:bg-[#444444] dark:text-white lg:col-span-1 sm:col-span-2 shadow-2xl shadow-gray-800 dark:shadow-black  h-[330px] rounded-[30px] flex flex-col justify-around items-center">
        {/* city Name */}
        <h3 id='cityName' className="text-[30px] font-bold">{data.location?.name || 'Loading...'}</h3>
        {/* Hour + Date */}
        <div>
          <h2 id='hour' className="lg:text-[80px] md:text-[60px] sm:text-[60px] font-bold">{localTime}</h2>
          <h4 id='date' className="text-[20px] font-normal text-center">{localDate}</h4>
        </div>
      </div>
      {/* Weather Details */}
      <div id='weatherDetails' className="bg-[#D9D9D9] dark:bg-[#444444] dark:text-white lg:col-span-4 sm:col-span-3 shadow-2xl shadow-gray-800 dark:shadow-black rounded-[30px] flex sm:flex-wrap lg:flex-nowrap justify-center items-center gap-x-28 px-3 py-4 ">
        {/* Main Details */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-[80px] font-bold" >
            {data.current?.temp_c || 'Loading...'}°C
            </h3>
            <span className="text-[20px] font-semibold">
              Feels like: <span>{data.current?.feelslike_c || 'Loading...'}°C</span> 
            </span>
          </div>
          <div className="flex gap-3">
            <div>
              <img className="w-[48px] h-[48px]" src={sunrise} alt="sunrise" />
            </div>
            <div>
              <h4 className="font-bold text-[20px] text-[#292929]">Sunrise</h4>
              <span className="text-[#292929]">{data.forecast?.forecastday[0].astro.sunrise || 'Loading...'}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <div>
              <img className="w-[48px] h-[48px]" src={sunset} alt="sunset" />
            </div>
            <div>
              <h4 className="font-bold text-[20px] text-[#292929]">Sunset</h4>
              <span className="text-[#292929]">{data.forecast?.forecastday[0].astro.sunset || 'Loading...'}</span>
            </div>
          </div>
        </div>
        {/* Weather Icon */}
        <div className="flex flex-col gap-10 justify-center">
          <div >
            <img className=' w-[200px] h-[200px] flex' src={data.current?.condition.icon || 'Loading...'} alt="sun" />
          </div>
          <div className="text-center text-[32px] font-bold">{data.current?.condition.text || 'Loading...'}</div>
        </div>
        {/* Extra Details */}
        <div className=" text-center items-center grid grid-cols-2 grid-rows-2 gap-x-20 pt-4">
          {/* Humidity */}
          <div>
            <div className="flex justify-center items-center">
              <img src={humidity}  alt="humidity" />
            </div>
            <h4 className="text-[20px] font-semibold text-[#292929] dark:text-white text-center">{data.current?.humidity || 'Loading...'}%</h4>
            <div>Humidity</div>
          </div>
          {/* wind speed */}
          <div>
            <div className="flex justify-center items-center">
              <img src={wind} alt="wind" />    
            </div>
            <h4 className="text-[20px] font-semibold text-[#292929] dark:text-white text-center">{data.current?.wind_kph || 'Loading...'}</h4>
            <div>Wind Speed</div>
          </div>
          {/* pressure */}
          <div>
            <div className="flex justify-center items-center">
              <img src={pressure} alt="pressure" />
            </div>
            <h4 className="text-[20px] font-semibold text-[#292929] dark:text-white text-center">{data.current?.pressure_mb || 'Loading...'}hPa</h4> 
            <div>Pressure</div>
          </div>
          {/* UV */}
          <div>
            <div className="flex justify-center items-center">
              <img src={uv} alt="uv" />
            </div>
            <h4 className="text-[20px] font-semibold text-[#292929] dark:text-white text-center">{data.current?.uv || 'Loading...'}</h4>
            <div className=' text-center'>UV</div>
          </div>
        </div>
      </div>
      {/* 3 days weather */}
      <div id='futureDaysWeather' className=' bg-[#D9D9D9] dark:bg-[#444444] shadow-2xl col-span-2 h-fit  shadow-gray-800 dark:shadow-black rounded-[30px] pt-[18px] px-7 flex flex-col gap-7'>
        <h2 className=' text-[#292929] text-[32px] dark:text-white font-bold text-center mb-5'>3 Days Forecast :</h2>
        {/* Current day */}
        <div className=' flex justify-around flex-nowrap items-center'>
          <div>
            <img className=' w-[50px] h-[50px]' src={data.forecast?.forecastday[0].day.condition.icon || 'Loading'} alt="Weather" />
          </div>
          <h3 className=' text-[#292929] dark:text-white   text-[24px] font-bold'>{data.forecast?.forecastday[0].day.avgtemp_c || 'Loading'}°C</h3>
          <h4 className='text-[#292929] dark:text-white text-[20px] font-bold'>{data.forecast?.forecastday[0].date || 'Loading'}</h4>
        </div>
        {/* second day */}
        <div className=' flex justify-around flex-nowrap items-center'>
          <div>
            <img className=' w-[50px] h-[50px]' src={data.forecast?.forecastday[1].day.condition.icon || 'Loading'} alt="Weather" />
          </div>
          <h3 className=' text-[#292929] dark:text-white text-[24px] font-bold'>{data.forecast?.forecastday[1].day.avgtemp_c || 'Loading'}°C</h3>
          <h4 className='text-[#292929] dark:text-white text-[20px] font-bold'>{data.forecast?.forecastday[1].date || 'Loading'}</h4>
        </div>
        {/* third day */}
        <div className=' flex justify-around flex-nowrap items-center'>
          <div>
            <img className=' w-[50px] h-[50px]' src={data.forecast?.forecastday[2].day.condition.icon || 'Loading'} alt="Weather" />
          </div>
          <h3 className=' text-[#292929] dark:text-white text-[24px] font-bold'>{data.forecast?.forecastday[2].day.avgtemp_c || 'Loading'}°C</h3>
          <h4 className='text-[#292929] dark:text-white text-[20px] font-bold'>{data.forecast?.forecastday[2].date || 'Loading'}</h4>
        </div>
      </div>
      {/* Hourly Forcast */}
      <div className='bg-[#D9D9D9] dark:bg-[#444444] w-fit  shadow-2xl col-span-3 shadow-gray-800 dark:shadow-black rounded-[30px] pt-[18px] px-7'>
        <h2 className=' text-[#292929] dark:text-white text-[32px] font-bold text-center mb-5'>Hourly Forcast</h2>
        {/* Hour weather Cards */}
        <div className=' flex gap-4 justify-center  items-center py-5 w-full flex-wrap lg:flex-nowrap '>
          <div className=' text-center flex flex-col justify-center items-center gap-5 rounded-[40px] bg-gradient-to-b from-[#F88508] to-transparent dark:bg-gradient-to-b dark:from-[#373636] dark:to-[#373636] px-[31px] py-5'>
            <h3 className='text-[#292929] dark:text-white text-[24px] font-bold'>13.00</h3>
            <div>
              <img className=' w-[80px] h-[80px]' src={data.forecast?.forecastday[0].hour[13].condition.icon || 'Lodaing...'} alt="Weather" />
            </div>
            <h4 className='text-[#292929] dark:text-white text-[24px] font-bold'>{data.forecast?.forecastday[0].hour[13].temp_c || 'Lodaing...'}°C</h4>
            <h4 className='text-[#292929] dark:text-white text-[24px] font-bold'>{data.forecast?.forecastday[0].hour[13].wind_kph || 'Lodaing...'}km/h</h4>
          </div>
          <div className=' text-center flex flex-col justify-center items-center gap-5 rounded-[40px] bg-gradient-to-b from-[#F88508] to-transparent dark:bg-gradient-to-b dark:from-[#373636] dark:to-[#373636] px-[31px] py-5'>
            <h3 className='text-[#292929] dark:text-white text-[24px] font-bold'>18.00</h3>
            <div>
              <img className=' w-[80px] h-[80px]' src={data.forecast?.forecastday[0].hour[18].condition.icon || 'Lodaing...'} alt="Weather" />
            </div>
            <h4 className='text-[#292929] dark:text-white text-[24px] font-bold'>{data.forecast?.forecastday[0].hour[18].temp_c || 'Lodaing...'}°C</h4>
            <h4 className='text-[#292929] dark:text-white text-[24px] font-bold'>{data.forecast?.forecastday[0].hour[18].wind_kph || 'Lodaing...'}km/h</h4>
          </div>
          <div className=' text-center flex flex-col justify-center items-center gap-5 rounded-[40px] bg-gradient-to-b from-[#443D64] to-transparent dark:bg-gradient-to-b dark:from-[#373636] dark:to-[#373636] px-[31px] py-5'>
            <h3 className='text-[#292929] dark:text-white text-[24px] font-bold'>21.00</h3>
            <div>
              <img className=' w-[80px] h-[80px]' src={data.forecast?.forecastday[0].hour[21].condition.icon || 'Lodaing...'} alt="Weather" />
            </div>
            <h4 className='text-[#292929] dark:text-white text-[24px] font-bold'>{data.forecast?.forecastday[0].hour[21].temp_c || 'Lodaing...'}°C</h4>
            <h4 className='text-[#292929] dark:text-white text-[24px] font-bold'>{data.forecast?.forecastday[0].hour[21].wind_kph || 'Lodaing...'}km/h</h4>
          </div>
          <div className=' text-center flex flex-col justify-center items-center gap-5 rounded-[40px] bg-gradient-to-b from-[#443D64] to-transparent dark:bg-gradient-to-b dark:from-[#373636] dark:to-[#373636] px-[31px] py-5'>
            <h3 className='text-[#292929] dark:text-white text-[24px] font-bold'>23.00</h3>
            <div>
              <img className=' w-[80px] h-[80px]' src={data.forecast?.forecastday[0].hour[23].condition.icon || 'Lodaing...'} alt="Weather" />
            </div>
            <h4 className='text-[#292929] dark:text-white text-[24px] font-bold'>{data.forecast?.forecastday[0].hour[23].temp_c || 'Lodaing...'}°C</h4>
            <h4 className='text-[#292929] dark:text-white text-[24px] font-bold'>{data.forecast?.forecastday[0].hour[23].wind_kph || 'Lodaing...'}km/h</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;