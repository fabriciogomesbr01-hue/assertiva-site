import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import {
  ArrowRight,
  Car,
  ChartColumn,
  Check,
  CreditCard,
  FileCheck,
  HandCoins,
  Handshake,
  Headphones,
  Landmark,
  Lock,
  Scale,
  Smartphone,
  Truck,
} from "lucide-react";

import { LeadForm } from "@/components/site/LeadForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat, WhatsAppLink } from "@/components/site/WhatsAppButton";
import { COMPANY, SITE_URL } from "@/lib/company";

// Página de segmento: cobrança e recuperação de crédito para cooperativas.
// Textos baseados apenas no que já está publicado na home (CAS do Sicredi, 7+ anos com cooperativas, serviços, LGPD).
// Remuneração: por êxito ou por PA fixa, combinada com cada cooperativa.
const PATH = "/cooperativas-de-credito/";
const TITLE = "Cobrança e Recuperação de Crédito para Cooperativas | Assertiva";
const DESCRIPTION =
  "Recuperação de crédito para cooperativas, com cobrança humanizada, 100% LGPD e remuneração por êxito ou PA fixa. Cadastrada no CAS do Sicredi.";

const faqs = [
  {
    q: "A Assertiva atende cooperativas de crédito?",
    a: "Sim. Estamos cadastrados no CAS do Sicredi, o que permite que mais de 100 cooperativas nos contratem de imediato, e atuamos há mais de 7 anos com cooperativas.",
  },
  {
    q: "A cobrança prejudica o relacionamento com o cooperado?",
    a: "Não. A abordagem é respeitosa, transparente e alinhada à política da cooperativa, ao Código de Defesa do Consumidor e à LGPD.",
  },
  {
    q: "Como a Assertiva é remunerada?",
    a: "Por êxito, calculado sobre o valor efetivamente recuperado, ou por PA fixa. O modelo é combinado com cada cooperativa, conforme a forma como ela costuma trabalhar.",
  },
  {
    q: "Vocês atuam em todo o Brasil?",
    a: "Sim. A sede fica no Espírito Santo, com operação digital nacional e equipe de visita externa em todo o território.",
  },
];

const steps = [
  { t: "Diagnóstico da carteira", d: "Avaliamos a estrutura e o perfil da dívida, sem custo." },
  { t: "Régua multicanal", d: "Os cooperados entram na nossa esteira de contato por WhatsApp, SMS, web, telefone e visita, 24 horas por dia." },
  { t: "Acompanhamento e repasse", d: "Você acompanha os indicadores em tempo real e recebe os valores recuperados." },
];

const services: { icon: ComponentType<{ className?: string }>; t: string; d: string }[] = [
  { icon: Headphones, t: "Tele Cobrança", d: "Equipe treinada para abordagens respeitosas e focadas em conversão." },
  { icon: Scale, t: "Cobrança Amigável e Judicial", d: "Estratégia escalonada, evitando a judicialização precoce quando possível." },
  { icon: Car, t: "Visita Externa", d: "Equipe em todo o país, com status da visita, fotos do local e parecer conclusivo." },
  { icon: Truck, t: "Apreensão e Remoção", d: "Recuperação de garantias com procedimento legal assistido." },
  { icon: Smartphone, t: "Cobrança Digital com IA", d: "Plataforma SALT: negociação automatizada 24 horas no WhatsApp, SMS, web e voz." },
  { icon: CreditCard, t: "Renegociação no cartão", d: "O cooperado parcela o acordo em 1 a 12 vezes e a cooperativa recebe em D+1." },
];

const pillars: { icon: ComponentType<{ className?: string }>; t: string; d: string }[] = [
  { icon: ChartColumn, t: "Dados e transparência", d: "Dashboards em tempo real, relatórios e BI com os indicadores da carteira, priorização automática dos casos e integração por API." },
  { icon: Lock, t: "100% dentro da LGPD", d: "Os dados dos cooperados são usados apenas para a cobrança contratada, com acesso restrito e armazenamento protegido." },
  { icon: HandCoins, t: "Remuneração do jeito da cooperativa", d: "Trabalhamos por êxito, calculado sobre o valor efetivamente recuperado, ou por PA fixa. O modelo é definido em conversa, conforme a forma como a cooperativa costuma trabalhar." },
];

export const Route = createFileRoute("/cooperativas-de-credito")({
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
              name: "Cobrança e recuperação de crédito para cooperativas",
              serviceType: "Recuperação de crédito",
              description: DESCRIPTION,
              url: SITE_URL + PATH,
              areaServed: { "@type": "Country", name: "Brasil" },
              audience: { "@type": "BusinessAudience", name: "Cooperativas de crédito" },
              provider: { "@id": SITE_URL + "/#empresa" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL + "/" },
                { "@type": "ListItem", position: 2, name: "Cooperativas de crédito", item: SITE_URL + PATH },
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
  component: CooperativasPage,
});

function CooperativasPage() {
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
            <a href="/" className="hover:text-foreground">Início</a> <span aria-hidden="true">/</span> Cooperativas de crédito
          </nav>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">
            <Landmark className="size-3.5" /> Cadastrada no CAS do Sicredi
          </p>
          <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] sm:text-5xl">
            Cobrança e recuperação de crédito <span className="text-gradient">para cooperativas</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            A Assertiva Recuperação de Crédito recupera ativos de cooperativas de crédito há mais de 7 anos. Combina cobrança humanizada, tecnologia
            própria e uma base com mais de 250 milhões de dados para localizar e negociar com os cooperados inadimplentes, do jeito certo.
          </p>
          <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
            <a href="#form" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground hover:brightness-110 sm:w-auto">
              Solicitar análise gratuita <ArrowRight className="size-5" />
            </a>
            <WhatsAppLink location="cooperativas_inicio" className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
              ou fale no WhatsApp
            </WhatsAppLink>
          </div>
          <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-2">
            {["Remuneração por êxito ou PA fixa", "100% dentro da LGPD", "Cobrança extrajudicial e judicial", "Atuação em todo o Brasil"].map((b) => (
              <li key={b} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-primary" />{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CAS e relacionamento */}
      <section className="border-y border-border bg-surface py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="inline-flex rounded-lg bg-primary/15 p-2.5"><Landmark className="size-5 text-primary" /></div>
            <h2 className="mt-4 text-2xl font-bold">Cadastrada no CAS do Sicredi</h2>
            <p className="mt-3 text-muted-foreground">
              A Assertiva é cadastrada no CAS (Centro Administrativo do Sicredi). Na prática, mais de 100 cooperativas podem nos contratar de imediato.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="inline-flex rounded-lg bg-primary/15 p-2.5"><Handshake className="size-5 text-primary" /></div>
            <h2 className="mt-4 text-2xl font-bold">Cobrança que preserva o relacionamento com o cooperado</h2>
            <p className="mt-3 text-muted-foreground">
              Na cooperativa, o devedor também é associado. Por isso, a abordagem é respeitosa e transparente, sem constrangimento nem exposição,
              como prevê o Código de Defesa do Consumidor, e alinhada à política da cooperativa.
            </p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Metodologia</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">Como recuperamos a carteira <span className="text-gradient">da sua cooperativa</span></h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.t} className="rounded-xl border border-border bg-card p-6">
                <span className="font-display text-3xl font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Soluções */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Soluções</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">Tudo o que a cooperativa precisa, <span className="text-gradient">do contato ao pagamento</span></h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.t} className="rounded-xl border border-border bg-card p-6">
                <div className="inline-flex rounded-lg bg-primary/15 p-2.5"><s.icon className="size-5 text-primary" /></div>
                <h3 className="mt-4 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dados, LGPD e êxito */}
      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.t} className="rounded-xl border border-border bg-card p-6">
              <div className="inline-flex rounded-lg bg-primary/15 p-2.5"><p.icon className="size-5 text-primary" /></div>
              <h2 className="mt-4 text-xl font-bold">{p.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Perguntas frequentes */}
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <h2 className="text-3xl font-bold sm:text-4xl">Perguntas frequentes</h2>
        <div className="mt-8 grid gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5">
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
          <WhatsAppLink location="cooperativas_formulario" className="mt-4 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            Prefere conversar agora? Fale no WhatsApp
          </WhatsAppLink>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <FileCheck className="mr-1 inline size-4 text-primary" />
            Diagnóstico da carteira sem custo e sem compromisso. Na conversa, definimos juntos o modelo de trabalho e de remuneração.
          </p>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat show={scrolled && !formVisible} />
    </main>
  );
}
