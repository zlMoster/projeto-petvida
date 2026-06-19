import React from 'react';

function Toast({ show, message, type, onClose }) {
  if (!show) return null;

  const config = {
    success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb', title: 'Sucesso!' },
    error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb', title: 'Erro!' },
    warning: { bg: '#fff3cd', color: '#856404', border: '#ffeeba', title: 'Atenção!' },
  };

  const c = config[type] || config.success;

  return (
    <div className="toast-container animate-slide-down">
      <div
        style={{
          background: c.bg,
          color: c.color,
          border: `1px solid ${c.border}`,
          borderRadius: '12px',
          padding: '16px 20px',
          minWidth: '320px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ flex: 1 }}>
          <strong style={{ display: 'block', marginBottom: '2px' }}>{c.title}</strong>
          <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>{message}</span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: c.color,
            fontSize: '1.2rem',
            cursor: 'pointer',
            opacity: 0.5,
            padding: '0 4px',
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Toast;