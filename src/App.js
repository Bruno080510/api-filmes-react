import React from "react";
import { Route, Routes } from "react-router-dom";
import Filmes from "./pages/filmes";
import Movie from "./pages/movieDetalhe";
import Series from "./pages/series";
import DetalheSerie from "./pages/serieDetalhe";
import Home from "./pages/home";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/filmes" exact element={<Filmes />} />
                <Route path="/:id" exact element={<Movie />} />
                <Route path="/series" exact element= {<Series/>}/>
                <Route path="/:id" exact element={<DetalheSerie />} />
            </Routes>
        </div>
    );
};

export default App;
