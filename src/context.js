import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: '' });
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('avengers');

  async function fetchMovies(url) {
    setIsLoading(true);
    try {
      const res = await axios.get(url);

      if (res.data.Response === 'True') {
        setMovies(res.data.Search);
        setError({ show: false, msg: '' });
      } else setError({ show: true, msg: res.data.Error });

      console.log(error.msg);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${query}`);
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, error, movies, setQuery, query }}>
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
