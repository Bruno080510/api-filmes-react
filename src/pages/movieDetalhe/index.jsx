import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";
import {BsFillCalendarDateFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {BiTimeFive} from 'react-icons/bi'
import {MdChevronLeft, MdChevronRight} from "react-icons/md"


const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/original";

    const [movie, setMovie] = useState([]);
      const [recommendedMovies, setRecommendedMovies] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => response.json())
            .then((data) => {
                setMovie(data);
            });
    }, [id, KEY]);

    useEffect(() => {
    fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${KEY}&language=pt-BR&page=1`
      )
        .then((response) => response.json())
        .then((data) => {
            const filmes = data.results.slice(0, 10);
          setRecommendedMovies(filmes);
        });
    }, [id, KEY])

    const slideLeft = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 200
    }

    const slideRight = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 200
    }
  

    return (
        <div className="flex flex-row justify-beetwen">
            <img
                className=" h-screen pe-5 w-[800px]  rounded"
                src={`${imagePath}${movie.poster_path}`}
                alt={movie.title}
            />
            <div className=" pt-5">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
               
                <div className=" text-lg pt-4 font-mono pe-6">
                    <p className="">Descrição: {movie.overview}</p>
                </div>
                <div className="pt-0.5 flex items-center text-xl  flex-row">
                        <div className=" text-yellow-500">
                            <AiFillStar/>
                        </div>
                        <p className=" ps-2 font-bold">
                            {movie.vote_average} |
                        </p>
                        <div className=" flex flex-row items-center ps-4">
                            <div>
                                <BiTimeFive/>
                            </div>
                            <p className="ps-2">{movie.runtime}min |</p>
                        </div>
                        <div className="ps-2 font-medium py-4 flex flex-row items-center">
                <BsFillCalendarDateFill/>
                    <h3 className="ps-2" >{movie.release_date}</h3>
                </div>
                </div>
                
                <h2 className="pt-4 text-xl">Filmes Recomendados:</h2>
                <div className="flex flex-row items-center">
                <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideRight} size={40}/>
                    <div id="slider" className="w-full scrollbar-hide overflow-x-auto whitespace-nowrap">
                        {recommendedMovies.length > 0 && recommendedMovies.map((movie) => (
                            <Link to={`/${movie.id}`} key={movie.id}>
                                <div className="inline-block pr-4">
                                    <img
                                        className="h-60 w-40 rounded cursor-pointer hover:scale-105 transition-transform duration-300"
                                        src={`${imagePath}${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft} size={40}/>
                </div>
      <Link to="/">
        <button className="bg-red-500 p-3 px-5 rounded  font-bold">Voltar</button>
      </Link>
            </div>
        </div>
    );
};

export default Movie;
