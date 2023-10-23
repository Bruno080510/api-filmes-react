import React from "react";
import { Route, Routes } from "react-router-dom";
import Movie from "./pages/movieDetalhe";
import Home from "./pages/home";
import Search from "./pages/Search/Search";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/:id" exact element={<Movie />} />
                <Route path="/search" exact element={<Search />} />
            </Routes>
        </div>
    );
};

export default App;
