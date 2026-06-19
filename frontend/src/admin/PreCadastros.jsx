import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPreCadastros } from '../services/api';

function PreCadastros() {
  const [preCadastros, setPreCadastros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState('');

  const carregar = async (status = '') => {
    setLoading(true);
    try {
      const dados = await fetchPreCadastros(status || null);
      setPreCadastros(dados);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleFilterChange = (status) => {
    setFiltroStatus(status);
    carregar(status);
  };

  const statusBadge = (status) => {
    const map = {
      pendente: 'status-pendente',
      aprovado: 'status-aprovado',
      rejeitado: 'status-rejeitado',
    };
    return map[status] || 'bg-secondary text-white';
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Pré-Cadastros</h2>
        <div>
          <select
            className="form-select form-select-sm d-inline-block w-auto"
            value={filtroStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="aprovado">Aprovado</option>
            <option value="rejeitado">Rejeitado</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {!loading && preCadastros.length === 0 && (
        <div className="text-center py-5 text-muted">
          <h5>Nenhum pré-cadastro encontrado</h5>
        </div>
      )}

      {!loading && preCadastros.length > 0 && (
        <div className="row g-3">
          {preCadastros.map((p) => (
            <div key={p.id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold mb-0">{p.nome}</h5>
                    <span className={`badge ${statusBadge(p.status)}`}>{p.status}</span>
                  </div>
                  <p className="card-text text-muted small mb-2">
                    <strong>Cachorro:</strong> {p.nome_cachorro}<br />
                    <strong>Email:</strong> {p.email}<br />
                    <strong>Data:</strong> {new Date(p.data).toLocaleDateString('pt-BR')}
                  </p>
                  <Link to={`/admin/pre-cadastros/${p.id}`} className="btn btn-sm btn-outline-primary">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PreCadastros;