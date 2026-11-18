import "./globals.css";

export const metadata = {
  title: "TabNews — Em construção",
  description:
    "Estamos reconstruindo o TabNews, um lugar na internet para quem trabalha com tecnologia e precisa consumir conteúdos com valor concreto.",
  other: {
    "theme-color": "#0b0d12",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
