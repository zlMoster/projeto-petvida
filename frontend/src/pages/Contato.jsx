import React, { useState } from 'react';
import { submitContato } from '../services/api';
import { ToastContext } from '../App';

function Contato() {
  const showToast = React.useContext(ToastContext);
  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório';
    if (!form.email.trim()) errs.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email inválido';
    if (!form.assunto) errs.assunto = 'Selecione um assunto';
    if (!form.mensagem.trim()) errs.mensagem = 'Mensagem é obrigatória';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setEnviando(true);
    try {
      await submitContato(form);
      showToast('Mensagem enviada com sucesso!', 'success');
      setForm({ nome: '', email: '', assunto: '', mensagem: '' });
    } catch (err) {
      showToast(err.response?.data?.detail || 'Erro ao enviar', 'error');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5 animate-fade-in-up">
        <h1 className="fw-bold">Fale Conosco</h1>
        <div className="section-divider"></div>
        <p className="section-subtitle">Tem dúvidas ou quer ser voluntário? Envie uma mensagem!</p>
      </div>

      <div className="row g-5">
        {/* Informações */}
        <div className="col-md-5 animate-fade-in-up animate-delay-1">
          <div className="card card-custom p-4 h-100">
            <h3 className="fw-bold mb-4">Nossos Contatos</h3>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-3">
                <span style={{ fontSize: '1.3rem' }}>@</span>
                <div>
                  <strong>Endereço</strong>
                  <p className="text-muted mb-0 small">Rua das Flores, 123 - Centro<br />São Paulo - SP, 01001-000</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <span style={{ fontSize: '1.3rem' }}>@</span>
                <div>
                  <strong>E-mail</strong>
                  <p className="text-muted mb-0 small">contato@ongsjpa.org.br</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <span style={{ fontSize: '1.3rem' }}>@</span>
                <div>
                  <strong>Telefone/WhatsApp</strong>
                  <p className="text-muted mb-0 small">(11) 99999-8888</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <span style={{ fontSize: '1.3rem' }}>@</span>
                <div>
                  <strong>Horário de Atendimento</strong>
                  <p className="text-muted mb-0 small">Seg a Sex, 9h às 18h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="col-md-7 animate-fade-in-up animate-delay-2">
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label">Nome Completo</label>
                  <input type="text" className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                    name="nome" value={form.nome} onChange={handleChange} placeholder="Seu nome" />
                  {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">E-mail</label>
                  <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-12">
                  <label className="form-label">Assunto</label>
                  <select className={`form-select ${errors.assunto ? 'is-invalid' : ''}`}
                    name="assunto" value={form.assunto} onChange={handleChange}>
                    <option value="">Selecione um assunto...</option>
                    <option value="adocao">Dúvida sobre adoção</option>
                    <option value="voluntariado">Quero ser voluntário</option>
                    <option value="doacao">Informações sobre doações</option>
                    <option value="outro">Outros</option>
                  </select>
                  {errors.assunto && <div className="invalid-feedback">{errors.assunto}</div>}
                </div>
                <div className="col-12">
                  <label className="form-label">Mensagem</label>
                  <textarea className={`form-control ${errors.mensagem ? 'is-invalid' : ''}`}
                    name="mensagem" rows="4" value={form.mensagem} onChange={handleChange}
                    placeholder="Escreva sua mensagem..." />
                  {errors.mensagem && <div className="invalid-feedback">{errors.mensagem}</div>}
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 py-3 mt-4" disabled={enviando}>
                {enviando ? (
                  <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Enviando...</>
                ) : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contato;