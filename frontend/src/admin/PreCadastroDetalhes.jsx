import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPreCadastro, updatePreCadastroStatus } from '../services/api';
import { ToastContext } from '../App';

function PreCadastroDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = React.useContext(ToastContext);
  const [preCadastro, setPreCadastro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreCadastro(parseInt(id))
      .then(setPreCadastro)
      .catch(() => showToast('Erro ao carregar detalhes', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatus = async (novoStatus) => {
    try {
      await updatePreCadastroStatus(parseInt(id), novoStatus);
      setPreCadastro({ ...preCadastro, status: novoStatus });
      showToast(`Status atualizado para "${novoStatus}"`, 'success');
    } catch (err) {
      showToast('Erro ao atualizar status', 'error');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!preCadastro) {
    return (
      <div className="text-center py-5">
        <h4>Pré-cadastro não encontrado</h4>
      </div>
    );
  }

  const statusClass = {
    pendente: 'status-pendente',
    aprovado: 'status-aprovado',
    rejeitado: 'status-rejeitado',
  }[preCadastro.status] || '';

  return (
    <div>
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate('/admin/pre-cadastros')}>
        ← Voltar
      </button>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
          <h4 className="fw-bold mb-0">Detalhes do Pré-Cadastro #{preCadastro.id}</h4>
          <span className={`badge ${statusClass} fs-6`}>{preCadastro.status}</span>
        </div>
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Informações Pessoais</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="fw-semibold text-muted" style={{ width: '120px' }}>Nome:</td>
                    <td>{preCadastro.nome}</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-muted">Email:</td>
                    <td>{preCadastro.email}</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-muted">Telefone:</td>
                    <td>{preCadastro.telefone}</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-muted">Endereço:</td>
                    <td>{preCadastro.endereco}</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-muted">Data:</td>
                    <td>{new Date(preCadastro.data).toLocaleString('pt-BR')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Informações da Adoção</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="fw-semibold text-muted" style={{ width: '120px' }}>Cachorro:</td>
                    <td>{preCadastro.nome_cachorro}</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-muted">ID do Cachorro:</td>
                    <td>#{preCadastro.cachorro_id}</td>
                  </tr>
                </tbody>
              </table>

              <h5 className="fw-bold mb-3 mt-4">Motivo</h5>
              <p className="text-muted bg-light p-3 rounded">{preCadastro.motivo}</p>
            </div>
          </div>

          <div className="border-top pt-4 mt-3">
            <h5 className="fw-bold mb-3">Ações</h5>
            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() => handleStatus('aprovado')}
                disabled={preCadastro.status === 'aprovado'}
              >
                ✓ Aprovar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleStatus('rejeitado')}
                disabled={preCadastro.status === 'rejeitado'}
              >
                ✗ Rejeitar
              </button>
              <button
                className="btn btn-warning"
                onClick={() => handleStatus('pendente')}
                disabled={preCadastro.status === 'pendente'}
              >
                ↩ Reverter para Pendente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreCadastroDetalhes;