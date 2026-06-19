import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content container">
          <div className="animate-fade-in-up">
            <h1>Dê uma nova chance ao amor</h1>
            <p className="lead">
              Resgatamos, cuidamos e encontramos lares para cães abandonados.
              H&aacute; 8 anos transformando vidas — de pessoas e animais.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/adocao" className="btn btn-light btn-lg-custom px-5"
                style={{ color: '#1b5e20', fontWeight: '700', background: 'white' }}>
                Adotar um amigo
              </Link>
              <Link to="/doacoes" className="btn btn-lg-custom px-5"
                style={{ color: 'white', border: '2px solid rgba(255,255,255,0.5)', background: 'transparent' }}>
                Fazer uma doa&ccedil;&atilde;o
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">300+</span>
                <span className="hero-stat-label">Ado&ccedil;&otilde;es realizadas</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">50</span>
                <span className="hero-stat-label">C&atilde;es no abrigo</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">8</span>
                <span className="hero-stat-label">Anos de hist&oacute;ria</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Nossa História */}
      <section className="section-padding section-bg-white">
        <div className="container">
          <div className="text-center mb-5 animate-fade-in-up">
            <h2 className="fw-bold">Nossa Hist&oacute;ria</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">Conhe&ccedil;a a jornada da ONG SJPA</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4 animate-fade-in-up animate-delay-1">
              <div className="card card-custom h-100 p-4 text-center border-0">
                <div className="icon-circle">M</div>
                <h4 className="fw-bold mb-2">Miss&atilde;o</h4>
                <p className="text-muted mb-0">
                  Resgatar, reabilitar e encaminhar para ado&ccedil;&atilde;o respons&aacute;vel c&atilde;es em situa&ccedil;&atilde;o de abandono.
                </p>
              </div>
            </div>
            <div className="col-md-4 animate-fade-in-up animate-delay-2">
              <div className="card card-custom h-100 p-4 text-center border-0">
                <div className="icon-circle">V</div>
                <h4 className="fw-bold mb-2">Vis&atilde;o</h4>
                <p className="text-muted mb-0">
                  Ser refer&ecirc;ncia no acolhimento animal, inspirando a comunidade a proteger a vida animal.
                </p>
              </div>
            </div>
            <div className="col-md-4 animate-fade-in-up animate-delay-3">
              <div className="card card-custom h-100 p-4 text-center border-0">
                <div className="icon-circle">V</div>
                <h4 className="fw-bold mb-2">Valores</h4>
                <p className="text-muted mb-0">
                  Respeito, responsabilidade, transpar&ecirc;ncia e compromisso com o bem-estar animal.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-5 animate-fade-in-up">
            <p className="text-muted mb-4" style={{ maxWidth: '700px', margin: '0 auto 20px', lineHeight: 1.8 }}>
              A ONG SJPA nasceu em 2018 da paix&atilde;o de um grupo de volunt&aacute;rios. Come&ccedil;amos resgatando c&atilde;es 
              em situa&ccedil;&atilde;o de rua. Hoje, mantemos um abrigo com capacidade para 50 animais e j&aacute; realizamos 
              mais de 300 ado&ccedil;&otilde;es respons&aacute;veis. Contamos com doa&ccedil;&otilde;es e volunt&aacute;rios para manter nosso trabalho.
            </p>
            <Link to="/sobre" className="btn btn-outline-primary">Saiba mais sobre n&oacute;s</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-verde text-white text-center">
        <div className="container">
          <div className="animate-fade-in-up">
            <h2 className="text-white fw-bold mb-3">Quer fazer parte dessa hist&oacute;ria?</h2>
            <p className="mb-4" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem' }}>
              Existem muitas formas de ajudar: adotando, doando, voluntariando ou compartilhando nosso trabalho.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/adocao" className="btn btn-light px-4 py-2" style={{ fontWeight: 700, color: '#1b5e20' }}>
                Adotar
              </Link>
              <Link to="/doacoes" className="btn btn-outline-light px-4 py-2">
                Doar
              </Link>
              <Link to="/contato" className="btn btn-outline-light px-4 py-2">
                Voluntariar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;