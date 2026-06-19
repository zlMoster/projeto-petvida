import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark navbar-custom shadow-sm ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          ONG SJPA
        </NavLink>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Início</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/adocao">Adoção</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/doacoes">Doações</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contato">Contato</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sobre">Sobre</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;