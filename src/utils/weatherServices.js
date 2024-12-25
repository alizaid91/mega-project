const BASE_URL = "http://api.weatherapi.com/v1";
console.log(import.meta.env.VITE_REACT_WEATHER_API_KEY);

const weatherServices = {
  //fetch weather of multiple cities
  atMultipleCities: async (...cities) => {
    const fetchWeather = async (city) => {
      try {
        const responce = await fetch(
          `${BASE_URL}/current.json?key=${
            import.meta.env.VITE_REACT_WEATHER_API_KEY
          }&q=${city}&aqi=no`
        );
        if (!responce.ok) {
          console.log("Error fetching weather at:", city);
          return {};
        }
        return responce.json();
      } catch (error) {
        console.log("Error fetching weather:", error);
      }
    };

    const weatherPromises = cities.map((city) => fetchWeather(city));
    const weatherData = await Promise.all(weatherPromises);
    return weatherData;
  },

  atCity: async (city) => {
    try {
      const responce = await fetch(
        `${BASE_URL}/current.json?key=${
          import.meta.env.VITE_REACT_WEATHER_API_KEY
        }&q=${city}&aqi=no`
      );
      return responce.json();
    } catch (error) {
      console.log("Error: ", error);
    }
  },

  autoComplete: async (event) => {
    const value = event.target.value;

    if (value.length > 2) {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/search.json?key=${
            import.meta.env.VITE_REACT_WEATHER_API_KEY
          }&q=${value}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
      }
    } else {
      return [];
    }
  },
};

export default weatherServices;
