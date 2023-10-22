import React, { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "../filmes/style";
import { Link } from "react-router-dom";
import {MdChevronLeft, MdChevronRight} from "react-icons/md"

function FilmesHome() {
    return (
        <div>
            <Filmes name='Terror' genero='27'/>
            <Filmes name='Comédia' genero='35'/>
            <Filmes name='Ação' genero='28'/>

        </div>

        
    );
}

function Filmes({name, genero}){
    const slideLeft = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }

    const slideRight = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }
    const imagePath = "https://image.tmdb.org/t/p/original";

    const KEY = process.env.REACT_APP_KEY;
    const [film, setFilm] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=${genero}&include_adult=false&include_video=false&sort_by=popularity.desc&vote_average.gte=0&vote_count.gte=1000
        `)
            .then((response) => response.json())
            .then((data) => {
                const terror = data.results.slice(10, 20);

                setFilm(terror);
            });
    }, [KEY]);
    return(
        <>
               <div>
            <h1 className=" text-3xl ps-7 font-semibold  ">{name}</h1>
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
        </>
    )
}

export default FilmesHome;
