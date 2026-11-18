import ConfettiBurst from "./ConfettiBurst";

export const dynamic = "force-dynamic";

const TABNEWS_CONTENTS_API_URL =
  "https://www.tabnews.com.br/api/v1/contents?page=1&per_page=1&strategy=new";

async function getTotalPublishedContents() {
  try {
    const response = await fetch(TABNEWS_CONTENTS_API_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return null;
    }

    const totalRowsHeader = response.headers.get("x-pagination-total-rows");
    if (totalRowsHeader) {
      const parsed = Number.parseInt(totalRowsHeader, 10);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    const linkHeader = response.headers.get("link");
    const lastPageMatch = linkHeader?.match(/[?&]page=(\d+)[^>]*>;\s*rel="last"/);
    if (lastPageMatch) {
      const parsed = Number.parseInt(lastPageMatch[1], 10);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function TabNewsMark() {
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
      <defs>
        <linearGradient id="tab-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#ffb454" />
          <stop offset="1" stopColor="#f76b15" />
        </linearGradient>
      </defs>
      <path
        d="M4 8a4 4 0 0 1 4-4h7l3 3h6a4 4 0 0 1 4 4v13a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z"
        fill="url(#tab-gradient)"
      />
      <path
        d="M10 17h12M10 22h8"
        stroke="#2a1601"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default async function Home() {
  const totalContents = await getTotalPublishedContents();
  const formattedTotal =
    totalContents !== null
      ? new Intl.NumberFormat("pt-BR").format(totalContents)
      : null;

  return (
    <>
      <ConfettiBurst />

      <div className="page-shell">
        <header className="site-header">
          <a
            className="brand"
            href="https://www.tabnews.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="brand-mark">
              <TabNewsMark />
            </span>
            <span className="brand-name">
              tab<strong>news</strong>
            </span>
          </a>

          <nav className="header-nav" aria-label="Seções em breve">
            <span>recentes</span>
            <span>relevantes</span>
            <span>novos</span>
          </nav>

          <span className="header-badge">
            <span className="badge-dot" />
            em construção
          </span>
        </header>

        <main className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="pulse-dot" />
              estamos reconstruindo
            </span>

            <h1>
              Em <span className="accent">construção</span>
              <span className="period">.</span>
            </h1>

            <p className="lede">
              Estamos neste exato momento reconstruindo o{" "}
              <strong>TabNews</strong>, um lugar na internet para quem trabalha
              com tecnologia e precisa consumir conteúdos com valor concreto.
            </p>

            <div className="stats-panel">
              <div className="stats-head">
                <span className="stats-label">
                  Total de conteúdos publicados no TabNews
                </span>
                <span className="live-pill">
                  <span className="live-dot" />
                  ao vivo
                </span>
              </div>
              <strong className="stats-value">
                {formattedTotal ?? "Indisponível no momento"}
              </strong>
              <p className="stats-source">dados diretos da API oficial</p>
            </div>

            <a
              className="primary-cta"
              href="https://www.tabnews.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar o site oficial
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <section
            className="preview"
            aria-label="Prévia da interface em construção"
          >
            <div className="preview-top">
              <span className="preview-title">// prévia da interface</span>
              <span className="soon-tag">em breve</span>
            </div>

            <div className="feed" aria-hidden="true">
              {[0, 1, 2].map((index) => (
                <div className="feed-row" key={index}>
                  <span className={`avatar avatar-${index}`} />
                  <div className="feed-lines">
                    <span
                      className="skeleton sk-title"
                      style={{ width: `${94 - index * 13}%` }}
                    />
                    <span
                      className="skeleton sk-meta"
                      style={{ width: `${48 + index * 9}%` }}
                    />
                  </div>
                  <span className="feed-score">▲</span>
                </div>
              ))}
            </div>

            <div className="preview-foot">
              <span className="typing-dots" aria-hidden="true" />
              montando o feed...
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <span>
            projeto da <strong>curso.dev</strong>
          </span>
          <span className="footer-sep">•</span>
          <span>Next.js App Router</span>
        </footer>
      </div>
    </>
  );
}
