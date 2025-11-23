import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logoAlt from '../../assets/logo-alt.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
    setIsUserMenuOpen(false);
  };

  const confirmLogout = () => {
    // Aquí iría la lógica de cerrar sesión
    console.log('Cerrando sesión...');
    setShowLogoutModal(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src={logoAlt} alt="El Último Párrafo" />
          <span className="logo-text">El Último Párrafo</span>
        </Link>

        {/* Navegación Desktop */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/main" className="nav-link">Catálogo</Link>
          <Link to="/my-library" className="nav-link">Mi Biblioteca</Link>
          <Link to="#" className="nav-link">Búsqueda Avanzada</Link>
        </nav>

        {/* Menú de Usuario */}
        <div className="header-actions">
          <div className="user-menu">
            <button className="user-menu-btn" onClick={toggleUserMenu}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Mi Cuenta</span>
            </button>

            {isUserMenuOpen && (
              <div className="user-dropdown">
                <Link to="/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  Mi Perfil
                </Link>
                <Link to="/my-library" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                  </svg>
                  Mi Biblioteca
                </Link>
                <Link to="/settings" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                  </svg>
                  Configuración
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>

          {/* Menú Hamburguesa para Mobile */}
          <button className="hamburger-btn" onClick={toggleMenu}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Mobile */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={toggleMenu}>Inicio</Link>
          <Link to="/main" className="mobile-link" onClick={toggleMenu}>Catálogo</Link>
          <Link to="/my-library" className="mobile-link" onClick={toggleMenu}>Mi Biblioteca</Link>
          <Link to="#" className="mobile-link" onClick={toggleMenu}>Búsqueda Avanzada</Link>
          <div className="mobile-divider"></div>
          <Link to="/profile" className="mobile-link" onClick={toggleMenu}>Mi Perfil</Link>
          <Link to="/settings" className="mobile-link" onClick={toggleMenu}>Configuración</Link>
          <button className="mobile-link logout" onClick={() => { handleLogout(); toggleMenu(); }}>
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Modal de Confirmación de Cierre de Sesión */}
      {showLogoutModal && (
        <div className="logout-modal-overlay" onClick={cancelLogout}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <h3>¿Cerrar sesión?</h3>
            <p>¿Estás seguro que deseas cerrar sesión?</p>
            <div className="logout-modal-actions">
              <button className="btn-cancel" onClick={cancelLogout}>
                Cancelar
              </button>
              <button className="btn-confirm" onClick={confirmLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;