import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from './context';
import axios from 'axios';
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const SingleMovie = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState({ show: false, msg: '' });

  async function fetchMovie(url) {
    setLoading(true);
    try {
      const res = await axios.get(url);
      const data = res.data;
      if (data.Response !== 'False') {
        setMovie(data);
        console.log(data);
        setLoading(false);
      } else {
        setError({ show: true, msg: data.Error });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (loading) {
    return <div className='loading'></div>;
  }
  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to='/' className='btn'>
          Back to movies
        </Link>
      </div>
    );
  }

  const {
    Actors: actors,
    Awards: awards,
    BoxOffice: money,
    Director: director,
    Genre: genre,
    Plot: plot,
    Poster: image,
    Rated: pg,
    Released: released,
    Runtime: time,
    Title: title,
  } = movie;
  const { Source, Value } = movie.Ratings[1];

  return (
    <section className='single-movie'>
      <img src={image !== 'N/A' ? image : url} alt={title} />
      <div className='single-movie-info'>
        <h2>{title}</h2>
        <p>{pg}</p>
        <h4>{released}</h4>
        <p>{genre}</p>
        <p>{plot}</p>
        <ul>
          <li>
            <strong>Directed by: </strong>
            {director}
          </li>
          <li>
            <strong>Starring: </strong>
            {actors}
          </li>
          <li>
            <strong>Duration: </strong>
            {time}
          </li>
        </ul>
        <br></br>
        <ul>
          <li>
            <strong>Awards and nomination: </strong>
            {awards}
          </li>
          <li>
            <strong>Box Office: </strong>
            {money}
          </li>
          <li>
            <strong>Rating: </strong>
            {Source}: {Value}
          </li>
        </ul>
        <Link to='/' className='btn'>
          Back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
