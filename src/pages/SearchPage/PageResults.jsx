import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../../components/AdvancedSearch/SearchForm";
import BookList from "../../components/AdvancedSearch/BookList";
import Header from "../../components/Header/Header";
import "./PageResults.css";

const PageResults = () => {
  const location = useLocation();
  const [query, setQuery] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: ""
  });
    // Buscar automáticamente si hay un parámetro isbn en la URL
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const isbn = params.get("isbn");
      if (isbn) {
        setQuery((prev) => ({ ...prev, isbn }));
        handleSearchParam(isbn);
      }
      // eslint-disable-next-line
    }, [location.search]);

    // Búsqueda automática por ISBN
    const handleSearchParam = async (isbn) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/books/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isbn }),
        });
        if (!response.ok) {
          throw new Error("Error en la búsqueda de libros");
        }
        const bookList = await response.json();
        setBooks(bookList);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/books/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query), // Enviamos queryParts según tu diagrama
      });

      if (!response.ok) {
        throw new Error("Error en la búsqueda de libros");
      }

      const bookList = await response.json(); // Recibimos book list
      setBooks(bookList);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
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
