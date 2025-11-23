import React, { useState } from "react";
import SearchForm from "../../components/AdvancedSearch/SearchForm";
import BookList from "../../components/AdvancedSearch/BookList";
import "./PageResults.css";

const PageResults = () => {
  const [query, setQuery] = useState({
    title: "",
    author: "",
    genre: "",
  });
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
    // Contenedor principal para aplicar estilos (PageResults.css)
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
  );
};

export default PageResults;
