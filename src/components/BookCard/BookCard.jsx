
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./BookCard.css";


function BookCard({ book, isFavorite = false, onToggleFavorite }) {
  const [favorite, setFavorite] = useState(isFavorite);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    if (onToggleFavorite) {
      onToggleFavorite(book.id, !favorite);
    }
  };

  const handleCardClick = () => {
    // book.id debe ser la ID de Google Books
    navigate(`/books/${book.id}`);
  };

  return (
    <div className="book-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="book-cover">
        <img src={book.cover} alt={book.title} />
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-meta">
          <span className="book-pages">{book.pages} páginas</span>
          {book.progress && (
            <span className="book-progress">{book.progress}% leído</span>
          )}
        </div>
      </div>
      <div className="book-actions" onClick={e => e.stopPropagation()}>
        <button
          className="action-btn favorite-btn"
          title={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          onClick={handleFavoriteClick}
        >
          {favorite ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
        {/* ...otros botones de acción... */}
      </div>
    </div>
  );
}

export default BookCard;
