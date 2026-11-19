import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import {
  ArrowRight,
  Bot,
  ChartColumn,
  Check,
  CreditCard,
  Database,
  Filter,
  Gauge,
  Globe,
  LayoutDashboard,
  MessagesSquare,
  Plug,
  Search,
  Smartphone,
  Sparkles,
  Wifi,
} from "lucide-react";

import { LeadForm } from "@/components/site/LeadForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat, WhatsAppLink } from "@/components/site/WhatsAppButton";
import { COMPANY, SITE_URL } from "@/lib/company";

// Página da Plataforma SALT: cobrança 100% digital com inteligência artificial.
// Textos baseados apenas no que já está publicado na home (seções Plataforma SALT, Gestão 360º e Renegociação no cartão).
const PATH = "/cobranca-digital-com-ia/";
const TITLE = "Cobrança Digital com Inteligência Artificial | Plataforma SALT | Assertiva";
const DESCRIPTION =
  "Negociação automatizada 24 horas no WhatsApp, SMS, web e voz, com renegociação no cartão em até 12 parcelas e recebimento em D+1. Conheça a Plataforma SALT.";

const faqs = [
  {
    q: "O que é a Plataforma SALT?",
    a: "É a plataforma de cobrança 100% digital da Assertiva. Ela negocia automaticamente, 24 horas por dia, por web, WhatsApp, SMS e voz sintetizada, usando inteligência artificial para definir a melhor abordagem para cada devedor.",
  },
  {
    q: "O devedor paga para acessar a negociação?",
    a: "Não. O acesso 3G/4G é patrocinado: o devedor negocia sem consumir o plano de dados.",
  },
  {
    q: "Como funciona a renegociação no cartão?",
    a: "O devedor parcela o acordo em 1 a 12 vezes no cartão e você recebe em D+1, sem esperar as parcelas. As taxas já estão incluídas nas opções pagas pelo devedor.",
  },
  {
    q: "A plataforma se integra aos meus sistemas?",
    a: "Sim. A integração é feita por API, com webhooks e web services, conectando a SALT ao seu ERP, CRM ou data warehouse.",
  },
];

type Item = { icon: ComponentType<{ className?: string }>; t: string; d: string };

const flow: Item[] = [
  { icon: Filter, t: "Seleção", d: "A inteligência artificial analisa centenas de parâmetros da carteira para definir a melhor abordagem." },
  { icon: MessagesSquare, t: "Comunicação", d: "WhatsApp e SMS como réguas principais, com chat online, e-mail e voz." },
  { icon: Wifi, t: "Navegação grátis", d: "Acesso 3G/4G patrocinado: o devedor negocia sem consumir o plano de dados." },
  { icon: CreditCard, t: "Fechamento digital", d: "Ofertas dinâmicas por link e emissão imediata do boleto ou pagamento no cartão." },
];

const experience: Item[] = [
  { icon: Globe, t: "Experiência omnichannel", d: "Canais integrados que reduzem a necessidade de atendimento presencial." },
  { icon: Smartphone, t: "Negociação no celular", d: "O devedor recebe a oferta por link e fecha o acordo em poucos toques." },
  { icon: Bot, t: "Robô 24 horas", d: "Atendimento automatizado todos os dias da semana, a qualquer hora." },
];

const data: Item[] = [
  { icon: Gauge, t: "Priorização automática", d: "Distribuição preditiva da carteira com algoritmos inteligentes." },
  { icon: Database, t: "Base com 250 milhões de dados", d: "Localização de devedores e atualização cadastral para chegar a quem precisa ser contatado." },
  { icon: Search, t: "Pesquisa e enriquecimento", d: "Plataforma Neoway, pesquisa de processos judiciais e enriquecimento de dados de contato." },
  { icon: LayoutDashboard, t: "Dashboards em tempo real", d: "Indicadores e retorno de cada ação, com monitoria e qualificação do atendimento." },
  { icon: ChartColumn, t: "Relatórios e BI", d: "Dashboards no Google Data Studio com funil de engajamento e KPIs da sua carteira." },
  { icon: Plug, t: "Integração por API", d: "Conexão por webhooks e web services com o seu ERP, CRM ou data warehouse." },
];

export const Route = createFileRoute("/cobranca-digital-com-ia")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL + PATH },
    ],
    links: [{ rel: "canonical", href: SITE_URL + PATH }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Plataforma SALT: cobrança digital com inteligência artificial",
              serviceType: "Cobrança digital",
              description: DESCRIPTION,
              url: SITE_URL + PATH,
              areaServed: { "@type": "Country", name: "Brasil" },
              provider: { "@id": SITE_URL + "/#empresa" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL + "/" },
                { "@type": "ListItem", position: 2, name: "Cobrança digital com IA", item: SITE_URL + PATH },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }),
      },
    ],
  }),
  component: SaltPage,
});

function ItemCard({ item, tone = "card" }: { item: Item; tone?: "card" | "surface" }) {
  return (
    <div className={"rounded-xl border border-border p-6 " + (tone === "card" ? "bg-card" : "bg-surface")}>
      <div className="inline-flex rounded-lg bg-primary/15 p-2.5"><item.icon className="size-5 text-primary" /></div>
      <h3 className="mt-4 text-lg font-bold">{item.t}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{item.d}</p>
    </div>
  );
}

function SaltPage() {
  // WhatsApp flutuante: aparece quando a pessoa começa a rolar e some enquanto o formulário está na tela.
  const [scrolled, setScrolled] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const form = document.getElementById("form");
    if (!form || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setFormVisible(!!e?.isIntersecting), { threshold: 0.15 });
    io.observe(form);
    return () => io.disconnect();
  }, []);

  return (
    <main className="overflow-x-hidden">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="/" aria-label="Assertiva Recuperação de Crédito, início">
            <img src="/logos/logo-assertiva-rc.png" alt={COMPANY.name} width={1019} height={240} className="h-12 w-auto sm:h-14" />
          </a>
          <a href="#form" className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:brightness-110 sm:inline-block">Análise gratuita</a>
        </div>
      </header>

      {/* Início */}
      <section className="relative bg-hero">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto max-w-4xl px-5 py-12 sm:py-16 lg:py-20">
          <nav aria-label="Você está em" className="text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground">Início</a> <span aria-hidden="true">/</span> Cobrança digital com IA
          </nav>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">
            <Sparkles className="size-3.5" /> Plataforma SALT
          </p>
          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] sm:text-5xl">
            Cobrança 100% digital com <span className="text-gradient">inteligência artificial</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Negociação automatizada 24 horas por dia, sem intervenção humana, em canais integrados: web, WhatsApp, SMS e voz sintetizada.
            Hospedada em infraestrutura IBM/AWS.
          </p>
          <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
            <a href="#form" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground hover:brightness-110 sm:w-auto">
              Solicitar análise gratuita <ArrowRight className="size-5" />
            </a>
            <WhatsAppLink location="salt_inicio" className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
              ou fale no WhatsApp
            </WhatsAppLink>
          </div>
          <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-2">
            {["Robô de negociação 24/7", "WhatsApp, SMS, web e voz", "Renegociação no cartão", "100% dentro da LGPD"].map((b) => (
              <li key={b} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-primary" />{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Como funciona</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">Da seleção ao <span className="text-gradient">acordo fechado</span></h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {flow.map((s, i) => (
              <li key={s.t} className="rounded-xl border border-border bg-card p-6">
                <span className="font-display text-3xl font-bold text-primary">0{i + 1}</span>
                <div className="mt-3 flex items-center gap-2"><s.icon className="size-5 text-primary" /><h3 className="text-lg font-bold">{s.t}</h3></div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Experiência do devedor */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Experiência</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">A negociação <span className="text-gradient">no bolso do devedor</span></h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {experience.map((s) => <ItemCard key={s.t} item={s} />)}
          </div>
        </div>
      </section>

      {/* Cartão de crédito */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-2xl border border-primary/40 bg-card bg-hero p-8 shadow-glow sm:p-10">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary"><CreditCard className="size-4" /> Renegociação no cartão</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">O devedor parcela, <span className="text-gradient">você recebe em D+1</span></h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">Na Plataforma SALT, o devedor pode parcelar o acordo no cartão e você recebe sem esperar as parcelas.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Renegociação de 1 a 12 parcelas", "Dinheiro na sua conta em D+1", "Sem onerar: as taxas já estão incluídas nas opções pagas pelo devedor"].map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dados */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Dados e inteligência</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">O que está <span className="text-gradient">por trás da cobrança</span></h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((s) => <ItemCard key={s.t} item={s} />)}
          </div>
        </div>
      </section>

      {/* Digital e humano */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Digital, sem deixar de ser <span className="text-gradient">humano</span></h2>
        <p className="mt-4 text-muted-foreground">
          Quando a negociação precisa de pessoas, a SALT trabalha junto com a Tele Cobrança, a Visita Externa e a Cobrança Amigável e Judicial
          da Assertiva. Tudo dentro da LGPD e do Código de Defesa do Consumidor.
        </p>
      </section>

      {/* Perguntas frequentes */}
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <h2 className="text-3xl font-bold sm:text-4xl">Perguntas frequentes</h2>
        <div className="mt-8 grid gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="relative scroll-mt-20 bg-hero">
        <div className="mx-auto max-w-xl px-5 py-20">
          <LeadForm id="form" title="Solicite uma análise gratuita" />
          <WhatsAppLink location="salt_formulario" className="mt-4 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            Prefere conversar agora? Fale no WhatsApp
          </WhatsAppLink>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat show={scrolled && !formVisible} />
    </main>
  );
}
