import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

  // Categorías de libros
  const categories = [
    { id: 'all', name: 'Todos', query: 'bestseller' },
    { id: 'fiction', name: 'Ficción', query: 'fiction' },
    { id: 'mystery', name: 'Misterio', query: 'mystery' },
    { id: 'romance', name: 'Romance', query: 'romance' },
    { id: 'science', name: 'Ciencia', query: 'science' },
    { id: 'history', name: 'Historia', query: 'history' }
  ];

  // Función para obtener libros de Google Books
  const fetchBooks = async (query = 'bestseller', maxResults = 12) => {
    try {
      const response = await fetch(
        `${BASE_URL}?q=${query}&maxResults=${maxResults}&orderBy=newest&key=${API_KEY}`
      );
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error al obtener libros:', error);
      return [];
    }
  };

  // Cargar libros iniciales y nuevos lanzamientos
  useEffect(() => {
    const loadInitialBooks = async () => {
      setLoading(true);
      const [mainBooks, releases] = await Promise.all([
        fetchBooks('bestseller', 12),
        fetchBooks('new+releases', 8)
      ]);
      console.log('Libros principales cargados:', mainBooks.length);
      console.log('Nuevos lanzamientos:', releases.length);
      setBooks(mainBooks);
      setNewReleases(releases);
      setLoading(false);
    };
    loadInitialBooks();
  }, []);

  // Filtrar por categoría
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    const category = categories.find(cat => cat.id === categoryId);
    const results = await fetchBooks(category.query, 12);
    setBooks(results);
    setLoading(false);
  };

  // Obtener imagen del libro
  const getBookImage = (book) => {
    return book.volumeInfo?.imageLinks?.thumbnail || 
           book.volumeInfo?.imageLinks?.smallThumbnail ||
           'https://via.placeholder.com/128x192/D9C179/ffffff?text=Sin+Portada';
  };

  // Obtener autores
  const getAuthors = (book) => {
    return book.volumeInfo?.authors?.join(', ') || 'Autor desconocido';
  };

  // Obtener rating
  const getRating = (book) => {
    return book.volumeInfo?.averageRating || 0;
  };

  return (
    <div className="main-page">
      <Header />
      
      {/* Hero Section con Búsqueda */}
      <section className="hero-section-main">
        <div className="hero-overlay"></div>
        <div className="hero-content-main">
          <h1 className="hero-title-main">Descubre tu próxima lectura</h1>
          <p className="hero-subtitle-main">
            Explora miles de libros y encuentra historias que te inspirarán
          </p>
          
          {/* Búsqueda - Diseño para que tu compañera lo implemente */}
          <div className="search-bar">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por título, autor, género o ISBN..."
                disabled
              />
            </div>
            <Button 
              variant="primary" 
              type="button"
              disabled
            >
              Buscar
            </Button>
          </div>
          <p className="search-note">* Funcionalidad de búsqueda avanzada pendiente de implementación</p>
        </div>
      </section>

      {/* Nuevos Lanzamientos */}
      <section className="new-releases-section">
          <div className="section-header">
            <h2 className="section-title">Nuevos Lanzamientos</h2>
            <p className="section-subtitle">Las últimas novedades literarias</p>
          </div>
          
          <div className="books-carousel">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando libros...</p>
              </div>
            ) : (
              <div className="carousel-track">
                {newReleases.map((book) => (
                  <div key={book.id} className="book-card-mini">
                    <div className="book-cover-mini">
                      <img src={getBookImage(book)} alt={book.volumeInfo?.title} />
                      <div className="book-overlay-mini">
                        <Button variant="outline" size="small">Ver Detalles</Button>
                      </div>
                    </div>
                    <div className="book-info-mini">
                      <h4 className="book-title-mini">{book.volumeInfo?.title}</h4>
                      <p className="book-author-mini">{getAuthors(book)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      {/* Filtros por Categoría */}
      <section className="filters-section">
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Catálogo Principal */}
      <section className="catalog-section">
        <div className="section-header">
          <h2 className="section-title">Explora Nuestro Catálogo</h2>
          <p className="section-subtitle">
            {books.length} {books.length === 1 ? 'libro encontrado' : 'libros encontrados'}
          </p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando libros...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="no-results">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <h3>No se encontraron resultados</h3>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id} className="book-card book-card-horizontal">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                  <div className="book-cover">
                    <img src={getBookImage(book)} alt={book.volumeInfo?.title} />
                  </div>
                  <div className="book-actions-right" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem', marginTop: '0.5rem' }}>
                    <Button variant="outline" size="small">Ver Detalles</Button>
                    <Button variant="primary" size="small">Agregar a Biblioteca</Button>
                  </div>
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.volumeInfo?.title}</h3>
                  <p className="book-author">{getAuthors(book)}</p>
                  
                  {book.volumeInfo?.publishedDate && (
                    <p className="book-year">
                      {new Date(book.volumeInfo.publishedDate).getFullYear()}
                    </p>
                  )}
                  
                  <div className="book-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`star ${i < getRating(book) ? 'filled' : ''}`}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>
                    {getRating(book) > 0 ? (
                      <span className="rating-value">{getRating(book).toFixed(1)}</span>
                    ) : (
                      <span className="rating-value">Sin calificación</span>
                    )}
                  </div>
                  
                  {book.volumeInfo?.description && (
                    <p className="book-description">
                      {book.volumeInfo.description.substring(0, 120)}...
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MainPage;
