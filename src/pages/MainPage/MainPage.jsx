
import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import API from '../../utils/api';
import BookCard from '../../components/BookCard/BookCard';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchResults, setSearchResults] = useState(null);
  const [allBookLists, setAllBookLists] = useState([])
  const navigate = useNavigate()

  // Categorías de libros
  const categories = ['recent', 'bestseller', 'fiction', 'mystery', 'romance', 'science', 'history']

  // Función para obtener libros de Google Books
  const fetchBooks = async (
    // query = 'bestseller', maxResults = 12
  ) => {
    try {
      const response = await API.get("/api/books/")
      const lists = response.data.lists
      return lists || [];
    } 
    catch (error) {
      console.error('Error al obtener libros:', error);
      return [];
    }
  };

  // Cargar libros iniciales y nuevos lanzamientos
  useEffect(() => {
    const loadInitialBooks = async () => {
      setLoading(true);

      const fetchedLists = await fetchBooks();
      setAllBookLists(fetchedLists);

      const mainBookList = fetchedLists.find(list => list.subject === 'bestseller')
      const releasesList = fetchedLists.find(list => list.subject === 'recent')

      if (mainBookList) {
        setBooks(mainBookList.items)
      }
      if (releasesList) {
        setNewReleases(releasesList.items)
      }
      
      setLoading(false);
    };
    loadInitialBooks();
  }, []);

  // Filtrar por categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const listForCategory = allBookLists.find(list => list.subject === category)
    
    if (listForCategory) {
      setBooks(listForCategory.items);
    }
    else {
      setBooks([]);
    }
  };

  const handleButtonClick = (bookId) => {
    navigate(`/books/${bookId}`)
  }

  // Obtener imagen del libro
  const getBookImage = (book) => {
    return book.imageLinks?.thumbnail || 
           book.imageLinks?.smallThumbnail ||
           'https://via.placeholder.com/128x192/D9C179/ffffff?text=Sin+Portada';
  };

  // Obtener autores
  const getAuthors = (book) => {
    return book.authors?.join(', ') || 'Autor desconocido';
  };

  // Obtener rating
  const getRating = (book) => {
    // TODO: Falta ver cómo obtener un avgRating por cada libro
    return book.averageRating || 0;
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
          
          {/* Búsqueda funcional */}
          <SearchBar onResults={setSearchResults} />
          <p className="search-note">Puedes buscar por título, autor, género o ISBN</p>

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
                      <img src={getBookImage(book)} alt={book.title} />
                      <div className="book-overlay-mini">
                        <Button variant="outline" size="small" onClick={() => handleButtonClick(book.id)}>Ver Detalles</Button>
                      </div>
                    </div>
                    <div className="book-info-mini">
                      <h4 className="book-title-mini">{book.title}</h4>
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
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
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
              <BookCard
                  key={book.id}
                  book={{
                    id: book.id,
                    googleId: book.id,
                    cover: getBookImage(book),
                    title: book.title,
                    author: getAuthors(book),
                    pages: book.pageCount || 0
                  }}
              />
            ))
            
            /* {books.map((book) => (
              <div key={book.id} className="book-card book-card-horizontal">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                  <div className="book-cover">
                    <img src={getBookImage(book)} alt={book.title} />
                  </div>

                  <div className="book-actions-right" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem', marginTop: '0.5rem' }}>
                    <Button variant="outline" size="small">Ver Detalles</Button>
                    <Button variant="primary" size="small">Agregar a Biblioteca</Button>
                  </div>
                  
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.volumeInfo?.title}</h3>
                  <p className="book-author">{getAuthors(book)}</p>
                  
                  {book.publishedDate && (
                    <p className="book-year">
                      {new Date(book.publishedDate).getFullYear()}
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
                  
                  {book.description && (
                    <p className="book-description">
                      {book.description.substring(0, 120)}...
                    </p>
                  )}
                </div>
              </div>
            ))} */}
          </div>
        )}
      </section>
    </div>
  );
};

export default MainPage;


// "id","title": "authors": [
// 						"Claud Cockburn"
// 					],
// 					"publisher": "London : Sidgwick and Jackson",
// 					"publishedDate": "1972",
// 					"description": "The heros, clean cut and upper-class, the heroines melting and for the most part pure.",
// 					"industryIdentifiers": [
// 						{
// 							"type": "OTHER",
// 							"identifier": "UOM:39015066050611"
// 						}
// 					],
// 					"pageCount": 208,
// 					"categories": [
// 						"Literary Criticism"
// 					],
// 					"maturityRating": "NOT_MATURE",
// 					"imageLinks": {
// 						"smallThumbnail": "http://books.google.com/books/content?id=5TJaAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
// 						"thumbnail": "http://books.google.com/books/content?id=5TJaAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
// 					},
// 					"language": "en"
// 				},