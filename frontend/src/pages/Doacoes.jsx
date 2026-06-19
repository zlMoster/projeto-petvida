import React, { useState, useEffect } from 'react';
import { fetchDoacoes } from '../services/api';

function Doacoes() {
  const [doacoes, setDoacoes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoacoes()
      .then(setDoacoes)
      .catch(() => setError('Não foi possível carregar as informações de doações.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner-custom"></div>
        <p className="text-muted mt-3">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center" style={{ borderRadius: '12px' }}>{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5 animate-fade-in-up">
        <h1 className="fw-bold">Como você pode ajudar?</h1>
        <div className="section-divider"></div>
        <p className="section-subtitle">Nossa ONG sobrevive exclusivamente de doações. Cada contribuição salva vidas.</p>
      </div>

      <div className="row g-4">
        {/* Doação Financeira */}
        <div className="col-lg-6 animate-fade-in-up animate-delay-1">
          <div className="card card-custom h-100 p-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="icon-circle" style={{ width: '50px', height: '50px', fontSize: '1.3rem', margin: 0 }}>F</div>
              <h3 className="fw-bold mb-0">Doação Financeira</h3>
            </div>
            <p className="text-muted mb-4">{doacoes?.financeira?.descricao}</p>
            <div className="pix-container mt-auto">
              {doacoes?.financeira?.qr_code_url && (
                <img src={doacoes.financeira.qr_code_url} alt="QR Code PIX"
                  className="mb-3 img-fluid" style={{ maxWidth: '180px' }} />
              )}
              <p className="mb-2 fw-semibold">Chave PIX:</p>
              <p className="chave-pix mb-0">{doacoes?.financeira?.chave_pix}</p>
            </div>
          </div>
        </div>

        {/* Doação Física */}
        <div className="col-lg-6 animate-fade-in-up animate-delay-2">
          <div className="card card-custom h-100 p-4">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="icon-circle" style={{ width: '50px', height: '50px', fontSize: '1.3rem', margin: 0 }}>D</div>
              <h3 className="fw-bold mb-0">Doações Físicas</h3>
            </div>
            <p className="text-muted mb-4">Sempre precisamos de suprimentos. O que mais precisamos no momento:</p>
            <ul className="list-group list-group-flush mb-4">
              {doacoes?.fisica?.items?.map((item, idx) => (
                <li key={idx} className="list-group-item bg-transparent px-0 border-bottom d-flex align-items-center gap-2">
                  <span style={{ color: 'var(--verde-principal)' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-3 border-top">
              <div className="d-flex align-items-start gap-2">
                <span style={{ fontSize: '1.2rem' }}>@</span>
                <div>
                  <h6 className="fw-bold mb-1">Ponto de Arrecadação</h6>
                  <p className="text-muted mb-0 small">{doacoes?.fisica?.ponto_arrecadacao}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doacoes;