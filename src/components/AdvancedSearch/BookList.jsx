import React from "react";
import { useNavigate } from "react-router-dom";

const BookList = ({ books, loading, error }) => {
  const navigate = useNavigate();

  if (loading) return <p>Cargando resultados...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (books.length === 0) return <p>No se encontraron libros</p>;

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`)
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {books.map((book) => (
        <li
          key={book.id}
          onClick={() => handleBookClick(book.id)}
          style={{ cursor: 'pointer', marginBottom: '16px' }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <img
              src={book.imageLinks?.smallThumbnail || 'https://placehold.co/128x192/D9C179/ffffff?text=Sin+Portada'}
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
              <p>Autor: {book.authors?.join(', ') || 'No disponible'}</p>
              <p>Páginas: {book.pageCount || 'No disponible'}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
