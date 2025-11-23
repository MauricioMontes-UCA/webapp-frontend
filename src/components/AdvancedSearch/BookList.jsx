import React from "react";

const BookList = ({ books, loading, error }) => {
  if (loading) return <p>Cargando resultados...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (books.length === 0) return <p>No se encontraron libros</p>;

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <img
              src={book.cover}
              alt={book.title}
              style={{
                width: "80px",
                height: "110px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />

            <div>
              <strong>{book.title}</strong>
              <p>Autor: {book.author}</p>
              <p>Páginas: {book.pages}</p>
              <p>Progreso: {book.progress}%</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
