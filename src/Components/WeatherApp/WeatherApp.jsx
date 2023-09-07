import React, {useEffect, useState} from "react";
import './WeatherApp.css';


import dclear from '../Assets/dclear.png';
import nclear from '../Assets/nclear.png';
import gcloud from '../Assets/gcloud.png';
import grain from '../Assets/grain.png';
import gsnow from '../Assets/gsnow.png';

/*import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';*/

import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

import {BiSearchAlt2} from 'react-icons/bi';
import { clear } from "@testing-library/user-event/dist/clear";

function WeatherApp(){

    let api_key = "dd94f859a0e52d6e4767fddf735f04a7";
    const [wicon, setWicon] = useState(gcloud);

    const [humidity, setHumidity] = useState('');
    const [wind, setWind] = useState('');
    const [temperature, setTemperature] = useState('');
    const [location, setLocation] = useState('Cupertino')

    //Default screen using Cupertino City
    useEffect(() => {
        getWeatherData(location);
    }, [])

    async function getWeatherData(city){
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        setHumidity(data.main.humidity + '%');
        setWind(data.wind.speed + ' km/h');
        setTemperature(parseInt(data.main.temp) + ' °C');
        setLocation(data.name);

    }

    async function search(){
        const element = document.getElementsByClassName("city-input")
        if(element[0].value===''){
            return 0;
        }
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`

            let response = await fetch(url);
            let data = await response.json();

            setHumidity(data.main.humidity + '%');
            setWind(data.wind.speed + ' km/h');
            setTemperature(parseInt(data.main.temp) + ' °C');
            setLocation(data.name);

            const weatherIconMap = {
                '01d': dclear,
                '01n': nclear,
                '02d': gcloud,
                '02n': gcloud,
                '03d': grain,
                '03n': grain,
                '04d': grain,
                '04n': grain,
                '09d': grain,
                '09n': grain,
                '10d': grain,
                '10n': grain,
                '13d': gsnow,
                '13n': gsnow,
            }; 

            const weatherIcon = data.weather[0].icon;
            setWicon(weatherIconMap[weatherIcon] || dclear);

            /*if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
                setWicon(clear_icon);
            }else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n'){
                setWicon(cloud_icon);
            }else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n' || data.weather[0].icon==='04d' || data.weather[0].icon==='04n'){
                setWicon(drizzle_icon);
            }else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n' ||data.weather[0].icon==='10d' || data.weather[0].icon==='10n'){
                setWicon(rain_icon);
            }else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
                setWicon(snow_icon)
            }else{
                setWicon(clear_icon);
            }*/

        }catch(err){
            alert('Invalid city name, please try again.')
        }

    }

    return(
        <div className="container">
            <div className="top-bar">
                <input 
                    type='text'
                    className="city-input" 
                    placeholder="Search your city here" 
                />
                <div className="seatch-icon">
                    <BiSearchAlt2 className="search-icon" onClick={search}/>
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt='' />
            </div>
            <div className="weather-temp">
                {temperature}
            </div>
            <div className="weather-location">
                {location}
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt='' className="icon"/>
                    <div className="data">
                        <div className="humidity-percent">
                            {humidity}
                        </div>
                        <div className="text">
                            Humidity
                        </div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt='' className="icon"/>
                    <div className="data">
                        <div className="wind-rate">
                            {wind}
                        </div>
                        <div className="text">
                            Wind Speed
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">Developed by <a href="https://github.com/giovanasbarbosa" target="_blank">Giovana Barbosa</a></div>
        </div>
    );
}

export default WeatherApp;