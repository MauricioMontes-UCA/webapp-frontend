import React from "react";

const BookList = ({ books, loading, error }) => {
  if (loading) return <p>Cargando resultados...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (books.length === 0) return <p>No se encontraron libros</p>;

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <strong>{book.title}</strong> - {book.author} ({book.genre})
        </li>
      ))}
    </ul>
  );
};

export default BookList;
