import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchCachorro } from '../services/api';

function Detalhes() {
  const [searchParams] = useSearchParams();
  const [cachorro, setCachorro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) { setError(true); setLoading(false); return; }
    fetchCachorro(parseInt(id))
      .then(setCachorro)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner-custom"></div>
        <p className="text-muted mt-3">Buscando informações do peludo...</p>
      </div>
    );
  }

  if (error || !cachorro) {
    return (
      <div className="container py-5">
        <div className="empty-state">
          <div className="empty-state-icon">?</div>
          <h3>Cachorro não encontrado</h3>
          <p>O animal que você procura pode já ter sido adotado ou o link está incorreto.</p>
          <Link to="/adocao" className="btn btn-primary">Ver todos os cachorros</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 animate-fade-in-up">
      <Link to="/adocao" className="btn btn-outline-secondary mb-4">← Voltar para lista</Link>
      <div className="card card-custom overflow-hidden">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={cachorro.foto}
              alt={cachorro.nome}
              className="img-fluid w-100"
              style={{ height: '100%', objectFit: 'cover', minHeight: '400px' }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center p-5">
            <h2 className="fw-bold mb-3">{cachorro.nome}</h2>
            <div className="d-flex gap-2 mb-4 flex-wrap">
              <span className="status-badge disponivel">Disponível</span>
              <span className="status-badge" style={{ background: '#e9ecef', color: '#495057' }}>{cachorro.porte}</span>
            </div>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item px-0 d-flex justify-content-between">
                <span className="text-muted">Raça</span>
                <strong>{cachorro.raca}</strong>
              </li>
              <li className="list-group-item px-0 d-flex justify-content-between">
                <span className="text-muted">Idade</span>
                <strong>{cachorro.idade}</strong>
              </li>
              <li className="list-group-item px-0 d-flex justify-content-between">
                <span className="text-muted">Porte</span>
                <strong>{cachorro.porte}</strong>
              </li>
              <li className="list-group-item px-0 d-flex justify-content-between">
                <span className="text-muted">Castrado</span>
            <strong>{cachorro.castrado === 'sim' ? 'Sim' : 'Não'}</strong>
              </li>
              <li className="list-group-item px-0 d-flex justify-content-between">
                <span className="text-muted">Vacinas</span>
                <strong>{cachorro.vacinas}</strong>
              </li>
            </ul>
            <div className="bg-light p-3 rounded mb-4">
              <strong className="d-block mb-1">Personalidade</strong>
              <p className="text-muted mb-0">{cachorro.personalidade}</p>
            </div>
            <Link to={`/cadastro?cachorro=${cachorro.id}`} className="btn btn-primary py-3 fs-5">
              Quero Adotar {cachorro.nome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detalhes;