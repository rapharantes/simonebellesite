import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-secondary/30">
      <h1 className="text-4xl font-serif text-primary mb-4">404 - Página não encontrada</h1>
      <p className="text-slate-600 mb-8">Desculpe, a página que você está procurando não existe.</p>
      <Link href="/" className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all">
        Voltar para a Home
      </Link>
    </div>
  );
}
