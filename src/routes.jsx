import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Counter from "./features/counter/Counter";
import TodoList from "./features/todo/TodoList";
import WeatherDashboard from "./features/weather/WeatherDashboard";
import ShoppingCart from "./features/cart/Cart";
import NotFound from "./Pages/NotFound";

import { Provider } from 'react-redux'
import counterStore from './features/counter/store'
import todoStore from "./features/todo/store";
import weatherStore from "./features/weather/store";
import CityWeather from "./features/weather/CityWeather";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Provider store={todoStore}><TodoList /></Provider>} />
            <Route path="/weather" element={<Provider store={weatherStore}><WeatherDashboard /></Provider>} />
            <Route path="/weather/:city" element={<Provider store={weatherStore}><CityWeather /></Provider>} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
