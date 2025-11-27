import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./BookCard.css";
import { useNavigate } from "react-router-dom";

function BookCard({ book, isFavorite = false, onToggleFavorite }) {
  const [favorite, setFavorite] = useState(isFavorite);
  const navigate = useNavigate()

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    setFavorite(!favorite);
    if (onToggleFavorite) {
      onToggleFavorite(book.id, !favorite);
    }
  };

  const handleCoverClick = () => {
    navigate(`/books/${book.googleId}`);
  };

  return (
    <div className="book-card">
      <div className="book-cover" onClick={handleCoverClick}>
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

      <div className="book-actions">
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
