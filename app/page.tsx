'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Star,
  Plus,
  Minus,
  MapPin,
  Instagram,
  Facebook,
  Mail,
  Phone,
  X,
  Play,
  Brain,
  ShieldCheck,
  Users,
  GraduationCap,
  Heart,
  Youtube
} from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';

// --- CORES EXTRAÍDAS ---
// Navy Blue: #003161
// Vibrant Green: #1db91d
// Light Grey/Blue: #f4f7f9
// Triangle Navy: #1a2b4c

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-primary' : 'text-slate-700'}`}>{question}</span>
        <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${isOpen ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GreenButton = ({ children, className = "", href = "#" }: { children: React.ReactNode, className?: string, href?: string }) => (
  <a
    href={href}
    className={`inline-flex items-center justify-center px-10 py-4 bg-[#1db91d] text-white font-bold rounded-full hover:bg-[#18a018] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border-b-4 border-[#158c15] ${className}`}
  >
    {children}
  </a>
);

export default function LandingPage() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [instagramLoaded, setInstagramLoaded] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        const hasSeenPopup = localStorage.getItem('exit_popup_seen');
        if (!hasSeenPopup) {
          setShowExitPopup(true);
          localStorage.setItem('exit_popup_seen', 'true');
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseOut);

    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, []);

  // Effect to load and process Instagram embeds
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ((window as any).instgrm) {
      setTimeout(() => {
        (window as any).instgrm.Embeds.process();
      }, 500);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    
    script.onload = () => {
      setInstagramLoaded(true);
      setTimeout(() => {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      }, 500);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-white selection:bg-primary/10">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gold/10">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-56">
              <Image
                src="/logo-simone.png"
                alt="Simone Belle Logo"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-primary uppercase tracking-widest">
            <a href="#" className="hover:text-gold transition-colors">Início</a>
            <a href="#sobre" className="hover:text-gold transition-colors">Sobre</a>
            <a href="#tri" className="hover:text-gold transition-colors">TRI</a>
            <a href="#contato" className="hover:text-gold transition-colors">Contato</a>
            <div className="flex items-center gap-4 border-l border-gold/30 pl-10">
              <a href="https://www.instagram.com/simonebelle_/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/simoneb.terapeuta/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/watch?v=IPJub2xLifE" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <a
            href="https://wa.me/5546999072534?text=Olá, Simone! Tudo bem? Encontrei seu trabalho com a Terapia de Reintegração Implícita (TRI) e gostaria de agendar uma consulta de avaliação. Você pode me informar os horários disponíveis e os valores? Obrigado(a)!"
            className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-md"
          >
            <MessageCircle className="h-4 w-4" />
            Agendar agora
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-beige/30">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-aqua/10 -skew-x-12 transform origin-top-right -z-10" />
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="text-primary font-bold text-sm uppercase tracking-widest">
                Seu bem-estar não precisa esperar
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-primary leading-[1.1] mb-8">
              Liberte-se da ansiedade, do pânico e da sensação de vazio.
            </h1>
            <p className="text-xl font-medium text-slate-700 mb-8 border-l-4 border-gold pl-6">
              Você não precisa permanecer preso(a) aos mesmos padrões emocionais.
            </p>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed max-w-lg">
              Com um método terapêutico focado na compreensão da causa do sofrimento, o processo promove clareza, fortalecimento emocional e avanços reais, respeitando seu ritmo e sua história.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <GreenButton href="#contato">
                Agendar consulta agora
              </GreenButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="/SimoneLivros.JPG"
                alt="Simone Belle"
                width={800}
                height={1000}
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-aqua/30 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-gold/10 rounded-full blur-2xl -z-10" />
            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl z-20 hidden lg:block border border-gold/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                </div>
                <span className="font-bold text-primary">5.0</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Atendimento Humanizado</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sobre meu trabalho */}
      <section id="sobre" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-beige/20 to-transparent" />
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-gold" />
                <h2 className="text-primary font-bold text-sm uppercase tracking-widest">Sobre meu trabalho</h2>
              </div>
              <p className="text-slate-700 text-2xl md:text-3xl font-serif leading-snug mb-10">
                Eu conduzo um processo <span className="text-gold italic">breve, estratégico e acolhedor</span>, para identificar os conflitos afetivos que te mantêm em padrões repetidos.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                Meu objetivo é abrir espaço para escolhas mais livres e coerentes com quem você é hoje, respeitando sua história e seu tempo.
              </p>
              <GreenButton>Agendar consulta</GreenButton>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-beige/10 p-10 rounded-[40px] border border-gold/10 hover:border-gold/30 transition-colors">
                <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-gold">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-primary font-bold text-xl mb-4">Clareza interna</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Identificamos os afetos em conflito que travam decisões e sustentam ansiedade e culpa no dia a dia.
                </p>
              </div>
              <div className="bg-aqua/10 p-10 rounded-[40px] border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-primary">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <h3 className="text-primary font-bold text-xl mb-4">Ação possível</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Reintegramos essas vivências para destravar movimentos reais, com foco em mudanças consistentes e sustentáveis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video & Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div ref={videoRef} className="relative w-full max-w-[360px] mx-auto rounded-[40px] overflow-hidden shadow-2xl mb-20 bg-slate-900 aspect-[9/16]">
            {isVideoVisible ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/IPJub2xLifE?autoplay=1&mute=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100">
                <div className="animate-pulse bg-slate-200 w-full h-full"></div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-2xl mx-auto text-center">
            <div className="border-r border-slate-100 last:border-0">
              <div className="text-5xl md:text-6xl font-serif text-primary mb-2">8+</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest">Anos de experiência</div>
            </div>
            <div className="border-r border-slate-100 last:border-0">
              <div className="text-5xl md:text-6xl font-serif text-primary mb-2">100%</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest">Foco em TRI</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRI Section */}
      <section id="tri" className="py-24 bg-beige/20 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-gold" />
            <h2 className="text-primary font-bold text-sm uppercase tracking-widest">Terapia de Reintegração Implícita</h2>
            <div className="h-px w-6 bg-gold" />
          </div>
          <h3 className="text-4xl md:text-5xl font-serif text-primary mb-8 max-w-4xl mx-auto leading-tight">
            Um novo caminho começa quando você entende o que te prende.
          </h3>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto mb-20 leading-relaxed">
            Com a TRI, eu te ajudo a identificar os conflitos afetivos por trás da ansiedade, culpa e padrões repetidos — para destravar decisões e construir mudanças reais, com atendimento online ou presencial.
          </p>

          {/* Triangle Diagram & Comparisons */}
          <div className="w-full max-w-6xl mx-auto mb-32">
            {/* Triangle Diagram */}
            <div className="flex items-center justify-center mb-16">
              <Image
                src="/tri.svg"
                alt="Terapia de Reintegração Implícita Diagrama"
                width={600}
                height={600}
                className="w-full h-auto object-contain max-w-md drop-shadow-[0_10px_30px_rgba(0,49,97,0.15)]"
              />
            </div>
            
            {/* Comparison Block */}
            <div className="w-full max-w-[1200px] mx-auto overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row">
              
              {/* Left Column: What T.R.I. is NOT */}
              <div className="flex-1 bg-white p-8 md:p-12 lg:p-16 text-left border-b md:border-b-0 md:border-r border-slate-100">
                <div className="mb-10">
                  <h2 className="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-tight">
                    O que a T.R.I. <span className="text-[#ef4444] italic">NÃO</span> é:
                  </h2>
                  <div className="h-1 w-20 bg-[#ef4444] mt-4 rounded-full"></div>
                </div>
                <ul className="space-y-8">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <X className="text-[#ef4444]" size={28} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 text-xl font-bold mb-1">Não é Terapia Convencional</h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        Processos que levam anos de sessões repetitivas sem apresentar resultados claros ou objetivos definidos.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <X className="text-[#ef4444]" size={28} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 text-xl font-bold mb-1">Não é Pseudosciência</h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        Diferente de métodos sem fundamento, nossa abordagem é estritamente baseada em <span className="font-semibold text-slate-800">evidências e neurociência</span> moderna.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <X className="text-[#ef4444]" size={28} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 text-xl font-bold mb-1">Não é um processo demorado</h3>
                      <p className="text-slate-600 text-base leading-relaxed">
                        Não focamos na análise infinita do passado, mas na resolução pragmática de padrões comportamentais atuais.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Right Column: What T.R.I. IS */}
              <div 
                className="flex-1 p-8 md:p-12 lg:p-16 relative text-left bg-primary"
                style={{ backgroundColor: '#141B4D' }}
              >
                {/* Background Subtle Texture */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <div className="relative z-10">
                  <div className="mb-10">
                    <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                      O que a T.R.I. <span className="text-white italic">É</span>:
                    </h2>
                    <div className="h-1 w-20 bg-white mt-4 rounded-full"></div>
                  </div>
                  <ul className="space-y-8 text-white">
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="text-white" size={28} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-white text-xl font-bold mb-1">Foco em <span className="text-white font-black underline decoration-2 underline-offset-4">95% dos Pacientes</span></h3>
                        <p className="text-white/90 text-base leading-relaxed font-medium">
                          Protocolo com alta taxa de eficácia comprovada, adaptável para a grande maioria das necessidades clínicas.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="text-white" size={28} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-white text-xl font-bold mb-1">Resultados em <span className="text-white font-black underline decoration-2 underline-offset-4">3 Sessões</span></h3>
                        <p className="text-white/90 text-base leading-relaxed font-medium">
                          Método otimizado para proporcionar alívio imediato e ferramentas de autogestão desde o primeiro contato.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle2 className="text-white" size={28} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-white text-xl font-bold mb-1">Abordagem Moderna e Ética</h3>
                        <p className="text-white/90 text-base leading-relaxed font-medium">
                          Transformação profunda através de técnicas de reprocessamento de alta performance.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-12">
                    <a
                      href="https://wa.me/5546999072534?text=Olá, Simone! Tudo bem? Encontrei seu trabalho com a Terapia de Reintegração Implícita (TRI) e gostaria de agendar uma consulta de avaliação. Você pode me informar os horários disponíveis e os valores? Obrigado(a)!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5c] transition-all text-white font-bold py-4 px-8 rounded-xl group shadow-lg"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Quero agendar minha avaliação</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "Ansiedade e mente acelerada", desc: "Reduzimos o \"modo alerta\" ao compreender os gatilhos afetivos por trás da ansiedade." },
              { icon: Users, title: "Autossabotagem e sensação de travamento", desc: "Identificamos o conflito interno que impede o movimento e abrimos novas possibilidades de escolha." },
              { icon: ShieldCheck, title: "Culpa constante e autocobrança", desc: "Trabalhamos as raízes emocionais da culpa para fortalecer leveza e segurança nas decisões." }
            ].map((card, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="mb-8 w-16 h-16 bg-aqua/20 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <card.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h4 className="text-primary font-bold text-2xl mb-4 leading-tight">{card.title}</h4>
                <p className="text-slate-600 text-base leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-serif mb-8">Quer saber se a TRI é para você? Agende sua avaliação</h3>
          <GreenButton>Agendar consulta</GreenButton>
        </div>
      </section>

      {/* Sobre Mim */}
      <section className="py-24 bg-beige/10 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="rounded-[60px] overflow-hidden shadow-2xl border-8 border-white relative z-10">
                  <Image
                    src="/Simone cadeira.JPG"
                    alt="Simone Belle with books"
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold/20 rounded-full blur-3xl -z-10" />
                <div className="absolute top-10 -left-10 w-32 h-32 border-2 border-gold/30 rounded-full -z-10" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-gold" />
                <span className="text-primary font-bold text-sm uppercase tracking-widest">Sobre Mim</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-primary mb-8 leading-tight">Terapeuta Simone Belle</h2>
              <p className="text-slate-700 text-lg mb-12 leading-relaxed">
                Há <span className="text-primary font-bold">8 anos</span>, ajudo pessoas a destravarem a vida emocional com um olhar <span className="text-gold italic">afetivo, estratégico e humano</span>, com foco na Terapia de Reintegração Implícita (TRI).
              </p>

              <div className="grid gap-8">
                {[
                  { icon: Brain, title: "Minha atuação", desc: "Hoje, atuo exclusivamente como terapeuta TRI, conduzindo processos breves e direcionados para quem sente que está \"travado(a)\" mesmo sabendo o que quer." },
                  { icon: GraduationCap, title: "Formação e base científica", desc: "Sou pós-graduada em Neurociências, e integro conhecimento técnico com uma escuta que vai ao ponto: Entender o que sustenta o sintoma e o padrão." },
                  { icon: Heart, title: "O que mais atendo", desc: "Trabalho com ansiedade, culpa, autossabotagem, dificuldades em decisões e conflitos nos relacionamentos." },
                  { icon: Users, title: "Como é o atendimento", desc: "O processo inicia com uma consulta de avaliação online ou presencial, onde compreendo sua história e suas necessidades." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gold shadow-sm group-hover:bg-gold group-hover:text-white transition-all">
                      <item.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-primary font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-16">
                <GreenButton>Agendar consulta agora</GreenButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 bg-aqua/10">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gold" />
            <h2 className="text-primary font-bold text-sm uppercase tracking-widest">Depoimentos</h2>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h3 className="text-4xl md:text-5xl font-serif text-primary mb-16">O que dizem quem já percorreu o caminho</h3>

          <div className="grid md:grid-cols-3 gap-10 justify-items-center">
            {/* Depoimento 1 */}
            <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: `
              <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DF8vNN1SgiG/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DF8vNN1SgiG/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Ver essa foto no Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DF8vNN1SgiG/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Um post compartilhado por Simone Belle | Terapeuta Estratégica (@simonebelle_)</a></p></div></blockquote>
            ` }} />

            {/* Depoimento 2 */}
            <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: `
              <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DQorTprjsPy/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DQorTprjsPy/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Ver essa foto no Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DQorTprjsPy/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Um post compartilhado por Lipe (@olipeofc)</a></p></div></blockquote>
            ` }} />

            {/* Depoimento 3 */}
            <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: `
              <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/Cx_eXLMJE1B/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/Cx_eXLMJE1B/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Ver essa foto no Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/Cx_eXLMJE1B/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Um post compartilhado por Simone Belle | Terapeuta Estratégica (@simonebelle_)</a></p></div></blockquote>
            ` }} />
          </div>
        </div>
      </section>

      {/* Sua jornada comigo */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto rounded-[60px] overflow-hidden shadow-2xl mb-24 border-8 border-beige/30">
            <Image
              src="/Simone_consultorio.JPG"
              alt="Simone in chair"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-gold" />
            <h2 className="text-primary font-bold text-sm uppercase tracking-widest">Sua jornada comigo</h2>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h3 className="text-4xl md:text-5xl font-serif text-primary mb-24">Passo a passo para sua transformação</h3>

          <div className="relative grid md:grid-cols-3 gap-16">
            {/* Dotted Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px border-t-2 border-dotted border-gold/40 -z-10" />

            {[
              { step: "01", title: "Consulta de Avaliação", desc: "A consulta de avaliação é o primeiro passo. Nela, compreendo sua história e suas necessidades atuais para traçar o melhor caminho." },
              { step: "02", title: "Sessão de Terapia", desc: "O trabalho é direcionado à compreensão da origem da sua queixa, respeitando sua história, seu ritmo e suas necessidades individuais." },
              { step: "03", title: "Retorno e Evolução", desc: "Realizado entre 30 e 60 dias após as sessões, para acompanhamento da evolução terapêutica e ajustes no processo." }
            ].map((item, i) => (
              <div key={i} className="bg-beige/10 p-10 rounded-[40px] text-left relative border border-gold/5 hover:border-gold/20 transition-all group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-16 w-16 bg-primary text-white rounded-2xl flex items-center justify-center font-serif text-2xl font-bold shadow-xl group-hover:bg-gold transition-colors rotate-3 group-hover:rotate-0">
                  {item.step}
                </div>
                <h4 className="text-primary font-bold text-xl text-center mt-8 mb-6">{item.title}</h4>
                <p className="text-slate-600 text-base leading-relaxed text-center">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-20">
            <GreenButton>Agendar minha avaliação</GreenButton>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-gold" />
              <h2 className="text-primary font-bold text-sm uppercase tracking-widest">Avaliações Google</h2>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h3 className="text-4xl font-serif text-primary">O que meus pacientes dizem</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Angelo Miguel Paloschi", text: "Então comecei meu tratamento a 4 meses com a doutora simone e tem me ajudado muito a entender os motivos de um caso extremo de depressão..." },
              { name: "Roberto Alexandre", text: "Excelente Terapeuta. Com a ajuda da Simone consegui entender as raízes dos meus problemas e resolver de verdade. Recomendo muito!" },
              { name: "Kamille Roberta Rufatto", text: "O lugar é acolhedor, Simone é uma pessoa maravilhosa, atenciosa e inspiradora. Me ajudou a entender o significado do meu poder pessoal." }
            ].map((review, i) => (
              <div key={i} className="bg-beige/5 p-10 rounded-[40px] shadow-sm border border-gold/10 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-serif text-xl font-bold">{review.name[0]}</div>
                    <div>
                      <div className="text-base font-bold text-primary">{review.name}</div>
                      <div className="text-xs text-slate-400">Paciente Verificado</div>
                    </div>
                  </div>
                  <Image src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" width={60} height={20} className="h-5 w-auto object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Avaliação Real
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-beige/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-gold" />
                <span className="text-primary font-bold text-sm uppercase tracking-widest">Dúvidas Frequentes</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8 leading-tight">Informações essenciais para sua decisão</h2>
              <p className="text-slate-600 text-lg mb-12 leading-relaxed">
                Entendo que iniciar um processo terapêutico é um passo importante. Aqui estão as respostas para as perguntas mais comuns que recebo.
              </p>
              <GreenButton className="hidden md:inline-flex">Agendar Uma Consulta</GreenButton>
            </div>
            <div className="space-y-6">
              <div className="bg-primary p-10 rounded-[40px] text-white mb-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-xl">Como funciona a primeira consulta (avaliação)?</h4>
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Minus className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-base text-white/80 leading-relaxed">
                  Na avaliação, eu entendo sua história, seu momento e o que está te trazendo para a terapia. A partir disso, eu explico como a <span className="text-gold font-bold italic">TRI</span> pode ajudar e indico o melhor caminho para você.
                </p>
              </div>
              <FAQItem question="O que é a Terapia de Reintegração Implícita (TRI)?" answer="A TRI é uma abordagem terapêutica focada em identificar e processar conflitos afetivos inconscientes que geram sintomas como ansiedade e pânico." />
              <FAQItem question="A TRI é indicada para ansiedade e sensação de “mente acelerada”?" answer="Sim, é uma das principais queixas tratadas, ajudando a regular o sistema nervoso e reduzir o estado de alerta constante." />
              <FAQItem question="Em quanto tempo eu começo a perceber mudanças?" answer="Muitos pacientes relatam maior clareza e alívio já nas primeiras sessões, embora o tempo total varie para cada pessoa." />
              <FAQItem question="O atendimento é online ou presencial?" answer="Ambos. Atendo presencialmente em Pato Branco/PR e online para todo o Brasil e exterior." />
            </div>
          </div>
        </div>
      </section>

      {/* Map & Footer */}
      <section className="relative h-[500px] w-full bg-slate-100">
        <div className="absolute inset-0 grayscale opacity-50">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.123456789012!2d-52.67123456789012!3d-26.22945678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEzJzQ2LjAiUyA1MsKwNDAnMTYuNCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg px-6">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex items-start gap-6">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">Endereço</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                R. Visc. de Tamandaré, 259 - b - Santa Terezinha<br />
                Pato Branco - PR, 85506-240
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer id="contato" className="py-20 bg-white border-t border-gold/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="relative h-16 w-64 mb-8">
                <Image
                  src="/logo-simone.png"
                  alt="Simone Belle Logo"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed mb-8">
                Especialista em Terapia de Reintegração Implícita (TRI), ajudando você a encontrar o equilíbrio emocional e a clareza que precisa para viver melhor.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/simonebelle_/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-beige/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/simoneb.terapeuta/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-beige/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.youtube.com/watch?v=IPJub2xLifE" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-beige/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-beige/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-6 uppercase tracking-widest text-sm">Links Rápidos</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-gold transition-colors">Início</a></li>
                <li><a href="#sobre" className="hover:text-gold transition-colors">Sobre o Trabalho</a></li>
                <li><a href="#tri" className="hover:text-gold transition-colors">O que é TRI</a></li>
                <li><a href="#contato" className="hover:text-gold transition-colors">Agendar Consulta</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-6 uppercase tracking-widest text-sm">Contato</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gold" />
                  (46) 99907-2534
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gold" />
                  contato@simonebelle.com.br
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gold" />
                  Pato Branco - PR
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-100">
            <p className="text-slate-400 text-xs">© 2026 Simone Belle. Todos os direitos reservados.</p>
            <div className="flex gap-8 text-xs text-slate-400">
              <a href="/politica-de-privacidade" className="hover:text-primary transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 px-6 py-2 rounded-full border border-gold/30 text-primary text-[10px] font-bold hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
            >
              Voltar para o topo
            </button>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5546999072534?text=Olá, Simone! Tudo bem? Encontrei seu trabalho com a Terapia de Reintegração Implícita (TRI) e gostaria de agendar uma consulta de avaliação. Você pode me informar os horários disponíveis e os valores? Obrigado(a)!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 h-16 w-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <MessageCircle className="h-8 w-8" />
      </a>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] p-12 text-center shadow-2xl"
            >
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-primary transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-primary">
                <Star className="h-10 w-10 fill-accent text-accent" />
              </div>
              <h3 className="text-3xl font-serif text-primary mb-4">Presente Especial</h3>
              <p className="text-slate-600 mb-8">Não vá embora ainda! Agende sua primeira consulta agora e ganhe <span className="font-bold text-primary">15% de desconto</span>.</p>
              <a
                href="https://wa.me/5546999072534?text=Olá, Simone! Tudo bem? Encontrei seu trabalho com a Terapia de Reintegração Implícita (TRI) e gostaria de agendar uma consulta de avaliação. Você pode me informar os horários disponíveis e os valores? Obrigado(a)!"
                className="block w-full bg-[#1db91d] py-5 rounded-full text-white font-bold mb-4 hover:bg-[#18a018] transition-colors"
              >
                Quero meu Desconto
              </a>
              <button
                onClick={() => setShowExitPopup(false)}
                className="text-sm font-bold text-slate-400 hover:text-primary transition-colors"
              >
                Não, obrigado.
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
