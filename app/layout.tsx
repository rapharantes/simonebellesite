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
    title: 'Simone Bellé | Terapeuta Especialista em TRI',
    description: 'Liberte-se da ansiedade e do pânico com a Terapia de Reintegração Implícita (TRI). Atendimento focado e acolhedor em Pato Branco - PR e Online.',
    keywords: [
      'Terapia de Reintegração Implícita', 
      'TRI', 
      'Terapeuta Pato Branco', 
      'Tratamento para ansiedade', 
      'Autossabotagem', 
      'Simone Bellé', 
      'Terapia Online', 
      'Neurociência', 
      'Terapia Estratégica'
    ],
    authors: [{ name: 'Simone Bellé' }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: 'Simone Bellé | Terapia Transformadora',
      description: 'Liberte-se da ansiedade e do pânico com a Terapia de Reintegração Implícita (TRI). Atendimento em Pato Branco e Online.',
      url: 'https://simonebelle.com.br',
      siteName: 'Simone Bellé Terapias',
      images: [
        {
          url: '/logo-simone.png',
          width: 800,
          height: 600,
          alt: 'Logo Simone Bellé',
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Simone Bellé | Terapia Transformadora',
      description: 'Liberte-se da ansiedade e do pânico com a Terapia de Reintegração Implícita (TRI).',
      images: ['/logo-simone.png'],
    },
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
