import React, { useState, useEffect } from 'react';
import { fetchCachorros, createCachorro, updateCachorro, deleteCachorro } from '../services/api';
import { ToastContext } from '../App';

const INITIAL_FORM = {
  nome: '', idade: '', raca: '', porte: 'medio',
  vacinas: '', castrado: 'nao', personalidade: '',
  foto: '', status: 'disponivel',
};

function GerenciarCachorros() {
  const showToast = React.useContext(ToastContext);
  const [cachorros, setCachorros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);

  const carregar = async () => {
    setLoading(true);
    try {
      const dados = await fetchCachorros({});
      // Include all dogs (not just available)
      setCachorros(dados);
    } catch (err) {
      showToast('Erro ao carregar cachorros', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreate = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (c) => {
    setForm({
      nome: c.nome, idade: c.idade, raca: c.raca, porte: c.porte,
      vacinas: c.vacinas, castrado: c.castrado, personalidade: c.personalidade,
      foto: c.foto, status: c.status,
    });
    setEditingId(c.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCachorro(editingId, form);
        showToast('Cachorro atualizado!', 'success');
      } else {
        await createCachorro(form);
        showToast('Cachorro cadastrado!', 'success');
      }
      setShowForm(false);
      carregar();
    } catch (err) {
      showToast('Erro ao salvar', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este cachorro?')) return;
    try {
      await deleteCachorro(id);
      showToast('Cachorro removido!', 'success');
      carregar();
    } catch (err) {
      showToast('Erro ao remover', 'error');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Gerenciar Cachorros</h2>
        <button className="btn btn-primary" onClick={openCreate}>+ Novo Cachorro</button>
      </div>

      {showForm && (
        <div className="card border-0 shadow-sm p-4 mb-4">
          <h4 className="fw-bold mb-3">{editingId ? 'Editar Cachorro' : 'Novo Cachorro'}</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nome</label>
                <input className="form-control" name="nome" value={form.nome} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Idade</label>
                <input className="form-control" name="idade" value={form.idade} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Porte</label>
                <select className="form-select" name="porte" value={form.porte} onChange={handleChange}>
                  <option value="pequeno">Pequeno</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Raça</label>
                <input className="form-control" name="raca" value={form.raca} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Vacinas</label>
                <input className="form-control" name="vacinas" value={form.vacinas} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Castrado</label>
                <select className="form-select" name="castrado" value={form.castrado} onChange={handleChange}>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Personalidade</label>
                <textarea className="form-control" name="personalidade" rows="2" value={form.personalidade} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label">URL da Foto</label>
                <input className="form-control" name="foto" value={form.foto} onChange={handleChange} />
              </div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-primary">Salvar</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      {!loading && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Raça</th>
                <th>Idade</th>
                <th>Porte</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cachorros.map((c) => (
                <tr key={c.id}>
                  <td>#{c.id}</td>
                  <td className="fw-bold">{c.nome}</td>
                  <td>{c.raca}</td>
                  <td>{c.idade}</td>
                  <td>{c.porte}</td>
                  <td>
                    <span className={`badge ${c.status === 'disponivel' ? 'bg-success' : 'bg-secondary'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => openEdit(c)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GerenciarCachorros;