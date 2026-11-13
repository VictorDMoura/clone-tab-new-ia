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

export default async function Home() {
  const totalContents = await getTotalPublishedContents();
  const formattedTotal =
    totalContents !== null
      ? new Intl.NumberFormat("pt-BR").format(totalContents)
      : null;

  return (
    <>
      <ConfettiBurst />

      <main className="card">
        <div className="badge">
          <span className="pulse-dot" />
          Trabalhando nos bastidores
        </div>

        <div className="icon-wrapper" aria-hidden="true">
          🚧
        </div>

        <h1>Em Construção</h1>

        <p className="description">
          Estamos neste exato momento reconstuindo o TabNews, um lugar na internet
          para quem trabalha com tecnologia e precisa consumir conteúdos com
          valor concreto
        </p>

        <div className="stats-box">
          <span className="stats-label">
            Total de conteúdos publicados no TabNews
          </span>
          <strong className="stats-value">
            {formattedTotal ?? "Indisponível no momento"}
          </strong>
        </div>

        <a
          className="official-link"
          href="https://www.tabnews.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          Acessar o site oficial do TabNews
          <span aria-hidden="true">↗</span>
        </a>
      </main>
    </>
  );
}
