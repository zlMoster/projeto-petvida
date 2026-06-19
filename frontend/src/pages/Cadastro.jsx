import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchCachorro, submitAdocao } from '../services/api';
import { ToastContext } from '../App';

function Cadastro() {
  const [searchParams] = useSearchParams();
  const showToast = React.useContext(ToastContext);
  const cachorroId = searchParams.get('cachorro');

  const [cachorroNome, setCachorroNome] = useState('');
  const [loadingCachorro, setLoadingCachorro] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const [form, setForm] = useState({ nome: '', email: '', telefone: '', endereco: '', motivo: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cachorroId) {
      fetchCachorro(parseInt(cachorroId))
        .then((d) => setCachorroNome(d.nome))
        .catch(() => setCachorroNome(''))
        .finally(() => setLoadingCachorro(false));
    } else {
      setLoadingCachorro(false);
    }
  }, [cachorroId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório';
    if (!form.email.trim()) errs.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email inválido';
    if (!form.telefone.trim()) errs.telefone = 'Telefone é obrigatório';
    else {
      const d = form.telefone.replace(/\D/g, '');
      if (d.length < 10) errs.telefone = 'Mínimo 10 dígitos';
    }
    if (!form.endereco.trim()) errs.endereco = 'Endereço é obrigatório';
    if (!form.motivo.trim()) errs.motivo = 'Motivo é obrigatório';
    else if (form.motivo.trim().length < 20) errs.motivo = 'Mínimo 20 caracteres';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setEnviando(true);
    try {
      await submitAdocao({ cachorro_id: parseInt(cachorroId), ...form });
      setSucesso(true);
      showToast('Pré-cadastro realizado com sucesso!', 'success');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Erro ao enviar', 'error');
    } finally {
      setEnviando(false);
    }
  };

  if (sucesso) {
    return (
      <div className="container py-5">
        <div className="card card-custom p-5 mx-auto text-center animate-scale-in" style={{ maxWidth: '600px' }}>
          <div style={{ fontSize: '4rem' }}>✓</div>
          <h2 className="fw-bold mb-3">Pré-cadastro Realizado!</h2>
          <p className="text-muted mb-4">
            Recebemos seu interesse em adotar {cachorroNome || 'um cachorrinho'}.
            Nossa equipe vai analisar e entrará em contato em breve.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/adocao" className="btn btn-primary">Ver mais cachorros</Link>
            <Link to="/" className="btn btn-outline-primary">Voltar ao Início</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 animate-fade-in-up">
          <div className="text-center mb-5">
            <h1 className="fw-bold">Pré-Cadastro de Adoção</h1>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              {loadingCachorro ? 'Carregando...' : cachorroNome
                ? `Você está iniciando o processo para adotar ${cachorroNome}`
                : 'Preencha o formulário abaixo para iniciar o processo de adoção'}
            </p>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label">Nome Completo</label>
                  <input type="text" className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                    name="nome" value={form.nome} onChange={handleChange} placeholder="Seu nome completo" />
                  {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">E-mail</label>
                  <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Telefone</label>
                  <input type="tel" className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
                    name="telefone" value={form.telefone} onChange={handleChange} placeholder="(11) 99999-9999" />
                  {errors.telefone && <div className="invalid-feedback">{errors.telefone}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Endereço</label>
                  <input type="text" className={`form-control ${errors.endereco ? 'is-invalid' : ''}`}
                    name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua, número, bairro, cidade" />
                  {errors.endereco && <div className="invalid-feedback">{errors.endereco}</div>}
                </div>
                <div className="col-12">
                  <label className="form-label">Por que você quer adotar?</label>
                  <textarea className={`form-control ${errors.motivo ? 'is-invalid' : ''}`}
                    name="motivo" rows="4" value={form.motivo} onChange={handleChange}
                    placeholder="Conte um pouco sobre você e por que deseja adotar (mínimo 20 caracteres)" />
                  {errors.motivo && <div className="invalid-feedback">{errors.motivo}</div>}
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 py-3 mt-4" disabled={enviando}>
                {enviando ? (
                  <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Enviando...</>
                ) : 'Enviar Pré-Cadastro'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;