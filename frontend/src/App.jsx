import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Adocao from './pages/Adocao';
import Detalhes from './pages/Detalhes';
import Cadastro from './pages/Cadastro';
import Doacoes from './pages/Doacoes';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import PreCadastros from './admin/PreCadastros';
import PreCadastroDetalhes from './admin/PreCadastroDetalhes';
import GerenciarCachorros from './admin/GerenciarCachorros';
import GerenciarDoacoes from './admin/GerenciarDoacoes';

export const ToastContext = React.createContext();

function App() {
  const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  return (
    <ToastContext.Provider value={showToast}>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <Toast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/adocao" element={<Adocao />} />
              <Route path="/detalhes" element={<Detalhes />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/doacoes" element={<Doacoes />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<PreCadastros />} />
                <Route path="pre-cadastros" element={<PreCadastros />} />
                <Route path="pre-cadastros/:id" element={<PreCadastroDetalhes />} />
                <Route path="cachorros" element={<GerenciarCachorros />} />
                <Route path="doacoes" element={<GerenciarDoacoes />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ToastContext.Provider>
  );
}

export default App;