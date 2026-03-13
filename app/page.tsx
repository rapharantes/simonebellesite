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
          <div ref={videoRef} className="relative max-w-4xl mx-auto rounded-[40px] overflow-hidden shadow-2xl mb-20 bg-slate-900 aspect-video">
            {isVideoVisible ? (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/IPJub2xLifE?autoplay=1&mute=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
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

          {/* Triangle Diagram */}
          <div className="relative max-w-2xl mx-auto mb-32">
            <div className="relative aspect-square md:aspect-video flex items-center justify-center">
              <Image
                src="/tri.svg"
                alt="Terapia de Reintegração Implícita Diagrama"
                width={800}
                height={800}
                className="w-full h-auto object-contain max-w-md drop-shadow-[0_10px_30px_rgba(0,49,97,0.15)]"
              />
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

          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gold/10 group hover:-translate-y-2 transition-all duration-500">
                <div className="p-5 flex items-center justify-between border-b border-slate-50 bg-beige/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-gold to-beige flex items-center justify-center text-white font-bold text-xs shadow-sm">SB</div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-primary">simonebelle_</div>
                      <div className="text-[10px] text-slate-400">Terapia TRI</div>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-white bg-primary px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors">Seguir</button>
                </div>
                <div className="aspect-[4/5] bg-slate-900 relative overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/depo-${i}/600/750`}
                    alt="Depoimento"
                    fill
                    className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6 text-left">
                  <div className="flex gap-4 mb-4">
                    <Heart className="h-6 w-6 text-primary hover:fill-primary cursor-pointer transition-colors" />
                    <MessageCircle className="h-6 w-6 text-primary cursor-pointer" />
                    <ArrowRight className="h-6 w-6 text-primary ml-auto cursor-pointer" />
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">{72 + i * 5} curtidas</div>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    &quot;A terapia com a Simone mudou minha forma de ver o mundo e lidar com meus sentimentos...&quot;
                  </p>
                </div>
              </div>
            ))}
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
