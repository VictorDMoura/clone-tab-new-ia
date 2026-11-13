import "./globals.css";

export const metadata = {
  title: "Em Construção",
  description:
    "Estamos preparando este espaço com bastante cuidado para trazer conteúdos e discussões de qualidade.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
