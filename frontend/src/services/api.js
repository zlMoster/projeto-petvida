import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
});

export default api;

// =============================================
// CACHORROS
// =============================================

export async function fetchCachorros(filtros = {}) {
  const params = {};
  if (filtros.raca) params.raca = filtros.raca;
  if (filtros.porte) params.porte = filtros.porte;
  if (filtros.idade) params.idade = filtros.idade;
  if (filtros.random) params.random = true;

  const response = await api.get('/api/cachorros', { params });
  return response.data;
}

export async function fetchCachorro(id) {
  const response = await api.get(`/api/cachorros/${id}`);
  return response.data;
}

export async function fetchRacas() {
  const response = await api.get('/api/cachorros/racas');
  return response.data.racas;
}

// =============================================
// ADOÇÃO
// =============================================

export async function submitAdocao(dados) {
  const response = await api.post('/api/adocao', dados);
  return response.data;
}

// =============================================
// CONTATO
// =============================================

export async function submitContato(dados) {
  const response = await api.post('/api/contato', dados);
  return response.data;
}

// =============================================
// DOAÇÕES
// =============================================

export async function fetchDoacoes() {
  const response = await api.get('/api/doacoes');
  return response.data;
}

// =============================================
// ADMIN
// =============================================

const ADMIN_PASSWORD = 'admin123';

export async function fetchPreCadastros(status = null) {
  const params = { auth: ADMIN_PASSWORD };
  if (status) params.status = status;
  const response = await api.get('/api/admin/pre-cadastros', { params });
  return response.data;
}

export async function fetchPreCadastro(id) {
  const response = await api.get(`/api/admin/pre-cadastros/${id}`, {
    params: { auth: ADMIN_PASSWORD },
  });
  return response.data;
}

export async function updatePreCadastroStatus(id, status) {
  const response = await api.put(
    `/api/admin/pre-cadastros/${id}/status`,
    { status },
    { params: { auth: ADMIN_PASSWORD } }
  );
  return response.data;
}

export async function createCachorro(dados) {
  const response = await api.post('/api/admin/cachorros', dados, {
    params: { auth: ADMIN_PASSWORD },
  });
  return response.data;
}

export async function updateCachorro(id, dados) {
  const response = await api.put(`/api/admin/cachorros/${id}`, dados, {
    params: { auth: ADMIN_PASSWORD },
  });
  return response.data;
}

export async function deleteCachorro(id) {
  const response = await api.delete(`/api/admin/cachorros/${id}`, {
    params: { auth: ADMIN_PASSWORD },
  });
  return response.data;
}

export async function updateDoacoes(dados) {
  const response = await api.put('/api/admin/doacoes', dados, {
    params: { auth: ADMIN_PASSWORD },
  });
  return response.data;
}