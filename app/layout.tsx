import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Simone Bélle | Terapia Transformadora',
  description: 'Liberte-se da ansiedade e do pânico com a Terapia de Reintegração Implícita (TRI). Atendimento em Pato Branco e Online.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-slate-900 bg-[#FDFBF7]">{children}</body>
    </html>
  );
}
