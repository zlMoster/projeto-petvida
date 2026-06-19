import React from 'react';
import { Link } from 'react-router-dom';

function Sobre() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5 animate-fade-in-up">
        <h1 className="fw-bold">Sobre a ONG SJPA</h1>
        <div className="section-divider"></div>
        <p className="section-subtitle">Conheça nossa história, missão e valores</p>
      </div>

      <div className="row g-5">
        <div className="col-lg-8 mx-auto">
          {/* Historia */}
              <div className="card card-custom p-4 mb-4 animate-fade-in-up animate-delay-1">
            <div className="d-flex align-items-center gap-3 mb-3">
              <h3 className="fw-bold mb-0">Nossa História</h3>
            </div>
            <p className="text-muted">
              A ONG SJPA nasceu em 2018 da paixão de um grupo de voluntários pelo bem-estar animal.
              Começamos resgatando cães em situação de rua e oferecendo tratamento veterinário básico.
            </p>
            <p className="text-muted">
              Hoje, mantemos um abrigo com capacidade para 50 animais e já realizamos mais de 300 adoções
              responsáveis. Trabalhamos com castração, vacinação e campanhas de conscientização.
            </p>
            <p className="text-muted mb-0">
              Nosso objetivo é garantir que cada animal resgatado encontre um lar amoroso e permanente.
            </p>
          </div>

          {/* Missão */}
              <div className="card card-custom p-4 mb-4 animate-fade-in-up animate-delay-2">
            <div className="d-flex align-items-center gap-3 mb-3">
              <h3 className="fw-bold mb-0">Nossa Missão</h3>
            </div>
            <p className="text-muted mb-0">
              Resgatar, reabilitar e encaminhar para adoção responsável cães em situação de
              abandono ou maus-tratos, promovendo o bem-estar animal e a conscientização da
              sociedade sobre a posse responsável.
            </p>
          </div>

          {/* Visão */}
              <div className="card card-custom p-4 mb-4 animate-fade-in-up animate-delay-3">
            <div className="d-flex align-items-center gap-3 mb-3">
              <h3 className="fw-bold mb-0">Nossa Visão</h3>
            </div>
            <p className="text-muted mb-0">
              Ser referência no acolhimento e cuidado de animais abandonados, inspirando a
              comunidade a valorizar e proteger a vida animal, reduzindo o número de cães em
              situação de rua.
            </p>
          </div>

          {/* Valores */}
              <div className="card card-custom p-4 mb-4 animate-fade-in-up animate-delay-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <h3 className="fw-bold mb-0">Nossos Valores</h3>
            </div>
            <div className="row g-3">
              {[
                { icon: 'R', title: 'Respeito', text: 'Tratamos cada animal com dignidade e carinho.' },
                { icon: 'R', title: 'Responsabilidade', text: 'Promovemos adoções conscientes e acompanhamento.' },
                { icon: 'T', title: 'Transparência', text: 'Prestamos contas de cada doação recebida.' },
                { icon: 'C', title: 'Compromisso', text: 'Trabalhamos incansavelmente pelo bem-estar animal.' },
              ].map((v, i) => (
                <div key={i} className="col-md-6">
                  <div className="d-flex align-items-start gap-2 p-3 rounded" style={{ background: 'var(--bg-cinza)' }}>
                    <span style={{ fontSize: '1.3rem' }}>{v.icon}</span>
                    <div>
                      <strong>{v.title}</strong>
                      <p className="text-muted small mb-0">{v.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Como ajudar */}
              <div className="card card-custom p-4 mb-4 animate-fade-in-up animate-delay-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <h3 className="fw-bold mb-0">Como Ajudar</h3>
            </div>
            <div className="row g-3">
              {[
                { icon: 'A', title: 'Adotando', text: 'Dê um lar para um dos nossos resgatados.' },
                { icon: 'D', title: 'Doando', text: 'Contribua financeiramente ou com suprimentos.' },
                { icon: 'V', title: 'Voluntariando', text: 'Ofereça seu tempo e talento para ajudar.' },
                { icon: 'C', title: 'Compartilhando', text: 'Divulgue nosso trabalho nas redes sociais.' },
              ].map((a, i) => (
                <div key={i} className="col-md-6">
                  <div className="d-flex align-items-center gap-2 p-3 rounded" style={{ background: 'var(--verde-fundo)' }}>
                    <span style={{ fontSize: '1.5rem' }}>{a.icon}</span>
                    <div>
                      <strong style={{ color: 'var(--verde-principal)' }}>{a.title}</strong>
                      <p className="text-muted small mb-0">{a.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-4 animate-fade-in-up">
            <Link to="/contato" className="btn btn-primary btn-lg-custom">Entre em Contato</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;