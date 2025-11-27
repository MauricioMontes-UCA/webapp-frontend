import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import "./Description.css";
import portada from "../../assets/Ventajasin.png";
import Header from "../../components/Header/Header.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import API from "../../utils/api.js";


const Description = () => {
  const { googleId } = useParams()

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  const [rating, setRating] = useState(3.5);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      if (!googleId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await API.get(`/api/books/${googleId}`);
        setBook(response.data);
      } 
      catch (err) {
        const errorMessage = err.response?.data?.message || "Ocurrió un error al cargar los datos del libro";
        setError(errorMessage);
        console.error(errorMessage)
      } 
      finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [googleId]);

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
    <>
      <Header />
      <SearchBar />
      <div className="descripcion-container">

        <div className="book-cover">
          <img src={book.imageLinks?.thumbnail} alt="Portada del libro" />
        </div>

        {/*con la api la informacion del libro cambiara*/}
        <div className="book-info">
          <h2 className="book-title">{book.title}</h2>
          <p className="book-meta">{book.authors?.join(", ")} • {book.categories?.join(", ")}</p>
          <p className="book-description" dangerouslySetInnerHTML={{ __html: book.description }}></p>

          <p className="book-extra">
            Publicado en {book.publishedDate?.substring(0, 4)} — {book.pageCount} páginas
          </p>


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
    </>
  );
};

export default Description;