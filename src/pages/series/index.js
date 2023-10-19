import { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "../filmes/style";
import { Link } from "react-router-dom";

function Series (){
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movies, setMovies] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${KEY}&with_cast=ID_DO_ARTISTA_AQUI&sort_by=popularity.desc`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }, [KEY]);
    return(
        <Container>
        <h1>Series</h1>
        <MovieList>
            {movies.map((movie) => {
                return (
                    <Movie key={movie.id}>
                        <img
                            src={`${imagePath}${movie.poster_path}`}
                            alt="{movie.title}"
                        />
                        <span>{movie.title}</span>

                        <Link to={`/${movie.id}`}>
                            <Btn>Detalhes</Btn>
                        </Link>

                    </Movie>
                );
            })}
        </MovieList>
    </Container>
    )
}

export default Series