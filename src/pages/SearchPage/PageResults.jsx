import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../../components/AdvancedSearch/SearchForm";
import BookList from "../../components/AdvancedSearch/BookList";
import Header from "../../components/Header/Header";
import "./PageResults.css";
import API from "../../utils/api";

const PageResults = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({
    title: "",
    author: "",
    subject: "",
  });
  // Buscar automáticamente si hay un parámetro q en la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      handleSearchParam(q);
    }
    // eslint-disable-next-line
  }, [location.search]);

  // Búsqueda automática por ISBN
  const handleSearchParam = async (q) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get(`/api/books/search/${q}`)

      const bookList = response.data.items || [];
      setBooks(bookList);
    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const filteredQuery = Object.entries(query).reduce((acc, [key, value]) => {
      if (value.trim()) {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (Object.keys(filteredQuery).length === 0) {
      setLoading(false);
      return;
    }

    console.log(filteredQuery)

    try {
      const response = await API.post('/api/books/search/', filteredQuery)

      const bookList = response.data.items || [];
      setBooks(bookList);
    } 
    catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }

  };

  return (
    <div className="searchpage-bg">
      <Header />
      <div className="page-results">
        <h1>Búsqueda Avanzada de Libros</h1>
        {/* Formulario para armar queryParts */}
        <SearchForm
          query={query}
          onChange={handleInputChange}
          onSubmit={handleSearch}
          loading={loading}
        />
        {/* Mostrar lista de libros o estados */}
        <BookList books={books} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default PageResults;
