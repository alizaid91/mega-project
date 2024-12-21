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

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/counter" element={<Provider store={counterStore}><Counter /></Provider>} /> */}
            <Route path="/todo" element={<Provider store={todoStore}><TodoList /></Provider>} />
            <Route path="/weather" element={<WeatherDashboard />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
