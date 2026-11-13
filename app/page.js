export default function Home() {
  return (
    <main className="card">
      <div className="badge">
        <span className="pulse-dot" />
        Trabalhando nos bastidores
      </div>

      <div className="icon-wrapper" aria-hidden="true">
        🚧
      </div>

      <h1>Em construção</h1>

      <p>
        Estamos preparando este espaço com bastante cuidado para trazer conteúdos
        e discussões de qualidade. Volte em breve para conferir as novidades!
      </p>

      <div
        className="progress-container"
        role="progressbar"
        aria-label="Progresso da construção"
      >
        <div className="progress-bar" />
      </div>
      <p className="footer-note">
        Tijolo por tijolo, linha de código por linha de código.
      </p>
    </main>
  );
}
