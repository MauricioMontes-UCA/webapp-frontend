import React from "react";
import logo from "../../assets/logo.svg";
import "../Header/Header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <img
          src={logo}
          alt="Logo"
          width="50"
          className="d-inline-block align-text-top"
        />
        <a className="navbar-brand" href="#">
          El ultimo párrafo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
           <h5> <a className="nav-link" href="#">
              Inicio
            </a> </h5>
           <h5> <a className="nav-link" href="#">
              Contáctenos
            </a> </h5>
           <h5> <a className="nav-link" href="#">
              Mi perfil
            </a> </h5>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
