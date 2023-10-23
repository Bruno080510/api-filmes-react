import React from "react";
import { Route, Routes } from "react-router-dom";
import Movie from "./pages/movieDetalhe";
import Home from "./pages/home";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/:id" exact element={<Movie />} />
            </Routes>
        </div>
    );
};

export default App;
