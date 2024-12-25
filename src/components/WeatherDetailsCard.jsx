import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";

const WeatherDisplay = ({ weatherData, display, onClose }) => {

    const { location, current } = weatherData;

    return (
        <div className={`${display ? 'visible' : 'invisible'} z-50 fixed w-screen h-screen top-0 left-0 flex bg-black/60 backdrop-blur-md items-center justify-center`}>
            <div className={`${display ? 'opacity-100 scale-100' : 'scale-110 opacity-0'} relative mx-4 transition-all duration-500 bg-white rounded-xl shadow-md px-3 md:px-6 py-8`}>
                <div className="pl-3 pr-1 py-1 flex justify-between rounded-xl items-center">
                    <div className='pr-3'>
                        <h2 className="text-2xl font-bold text-gray-900">{location.name}, {location.name !== location.region && location.region}</h2>
                        <p className="font-semibold text-lg text-gray-800">{location.country}</p>
                    </div>
                    <img src={current.condition.icon} alt={current.condition.text} className="w-16 h-16" />
                </div>
                <hr className='my-2' />
                <div className="ml-1">
                    <p className="text-3xl md:text-4xl font-bold text-gray-800">{current.temp_c}°C ({current.temp_f}°F)</p>
                    <p className="text-gray-600">Feels like {current.feelslike_c}°C ({current.feelslike_f}°F)</p>
                    <p className="text-gray-600">{current.condition.text}</p>
                </div>
                <hr className='my-2' />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 ml-1">
                    <div className='flex flex-col gap-1'>
                        <p className='flex justify-between md:justify-normal gap-1'><strong>Wind:</strong> {current.wind_mph} mph ({current.wind_kph} kph) {current.wind_dir}</p>
                        <p className='flex justify-between md:justify-normal gap-1'><strong>Humidity:</strong> {current.humidity}%</p>
                        <p className='flex justify-between md:justify-normal gap-1'><strong>Pressure:</strong> {current.pressure_mb} mb</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='flex justify-between md:justify-normal gap-1'><strong>Visibility:</strong> {current.vis_km} km</p>
                        <p className='flex justify-between md:justify-normal gap-1'><strong>Precipitation:</strong> {current.precip_mm} mm</p>
                        <p className='flex justify-between md:justify-normal gap-1'><strong>UV Index:</strong> {current.uv}</p>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">Last updated: {current.last_updated}</p>
                <div onClick={() => onClose()} className='absolute -top-0 -right-0 text-3xl text-red-600 cursor-pointer'>
                    <IoMdCloseCircle />
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;