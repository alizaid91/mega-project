import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCityWeather } from './weatherSlice';
import { useSelector } from 'react-redux';
import weatherServices from '../../utils/weatherServices';

const CityWeather = () => {
    const weather = useSelector((state) => state.weather.searchedCity.weatherInfo);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const { city } = useParams();

    const fetchCityWeather = async (cityName) => {
        setLoading(true);
        try {
            const weatherData = await weatherServices.atCity(cityName);
            if (weatherData.error) {
                setError("Error");
                return
            }
            if (weatherData) {
                dispatch(setCityWeather({ weatherDetails: weatherData }));
            }
            setError(null)
        } catch (error) {
            console.error("Error fetching weather:", error);
            setError("Error")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (city) {
            fetchCityWeather(city);
        }
    }, [city]);

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20 pb-10 flex justify-center items-center'>
            {loading ? (
                <div className='text-3xl font-bold text-white'>
                    <h1>Loading...</h1>
                </div>
            ) : (
                error ? (
                    <div className='text-xl font-bold text-white'>
                        <h1>No matching location found.</h1>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8 max-w-lg w-full mx-4"> {/* Added w-full and mx-4 for responsiveness */}
                        <div className="flex w-full justify-between items-center mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">{weather.location.name}, {weather.location.name !== weather.location.region && weather.location.region}</h2>
                                <p className="text-gray-600 text-lg">{weather.location.country}</p>
                            </div>
                            <img src={weather.current.condition.icon} alt={weather.current.condition.text} className="w-20 h-20" />
                        </div>
                        <div className="mb-8 text-center"> {/* Centered temperature and condition */}
                            <p className="text-4xl md:text-5xl font-bold text-gray-800">{weather.current.temp_c}°C ({weather.current.temp_f}°F)</p>
                            <p className="text-xl text-gray-600 mt-2">{weather.current.condition.text}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"> {/* Responsive grid */}
                            <div className='flex flex-col gap-1'>
                                <p><strong>Wind:</strong> {weather.current.wind_mph} mph ({weather.current.wind_kph} kph) {weather.current.wind_dir}</p>
                                <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
                                <p><strong>Pressure:</strong> {weather.current.pressure_mb} mb</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p><strong>Visibility:</strong> {weather.current.vis_km} km</p>
                                <p><strong>Precipitation:</strong> {weather.current.precip_mm} mm</p>
                                <p><strong>UV Index:</strong> {weather.current.uv}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-6 text-center">Last updated: {weather.current.last_updated}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default CityWeather;