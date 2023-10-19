import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";
import {BsFillCalendarDateFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {BiTimeFive} from 'react-icons/bi'

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
  

    return (
        <div className="flex flex-row justify-beetwen">
            <img
                className=" h-[680px] pe-5 w-[800px]  rounded"
                src={`${imagePath}${movie.poster_path}`}
                alt={movie.title}
            />
            <div className=" pt-16">
                <h1 className="text-4xl font-bold">{movie.title}</h1>
               
                <div className=" text-xl pt-4 font-mono pe-6">
                    <p className="">Descrição: {movie.overview}</p>
                </div>
                <div className="pt-2 flex items-center text-xl  flex-row">
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
                
                <h2>Filmes Recomendados:</h2>
        <div className=" relative flex items-center">
                <ul>
                {recommendedMovies.length > 0 && recommendedMovies.map((movie, number) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
                
                <div className="pb-8 pt-5 ps-7 w-[300px] h-[450px] pe-8 cursor-pointer hover:scale-105 ease-in-out duration-300 inline-block">
                <h1 className="text-lg ps-3">{number + 1}</h1>
                <img
                    className="w-full h-80 rounded-xl"
                    src={`${imagePath}${movie.poster_path}`}
                    alt={movie.title}
                />
                </div>
            </Link>
            ))}
                </ul>
         </div>
      <Link to="/">
        <button className="bg-red-500 p-3 px-5 rounded font-bold">Voltar</button>
      </Link>
            </div>
        </div>
    );
};

export default Movie;
