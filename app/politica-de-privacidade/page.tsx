import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Política de Privacidade | Simone Bélle',
    description: 'Política de Privacidade da Clínica de Terapia Simone Bélle.',
};

export default function PoliticaPrivacidade() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] py-20">
            <div className="container mx-auto px-6 max-w-3xl">
                <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-gold transition-colors mb-12 font-bold text-sm uppercase tracking-widest">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para Home
                </Link>
                <div className="flex justify-center mb-12">
                    <div className="relative h-20 w-64">
                        <Image
                            src="/logo-simone.png"
                            alt="Simone Bélle Logo"
                            fill
                            className="object-contain"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>

                <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-sm border border-gold/10">
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-10">Política de Privacidade</h1>

                    <div className="space-y-8 text-slate-600 leading-relaxed">
                        <p>
                            A sua privacidade é importante. Esta Política de Privacidade explica como seus dados pessoais podem ser coletados, usados e protegidos ao navegar neste site e ao entrar em contato para solicitar informações ou agendar atendimentos.
                        </p>
                        <p>
                            Ao utilizar este site, você concorda com os termos desta Política.
                        </p>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">1) Quem é a responsável pelos dados</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Controladora:</strong> Terapeuta Simone Bélle</li>
                                <li><strong>Atendimento:</strong> online e presencial</li>
                                <li><strong>Endereço:</strong> Rua Visconde de Tamandaré, nº 259, Bairro Santa Terezinha, Pato Branco/PR, CEP 85506-240</li>
                                <li><strong>Contato (WhatsApp):</strong> (46) 99907-2534</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">2) Quais dados podem ser coletados</h2>
                            <h3 className="font-bold text-lg text-primary mb-2">a) Dados que você fornece</h3>
                            <p className="mb-2">Podemos coletar informações quando você preenche formulários, clica no botão de WhatsApp ou entra em contato, como:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Nome</li>
                                <li>Telefone/WhatsApp</li>
                                <li>E-mail (se você enviar)</li>
                                <li>Mensagens e informações que você escolher compartilhar (ex.: motivo do contato, disponibilidade de horários)</li>
                            </ul>

                            <h3 className="font-bold text-lg text-primary mb-2">b) Dados coletados automaticamente</h3>
                            <p className="mb-2">Ao navegar no site, podem ser coletados automaticamente:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Endereço IP e informações do dispositivo/navegador</li>
                                <li>Páginas visitadas e tempo de navegação</li>
                                <li>Cookies e dados de desempenho (quando habilitados)</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">3) Para que usamos seus dados</h2>
                            <p className="mb-2">Seus dados podem ser usados para:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Responder dúvidas e solicitações enviadas por você</li>
                                <li>Realizar agendamento e confirmação de horários</li>
                                <li>Enviar orientações de atendimento (online/presencial) e informações administrativas</li>
                                <li>Melhorar o conteúdo, a experiência e o funcionamento do site (estatísticas e desempenho)</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">4) Base legal (LGPD)</h2>
                            <p className="mb-2">O tratamento dos dados é realizado conforme a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018), com base principalmente em:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Consentimento (quando você fornece dados por vontade própria)</li>
                                <li>Execução de procedimentos preliminares a um atendimento solicitado (ex.: agendamento)</li>
                                <li>Legítimo interesse, quando aplicável (ex.: segurança do site e melhorias)</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">5) Compartilhamento de dados</h2>
                            <p className="mb-4 font-bold">Não vendemos seus dados.</p>
                            <p className="mb-2">Se necessário, seus dados podem ser compartilhados apenas com:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Provedores de hospedagem e serviços técnicos do site</li>
                                <li>Ferramentas de análise (ex.: métricas de acesso), se utilizadas</li>
                                <li>Serviços de comunicação (ex.: WhatsApp), quando você decide entrar em contato</li>
                            </ul>
                            <p>O compartilhamento ocorre somente para viabilizar o funcionamento do site e o atendimento, sempre buscando o mínimo necessário.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">6) Cookies</h2>
                            <p className="mb-4">Cookies são pequenos arquivos que ajudam o site a funcionar e a entender como as pessoas navegam por ele.</p>
                            <p className="mb-2">Você pode:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Desativar cookies no seu navegador (isso pode afetar algumas funcionalidades)</li>
                                <li>Limpar cookies a qualquer momento</li>
                            </ul>
                            <p>Se o site usar ferramentas de métricas/anúncios, isso pode envolver cookies adicionais.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">7) Segurança das informações</h2>
                            <p>
                                Adotamos medidas de segurança para proteger seus dados contra acessos não autorizados, uso indevido, perda ou alteração.
                                Ainda assim, nenhum sistema é 100% seguro; por isso, recomendamos que você evite enviar informações sensíveis por canais abertos. Quando necessário, orientaremos o melhor canal de comunicação.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">8) Por quanto tempo os dados ficam armazenados</h2>
                            <p className="mb-2">Seus dados serão mantidos apenas pelo tempo necessário para:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Cumprir as finalidades descritas nesta Política</li>
                                <li>Atender obrigações legais e administrativas, quando aplicável</li>
                            </ul>
                            <p>Quando não forem mais necessários, os dados poderão ser excluídos ou anonimizados.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">9) Seus direitos (LGPD)</h2>
                            <p className="mb-2">Você pode, a qualquer momento, solicitar:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Confirmação de tratamento e acesso aos dados</li>
                                <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                                <li>Exclusão de dados (quando aplicável)</li>
                                <li>Revogação do consentimento</li>
                                <li>Informações sobre compartilhamentos</li>
                            </ul>
                            <p>Para solicitar, entre em contato pelo WhatsApp informado nesta página.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">10) Conteúdo para menores de idade</h2>
                            <p>
                                Este site não é direcionado a menores de idade. Se você é menor, recomendamos que o contato e qualquer contratação de serviço seja feito com acompanhamento de um responsável.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4 font-serif">11) Alterações nesta Política</h2>
                            <p className="mb-4">
                                Esta Política pode ser atualizada para refletir melhorias no site ou mudanças legais. A versão vigente será sempre a publicada nesta página.
                            </p>
                            <p className="font-bold">Última atualização: 01/2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
