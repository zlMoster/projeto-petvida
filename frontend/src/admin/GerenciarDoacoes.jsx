import React, { useState, useEffect } from 'react';
import { fetchDoacoes, updateDoacoes } from '../services/api';
import { ToastContext } from '../App';

function GerenciarDoacoes() {
  const showToast = React.useContext(ToastContext);
  const [doacoes, setDoacoes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    financeira: { chave_pix: '', qr_code_url: '', descricao: '' },
    fisica: { items: [''], ponto_arrecadacao: '' },
  });

  useEffect(() => {
    fetchDoacoes()
      .then((dados) => {
        setDoacoes(dados);
        setForm({
          financeira: {
            chave_pix: dados.financeira?.chave_pix || '',
            qr_code_url: dados.financeira?.qr_code_url || '',
            descricao: dados.financeira?.descricao || '',
          },
          fisica: {
            items: dados.fisica?.items?.length ? dados.fisica.items : [''],
            ponto_arrecadacao: dados.fisica?.ponto_arrecadacao || '',
          },
        });
      })
      .catch(() => showToast('Erro ao carregar doações', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const handleFinanceiraChange = (campo, valor) => {
    setForm({
      ...form,
      financeira: { ...form.financeira, [campo]: valor },
    });
  };

  const handleItemChange = (index, valor) => {
    const newItems = [...form.fisica.items];
    newItems[index] = valor;
    setForm({
      ...form,
      fisica: { ...form.fisica, items: newItems },
    });
  };

  const addItem = () => {
    setForm({
      ...form,
      fisica: { ...form.fisica, items: [...form.fisica.items, ''] },
    });
  };

  const removeItem = (index) => {
    const newItems = form.fisica.items.filter((_, i) => i !== index);
    setForm({
      ...form,
      fisica: { ...form.fisica, items: newItems },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const items = form.fisica.items.filter((i) => i.trim() !== '');
      await updateDoacoes({
        financeira: form.financeira,
        fisica: { ...form.fisica, items },
      });
      showToast('Lista de doações atualizada!', 'success');
    } catch (err) {
      showToast('Erro ao salvar', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="fw-bold mb-4">Gerenciar Doações</h2>

      <form onSubmit={handleSubmit}>
        {/* Doação Financeira */}
        <div className="card border-0 shadow-sm p-4 mb-4">
          <h4 className="fw-bold mb-3">Doação Financeira</h4>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                rows="2"
                value={form.financeira.descricao}
                onChange={(e) => handleFinanceiraChange('descricao', e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Chave PIX</label>
              <input
                className="form-control"
                value={form.financeira.chave_pix}
                onChange={(e) => handleFinanceiraChange('chave_pix', e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">URL do QR Code</label>
              <input
                className="form-control"
                value={form.financeira.qr_code_url}
                onChange={(e) => handleFinanceiraChange('qr_code_url', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Doação Física */}
        <div className="card border-0 shadow-sm p-4 mb-4">
          <h4 className="fw-bold mb-3">Doação Física</h4>

          <label className="form-label">Itens Necessários</label>
          {form.fisica.items.map((item, index) => (
            <div key={index} className="input-group mb-2">
              <input
                className="form-control"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                placeholder="Ex: Ração para adultos"
              />
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => removeItem(index)}
                disabled={form.fisica.items.length <= 1}
                >
                  X
                </button>
            </div>
          ))}
          <button type="button" className="btn btn-sm btn-outline-primary mb-3" onClick={addItem}>
            + Adicionar Item
          </button>

          <div className="mt-3">
            <label className="form-label">Ponto de Arrecadação</label>
            <textarea
              className="form-control"
              rows="2"
              value={form.fisica.ponto_arrecadacao}
              onChange={(e) =>
                setForm({
                  ...form,
                  fisica: { ...form.fisica, ponto_arrecadacao: e.target.value },
                })
              }
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
}

export default GerenciarDoacoes;