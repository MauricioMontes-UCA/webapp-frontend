import React, { useState } from "react";
import "./Description.css";
import portada from "../../assets/LasVentajas.jpg";

const Description = () => {
  const [rating, setRating] = useState(3.5);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSliderChange = (e) => {
    setRating(parseFloat(e.target.value));
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review.trim() === "") return;
    setReviews([...reviews, review]);
    setReview("");
  };

  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
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
          experiencias que lo marcan en su camino hacia la madurez. Tras la
          muerte de su mejor amigo y con un pasado familiar complicado, Charlie
          se siente solo y fuera de lugar, hasta que conoce a Patrick y Sam, dos
          estudiantes mayores que lo acogen en su grupo y le muestran un mundo
          nuevo lleno de música, fiestas, amistad y autodescubrimiento. A medida
          que avanza el año, Charlie enfrenta temas como el amor, la pérdida, la
          depresión, el abuso y la búsqueda de identidad, aprendiendo que ser
          “invisible” puede protegerlo, pero también puede impedirle vivir
          plenamente.
        </p>

        <p className="book-extra">Publicado en 1999 — 213 páginas</p>

        
        <div className="rating-section">
          <div className="stars">
            {[...Array(5)].map((_, index) => {
              if (index < filledStars) {
                return <span key={index}>★</span>;
              } else if (index === filledStars && hasHalfStar) {
                return <span key={index}>☆</span>;
              } else {
                return <span key={index}>☆</span>;
              }
            })}
          </div>

          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={handleSliderChange}
          />

          <p className="rating-value">{rating.toFixed(1)} / 5</p>
        </div>

        
        <div className="review-section">
          <h3>Deja tu reseña</h3>
          <form onSubmit={handleReviewSubmit}>
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="Escribe tu opinión sobre el libro..."
              rows="4"
              className="review-textarea"
            ></textarea>
            <br />
            <button type="submit" className="review-button">
              Enviar reseña
            </button>
          </form>

          
          {reviews.length > 0 && (
            <div className="review-list">
              <h3>Reseñas de otros lectores:</h3>
              <ul>
                {reviews.map((rev, index) => (
                  <li key={index} className="review-item">
                    {rev}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
