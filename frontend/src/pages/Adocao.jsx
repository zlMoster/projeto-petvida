import React, { useState, useEffect } from 'react';
import DogCard from '../components/DogCard';
import { fetchCachorros, fetchRacas } from '../services/api';

function Adocao() {
  const [cachorros, setCachorros] = useState([]);
  const [racas, setRacas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({ raca: '', porte: '', idade: '' });

  const carregarCachorros = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const dados = await fetchCachorros(params);
      setCachorros(dados);
    } catch (err) {
      setError('Não foi possível carregar a lista de cachorros. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCachorros();
    fetchRacas().then(setRacas).catch(() => {});
  }, []);

  const handleFilter = (campo, valor) => {
    const novos = { ...filtros, [campo]: valor };
    setFiltros(novos);
    const params = {};
    if (novos.raca) params.raca = novos.raca;
    if (novos.porte) params.porte = novos.porte;
    if (novos.idade) params.idade = novos.idade;
    carregarCachorros(params);
  };

  const handleRandom = () => {
    const params = {};
    if (filtros.raca) params.raca = filtros.raca;
    if (filtros.porte) params.porte = filtros.porte;
    if (filtros.idade) params.idade = filtros.idade;
    params.random = true;
    carregarCachorros(params);
  };

  const handleClear = () => {
    setFiltros({ raca: '', porte: '', idade: '' });
    carregarCachorros({});
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5 animate-fade-in-up">
        <h1 className="fw-bold">Conheça nossos focinhos</h1>
        <div className="section-divider"></div>
        <p className="section-subtitle">Eles estão esperando por um lar cheio de amor e carinho.</p>
      </div>

      {/* Filtros */}
      <div className="filtros-card">
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label fw-semibold">Raça</label>
            <select className="form-select" value={filtros.raca} onChange={(e) => handleFilter('raca', e.target.value)}>
              <option value="">Todas as raças</option>
              {racas.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Porte</label>
            <select className="form-select" value={filtros.porte} onChange={(e) => handleFilter('porte', e.target.value)}>
              <option value="">Todos os portes</option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Idade</label>
            <select className="form-select" value={filtros.idade} onChange={(e) => handleFilter('idade', e.target.value)}>
              <option value="">Todas as idades</option>
              <option value="filhote">Filhote (~1 ano)</option>
              <option value="adulto">Adulto (1-7 anos)</option>
              <option value="idoso">Idoso (7+ anos)</option>
            </select>
          </div>
          <div className="col-md-3 d-flex gap-2">
            <button className="btn btn-outline-primary flex-fill" onClick={handleRandom}>
              Surpreenda-me
            </button>
            <button className="btn btn-outline-secondary flex-fill" onClick={handleClear}>
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="spinner-wrapper">
          <div className="spinner-custom"></div>
          <p className="text-muted mt-3">Buscando nossos peludos...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-warning text-center" role="alert" style={{ borderRadius: '12px' }}>
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && cachorros.length === 0 && (
        <div className="empty-state">
        <div className="empty-state-icon">?</div>
          <h3>Nenhum cachorro encontrado</h3>
          <p>Tente limpar os filtros ou voltar mais tarde.</p>
          <button className="btn btn-primary" onClick={handleClear}>Limpar Filtros</button>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && cachorros.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {cachorros.map((c, i) => (
            <div key={c.id} className={`animate-fade-in-up animate-delay-${Math.min(i % 3 + 1, 5)}`} style={{ opacity: 0 }}>
              <DogCard id={c.id} nome={c.nome} idade={c.idade} raca={c.raca} foto={c.foto} porte={c.porte} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Adocao;