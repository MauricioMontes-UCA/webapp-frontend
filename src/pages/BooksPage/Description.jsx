import React, { useState, useEffect } from "react";
import { getBookRatingStats, getUserBookRating, createRating, updateRating } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import "./Description.css";
import portada from "../../assets/Ventajasin.png";
import Header from "../../components/Header/Header.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";





function Description() {
  // Obtener la googleId de la URL
  const { googleId } = useParams();

  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [review, setReview] = useState("");
  const [hasUserRating, setHasUserRating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      setLoading(true);
      try {
        // Obtener stats generales
        const stats = await getBookRatingStats(googleId);
        setAverageRating(stats.averageRating || 0);
        setTotalRatings(stats.totalRatings || 0);
        // Obtener rating del usuario autenticado
        const userRating = await getUserBookRating(googleId);
        if (userRating && userRating.rating !== undefined) {
          setRating(userRating.rating);
          setReview(userRating.review || "");
          setHasUserRating(true);
        } else {
          setRating(0);
          setReview("");
          setHasUserRating(false);
        }
      } catch (err) {
        setError("Error al cargar el rating");
      } finally {
        setLoading(false);
      }
    };
    fetchRating();
  }, [googleId]);

  const handleSliderChange = (e) => {
    setRating(parseFloat(e.target.value));
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (hasUserRating) {
        // Actualizar rating existente
        await updateRating({ book_id: googleId, rating, comment: review });
      } else {
        // Crear nuevo rating
        await createRating({ book_id: googleId, rating, comment: review });
      }
      // Refrescar datos
      const stats = await getBookRatingStats(googleId);
      setAverageRating(stats.averageRating || 0);
      setTotalRatings(stats.totalRatings || 0);
      const userRating = await getUserBookRating(googleId);
      if (userRating && userRating.rating !== undefined) {
        setRating(userRating.rating);
        setReview(userRating.review || "");
        setHasUserRating(true);
      } else {
        setRating(0);
        setReview("");
        setHasUserRating(false);
      }
    } catch (err) {
      setError("Error al guardar el rating");
    }
  };

  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <>
      <Header />
      <SearchBar />
      <div className="descripcion-container">

        <div className="book-cover">
          <img src={portada} alt="Portada del libro" />
        </div>

        {/*con la api la informacion del libro cambiara*/}
        <div className="book-info">
          <h2 className="book-title">Las ventajas de ser un marginado</h2>
          <p className="book-meta">Stephen Chbosky • Drama, Coming-of-age</p>
          <p className="book-description">
            Charlie es un adolescente introvertido y sensible que acaba de empezar
            la preparatoria. A través de cartas dirigidas a un amigo anónimo,
            narra su vida cotidiana, sus pensamientos más profundos y las
            experiencias que lo marcan en su camino hacia la madurez.
          </p>

          <p className="book-extra">Publicado en 1999 — 213 páginas</p>


          <div className="rating-section">
            <div className="stars">
              {[...Array(5)].map((_, index) => {
                if (index < Math.floor(averageRating)) {
                  return <span key={index} style={{ color: '#FFD700' }}>★</span>;
                } else {
                  return <span key={index} style={{ color: '#ccc' }}>★</span>;
                }
              })}
            </div>
            <p className="rating-value">
              {averageRating.toFixed(1)} / 5 ({totalRatings} calificaciones)
            </p>
            <hr />
            <form onSubmit={handleReviewSubmit} className="user-rating-form">
              <label htmlFor="user-rating">Tu calificación:</label>
              <input
                id="user-rating"
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={rating}
                onChange={handleSliderChange}
                disabled={loading}
              />
              <span style={{ marginLeft: 8 }}>{rating.toFixed(1)} / 5</span>
              <textarea
                value={review}
                onChange={handleReviewChange}
                placeholder="Escribe tu opinión sobre el libro..."
                rows="4"
                className="review-textarea"
                disabled={loading}
                style={{ display: 'block', width: '100%', marginTop: 8 }}
              ></textarea>
              <button type="submit" className="review-button" disabled={loading} style={{ marginTop: 8 }}>
                {hasUserRating ? 'Actualizar calificación' : 'Enviar calificación'}
              </button>
              {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
            </form>
          </div>


          {/* Aquí podrías mostrar una lista de reseñas de otros usuarios si lo deseas */}
        </div>
      </div>
    </>
  );
}

export default Description;