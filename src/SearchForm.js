import React from 'react';
import { useGlobalContext } from './context';
const SearchForm = () => {
  const { query, setQuery, error } = useGlobalContext();
  const handleSubmit = (event) => {
    setQuery(event.target.value);
  };
  console.log(error.msg);
  return (
    <form
      className='search-form'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>Search Movies</h2>
      <input
        type='text'
        className='form-input'
        placeholder='Search a Movie'
        value={query}
        onChange={handleSubmit}
      />
      {error.show && <div className='error'>{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
