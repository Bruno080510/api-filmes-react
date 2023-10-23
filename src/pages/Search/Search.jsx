import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [search, setSearch] = useState([]);
  const [nome, setNome] = useState('');
  const [salvar, setSalvar] = useState('');
  const KEY = process.env.REACT_APP_KEY;
  const imagePath = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    if (nome) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${salvar}`
      )
        .then((response) => response.json())
        .then((data) => {
          const filteredMovies = data.results.filter((movie) => movie.poster_path);
          setSearch(filteredMovies);
        })
        .catch((error) => {
          console.error('Erro ao buscar filmes:', error);
        });
    }
  }, [KEY, salvar]);

  const catchName = (e) => {
    setNome(e.target.value);
  };

  function salvarNome() {
    setSalvar(nome);
  }

  return (
    <div className="text-black flex flex-col items-center justify-center pt-10">
      <div className="pb-10 flex flex-row items-center">
        <input
          className="p-5 w-60 h-10 rounded-lg"
          type="text"
          placeholder="Digite o nome do filme..."
          onChange={catchName}
        />
        <div className=' flex flex-row ps-3'>
          <button
            className="hover:bg-black hover:text-white font-medium w-24 h-8 rounded-xl bg-white"
            onClick={salvarNome}
          >
            Pesquisar
          </button>
          <Link to={'/'}>  
          <div className='ps-3 text-white font-bold'>
              <button
                className="hover:bg-black hover:text-white font-medium w-24 h-8 rounded-xl bg-red-700"
                onClick={salvarNome}
              >
                Voltar
              </button>
            </div> 
          </Link>
        </div>
      </div>
      {search.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {search.map((movie) => (
            <Link to={`/${movie.id}`} key={movie.id}>
              <div className="pt-5 ps-7 w-[300px] h-[450px] pe-8 cursor-pointer hover:scale-105 ease-in-out duration-300 inline-block">
                <img
                  className="w-full h-80 rounded-xl"
                  src={`${imagePath}${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
