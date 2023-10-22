import React, { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "../filmes/style";
import { Link } from "react-router-dom";
import {MdChevronLeft, MdChevronRight} from "react-icons/md"

function FilmesHome() {
    const hoje = new Date();
    const dataAtual = hoje.toISOString().split('T')[0]; 
    const proximaSemana = new Date(hoje);
    proximaSemana.setDate(hoje.getDate() + 7); 
    const dataProximaSemana = proximaSemana.toISOString().split('T')[0]; 
    const number = 0

    const imagePath = "https://image.tmdb.org/t/p/original";

    const [movies, setMovies] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${dataAtual}&primary_release_date.lte=${dataProximaSemana}`)
            .then((response) => response.json())
            .then((data) => {
                const top10Movies = data.results.slice(0, 10);
                setMovies(top10Movies);
            });
    }, [KEY]);

    const [film, setFilm] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=27
        `)
            .then((response) => response.json())
            .then((data) => {
                const terror = data.results.slice(0, 10);

                setFilm(terror);
            });
    }, [KEY]);

    const slideLeft = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }

    const slideRight = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    return (
        <div>
            <h1 className=" text-3xl ps-7 font-semibold  ">10s today</h1>
            <div className=" relative flex items-center" >
                <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideRight} size={40}/>
                |<div id="slider" className="scrollbar-hide w-full h-full overflow-x-scroll  overflow-y-hidden scroll whitespace-nowrap scroll-smooth">     
                    {movies && movies.length > 0 && movies.map((movie) => {
                        return (
                            <Link to={`/${movie.id}`}>
                            <div className=" pt-5 ps-7 w-[300px] h-[450px] pe-8 cursor-pointer hover:scale-105 ease-in-out duration-300  inline-block" key={movie.id}>
                                <img className=" w-full h-80 rounded-xl"
                                    src={`${imagePath}${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft} size={40}/>
            </div >
            <div>
            <h1 className=" text-3xl ps-7 font-semibold  ">Terror</h1>
            <div className=" relative flex items-center" >
                <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideRight} size={40}/>
                |<div id="slider" className="scrollbar-hide w-full h-full overflow-x-scroll  overflow-y-hidden scroll whitespace-nowrap scroll-smooth">     
                    {film && film.length > 0 && film.map((film) => {
                        return (
                            <Link to={`/${film.id}`}>
                            <div className=" pt-5 ps-7 w-[300px] h-[450px] pe-8 cursor-pointer hover:scale-105 ease-in-out duration-300  inline-block" key={film.id}>
                                <img className=" w-full h-80 rounded-xl"
                                    src={`${imagePath}${film.poster_path}`}
                                    alt={film.title}
                                />
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft} size={40}/>
            </div >
        </div>
        </div>

        
    );
}

export default FilmesHome;
