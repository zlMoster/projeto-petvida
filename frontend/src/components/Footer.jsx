import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="text-white fw-bold mb-3">ONG SJPA</h5>
            <p className="mb-0" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              Resgatando, cuidando e encontrando lares para cães abandonados desde 2018.
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="text-white fw-bold mb-3">Links Rápidos</h6>
            <div className="d-flex flex-column gap-1">
              <Link to="/adocao" className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.6)' }}>Adotar</Link>
              <Link to="/doacoes" className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.6)' }}>Doar</Link>
              <Link to="/contato" className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.6)' }}>Contato</Link>
              <Link to="/sobre" className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.6)' }}>Sobre</Link>
            </div>
          </div>
          <div className="col-md-4">
            <h6 className="text-white fw-bold mb-3">Contato</h6>
            <p className="mb-1" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              contato@ongsjpa.org.br
            </p>
            <p className="mb-0" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              (11) 99999-8888
            </p>
          </div>
        </div>
        <hr className="border-light my-3" />
        <p className="mb-0 text-center" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} ONG SJPA. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;