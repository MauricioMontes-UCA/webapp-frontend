import React, { useState, useEffect } from 'react';
import './MyLibrary.css';
import Header from '../../components/Header/Header';

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState('reading');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    reading: 0,
    toRead: 0,
    completed: 0
  });

  // URL base de la API - cambiar según configuración del backend
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const tabs = [
    { id: 'reading', name: 'Leyendo' },
    { id: 'toRead', name: 'Leer' },
    { id: 'completed', name: 'Terminado' }
  ];

  // Cargar estadísticas de la biblioteca
  const loadStats = async () => {
    try {
      // TODO: Obtener el userId del contexto de autenticación
      const userId = localStorage.getItem('userId') || '1';
      
      const response = await fetch(`${API_BASE_URL}/library/stats/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  // Cargar libros de la biblioteca según categoría
  const loadLibraryBooks = async () => {
    setLoading(true);
    
    try {
      // TODO: Obtener el userId del contexto de autenticación
      const userId = localStorage.getItem('userId') || '1';
      
      const response = await fetch(`${API_BASE_URL}/library/${userId}/${activeTab}`);
      
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Error al cargar libros');
        setBooks([]);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadLibraryBooks();
  }, [activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const EmptyState = ({ tab }) => {
    const messages = {
      reading: {
        title: 'No estás leyendo nada ahora',
        message: 'Marca un libro como "Leyendo" para hacer seguimiento de tu lectura actual.'
      },
      toRead: {
        title: 'Tu lista está vacía',
        message: 'Agrega libros que quieras leer en el futuro.'
      },
      completed: {
        title: 'Aún no has completado ningún libro',
        message: 'Los libros que termines aparecerán aquí. ¡Sigue leyendo!'
      }
    };

    const state = messages[tab] || messages.reading;

    return (
      <div className="empty-state">
        <h3 className="empty-state-title">{state.title}</h3>
        <p className="empty-state-message">{state.message}</p>
        <a href="/main" className="empty-state-button">
          Explorar Catálogo
        </a>
      </div>
    );
  };

  const BookItem = ({ book }) => (
    <div className="library-book-item">
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
        {book.progress && (
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${book.progress}%` }}
            ></div>
          </div>
        )}
      </div>
      <div className="book-actions">
        <button className="action-btn" title="Ver detalles">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        </button>
        <button className="action-btn" title="Más opciones">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="my-library-page">
      <Header />
      
      <div className="library-container">
        {/* Header de la página */}
        <div className="library-header">
          <div className="library-title-section">
            <h1 className="library-title">Mi Biblioteca</h1>
            <p className="library-subtitle">
              Gestiona y organiza tu colección personal de libros
            </p>
          </div>
          
          <div className="library-stats">
            <div className="stat-item">
              <span className="stat-number">{stats.reading}</span>
              <span className="stat-label">Leyendo</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.toRead}</span>
              <span className="stat-label">Por leer</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.completed}</span>
              <span className="stat-label">Completados</span>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="library-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="tab-name">{tab.name}</span>
              <span className="tab-count">{stats[tab.id]}</span>
            </button>
          ))}
        </div>

        {/* Filtros y ordenamiento */}
        <div className="library-controls">
          <div className="view-options">
            <button className="view-btn active" title="Vista de lista">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"/>
              </svg>
            </button>
            <button className="view-btn" title="Vista de cuadrícula">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/>
              </svg>
            </button>
          </div>

          <div className="sort-options">
            <select className="sort-select">
              <option value="recent">Más recientes</option>
              <option value="title">Título A-Z</option>
              <option value="author">Autor A-Z</option>
              <option value="progress">Progreso</option>
            </select>
          </div>
        </div>

        {/* Contenido de la biblioteca */}
        <div className="library-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Cargando tu biblioteca...</p>
            </div>
          ) : books.length === 0 ? (
            <EmptyState tab={activeTab} />
          ) : (
            <div className="books-list">
              {books.map(book => (
                <BookItem key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLibrary;
