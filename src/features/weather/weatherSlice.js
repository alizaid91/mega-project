import { createSlice } from "@reduxjs/toolkit";

const initialWeatherStore = {
  atPopularCities: [],
  searchedCity: {
    weatherInfo: {},
    forecast: [],
  },
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: initialWeatherStore,
  reducers: {
    setWeatherAtPopularCities: (state, action) => {
      const { weatherDetails } = action.payload;
      state.atPopularCities = weatherDetails;
    },

    setCityWeather: (state, action) => {
      const { weatherDetails } = action.payload;
      console.log(weatherDetails)
      state.searchedCity.weatherInfo = weatherDetails;
    },

    setCityForcast: (state, action) => {
      const { forcast } = action.payload;
      state.searchedCity.forecast = forcast;
    },
  },
});

export const { setWeatherAtPopularCities, setCityWeather, setCityForcast } =
  weatherSlice.actions;
export default weatherSlice.reducer;
