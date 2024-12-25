import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import weatherServices from '../../utils/weatherServices'
import { useDispatch } from "react-redux";
import { setWeatherAtPopularCities, setCityWeather } from "./weatherSlice";
import { motion } from "framer-motion";
import WeatherDisplay from '../../components/WeatherDetailsCard'
import { useNavigate } from 'react-router-dom';

const WeatherDashboard = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const fetchWeather = async () => {
    setLoadingWeather(true);
    const weather = await weatherServices.atMultipleCities("mumbai", "pune", "aurangabad", "hyderabad", "new york");
    dispatch(setWeatherAtPopularCities({ weatherDetails: weather }))
    setLoadingWeather(false)
  }

  useEffect(() => {
    fetchWeather();
  }, [])

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const res = await weatherServices.autoComplete(event);
    setSuggestions(res);
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    navigate(`/weather/${suggestion.name}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchTerm.trim() !== '') {
      navigate(`/weather/${searchTerm.trim()}`);
      setSearchTerm('');
    }
  };

  return (
    <div className={`${selectedCard ? 'max-h-screen overflow-hidden' : 'min-h-screen overflow-auto'} bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-20 pb-10`}>
      {
        loadingWeather
          ? <div className='w-screen h-screen flex items-center justify-center'>
            <h1 className='text-xl font-bold text-white'>Loading...</h1>
          </div>
          : <div className='mx-4'>
            <header className="text-center">
              <motion.h1
                className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text mb-4"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Weather Dashboard
              </motion.h1>

              <motion.p
                className="text-lg text-white"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Real-time weather updates for cities across the globe.
              </motion.p>
            </header>
            <div className="flex justify-center mt-12 relative">
              <form onSubmit={handleSearch} className="w-full max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter city name..."
                    value={searchTerm}
                    required
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 pr-3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                  >
                    Search
                  </button>
                  {suggestions.length > 0 && (
                    <ul className="absolute w-full bg-black/90 text-white backdrop-blur-lg space-normal rounded-lg shadow-2xl mt-2 z-10 overflow-hidden">
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-4 py-2 hover:bg-gray-600/50 cursor-pointer"
                        >
                          {suggestion.name}, {suggestion.region}, {suggestion.country}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </form>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {weatherData.atPopularCities.map((city, index) => (
                <motion.div
                  key={index}
                  className="sm:w-[400px] bg-white p-6 rounded-xl shadow-md cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setSelectedCard(city) }}
                >
                  <h2 className="text-xl font-semibold text-black">
                    {city.location.name}, {city.location.name !== city.location.region && city.location.region}
                  </h2>
                  <p className="text-gray-800">{city.location.country}</p>
                  <div className="flex items-center mt-4">
                    <img
                      src={city.current.condition.icon}
                      alt={city.current.condition.text}
                      className="w-12 h-12"
                    />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-800">
                        {city.current.temp_c}°C
                      </p>
                      <p className="text-gray-800">{city.current.condition.text}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between text-gray-700">
                    <p>
                      <span className="font-semibold">Wind:</span>{" "}
                      {city.current.wind_kph} kph
                    </p>
                    <p>
                      <span className="font-semibold">Humidity:</span>{" "}
                      {city.current.humidity}%
                    </p>
                  </div>
                  <p className="mt-2 text-gray-700">
                    <span className="font-semibold">UV Index:</span>{" "}
                    {city.current.uv}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
      }
      {
        selectedCard && <WeatherDisplay weatherData={selectedCard} display={selectedCard ? true : false} onClose={() => setSelectedCard(null)} />
      }
    </div>
  );
}

export default WeatherDashboard