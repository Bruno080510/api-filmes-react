import React, { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "../filmes/style";
import { Link } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function FilmesHome() {
  return (
    <div>
      <Filmes title="Terror" genero="27" />
      <Filmes title="Ficção Científica" genero="878" />
      <Filmes title="Comédia" genero="35" />
      <Filmes title="Ação" genero="28" />
      <Filmes title="Aventura" genero="12" />
      <Filmes title="Animação" genero="16" />
      <Filmes title="Drama" genero="18" />
      <Filmes title="Romance" genero="10749" />
    </div>
  );
}

function Filmes({ title, genero }) {
  const sliderId = `slider-${genero}`;
  const slideLeft = () => {
    let slider = document.getElementById(sliderId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideRight = () => {
    let slider = document.getElementById(sliderId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const imagePath = "https://image.tmdb.org/t/p/original";
  const KEY = process.env.REACT_APP_KEY;
  const [film, setFilm] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=${genero}&include_adult=false&include_video=false&sort_by=popularity.desc&vote_average.gte=0&vote_count.gte=1000`
        );
        const data = await response.json();
        setFilm(data.results.slice(10, 20));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [genero]);

  return (
    <div>
      <h1 className="text-3xl ps-7 font-semibold">{title}</h1>
      <div className="relative flex items-center">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
        |
        <div
          id={sliderId}
          className="scrollbar-hide w-full h-full overflow-x-scroll overflow-y-hidden scroll whitespace-nowrap scroll-smooth"
        >
          {film && film.length > 0 && film.map((film) => (
            <Link to={`/${film.id}`} key={film.id}>
              <div className="pt-5 ps-7 w-[300px] h-[450px] pe-8 cursor-pointer hover:scale-105 ease-in-out duration-300 inline-block">
                <img
                  className="w-full h-80 rounded-xl"
                  src={`${imagePath}${film.poster_path}`}
                  alt={film.title}
                />
              </div>
            </Link>
          ))}
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />
      </div>
    </div>
  );
}

export default FilmesHome;
