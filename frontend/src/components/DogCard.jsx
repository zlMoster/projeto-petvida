import React from 'react';
import { Link } from 'react-router-dom';

function DogCard({ id, nome, idade, raca, foto, porte }) {
  const porteLabel = { pequeno: 'Pequeno', medio: 'Médio', grande: 'Grande' }[porte] || porte;

  return (
    <div className="col animate-fade-in-up">
      <div className="card card-custom h-100">
        <div className="card-img-wrapper">
          <img
            src={foto}
            className="card-img-top card-cachorro-img"
            alt={`Foto de ${nome}`}
            loading="lazy"
          />
        </div>
        <div className="card-body d-flex flex-column p-4">
          <h5 className="card-title fw-bold">{nome}</h5>
          <p className="card-text text-muted mb-3">
            {idade} • {raca} • {porteLabel}
          </p>
          <Link to={`/detalhes?id=${id}`} className="btn btn-primary mt-auto">
            Conhecer {nome}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DogCard;