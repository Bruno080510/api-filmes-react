import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DetalheSerie(){
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [serie, setSerie] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => response.json())
            .then((data) => {
                const res = data.results;
                let serie = res.find((key) => {
                    return key.id === id;
                });
                setSerie(serie);
            }); 
    }, [KEY, id]);

    return (
        <div>
            <nav>
                <h1>Movie</h1>
            </nav>
            <img
                className="img_movie"
                src={`${imagePath}${serie.poster_path}`}
                alt="{movie.title}"
            />
            <div className="container">
                <h1>{serie.title}</h1>
                <h3>Data de lançamento: {serie.release_date}</h3>
                <div className="descricao">
                    <h4>Descrição: </h4>
                    <p className="movie-desc">{serie.overview}</p>
                </div>
                <Link to="/">
                    <button className="link_button">Voltar</button>
                </Link>
            </div>
        </div>
    );
};

export default DetalheSerie;
