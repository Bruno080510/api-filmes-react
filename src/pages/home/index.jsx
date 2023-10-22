import { Link } from "react-router-dom";
import FilmesHome from "./FilmesHome";
import React, { useEffect, useState } from "react";
import {AiFillStar} from "react-icons/ai"
import Navbar from "../../components/Navbar";

function Home() {
    const randomId = 0; 

    const imagePath = "https://image.tmdb.org/t/p/original";
    
    const [filmeBanner, setFilmeBanner] = useState({});
    const KEY = process.env.REACT_APP_KEY;
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
              
                if (data.results && data.results.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.results.length);
                    const randomFilme = data.results[randomIndex];
                    setFilmeBanner(randomFilme);
                }
            })
            .catch((error) => {
                console.error("Erro ao obter informações do filme:", error);
            });
    }, [KEY]);
    

    return (
        <div>
            <Navbar/>
            <div className="relative">
                <div className="w-full h-screen">
                    <div className="w-full h-[650px] bg-cover bg-no-repeat bg-center opacity-30"
    style={{backgroundImage: `url(${imagePath}${filmeBanner.poster_path})`}}>
                    </div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-center items-start ps-8">
                    <h1 className="text-7xl italic font-extrabold text-white">
                        {filmeBanner.title || "Título não disponível"}
                    </h1>
                    <p className="pe-[600px] text-[20px] font-thin ">
                        {filmeBanner.overview || "Descrição não disponível"}
                    </p>
                    <div className=" flex items-center  flex-row">
                        <div className="pb-0.5 text-yellow-500">
                            <AiFillStar/>
                        </div>
                        <p className=" ps-2 font-bold">
                            {filmeBanner.vote_average}
                        </p>
                    </div>
                    <div className=" pt-3">
                        <Link to={`/${filmeBanner.id}`}>                        
                            <button className=" w-24 h-10 bg-red-700 text-white font-bold rounded-xl justify-center ">Detalhes</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <FilmesHome />
            </div>
        </div>
    );
}

export default Home;
