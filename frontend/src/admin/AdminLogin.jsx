import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/pre-cadastros');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  const isLogged = localStorage.getItem('adminAuth') === 'true';
  if (isLogged) {
    navigate('/admin/pre-cadastros');
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0 p-4">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Painel Administrativo</h2>
              <p className="text-muted">Acesso restrito</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Senha de Acesso</label>
                <input
                  type="password"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  value={senha}
                  onChange={(e) => { setSenha(e.target.value); setError(''); }}
                  placeholder="Digite a senha"
                  autoFocus
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2">Acessar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;