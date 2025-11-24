import React, { useState } from 'react';
import Button from '../Button/Button';
import './SearchBar.css';

const SearchBar = ({ onResults }) => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(searchValue.trim())}&maxResults=10&key=${API_KEY}`
      );
      const data = await response.json();
      onResults(data.items || []);
    } catch (err) {
      onResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="search-bar">
      <form style={{ display: 'flex', alignItems: 'center', width: '100%' }} onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por título, autor, género o ISBN..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
