import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function AdminLayout() {
  const navigate = useNavigate();
  const isLogged = localStorage.getItem('adminAuth') === 'true';

  if (!isLogged) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 admin-sidebar p-0" style={{ minHeight: '100vh' }}>
          <div className="p-3 text-white">
            <h5 className="text-white fw-bold mb-4">Admin SJPA</h5>
            <nav className="nav flex-column">
              <NavLink className="nav-link" to="/admin/pre-cadastros">Pré-Cadastros</NavLink>
              <NavLink className="nav-link" to="/admin/cachorros">Cachorros</NavLink>
              <NavLink className="nav-link" to="/admin/doacoes">Doações</NavLink>
              <hr className="border-light my-3" />
              <button className="nav-link btn text-start text-white-50" onClick={handleLogout}>
                Sair
              </button>
            </nav>
          </div>
        </div>
        <div className="col-md-10 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;