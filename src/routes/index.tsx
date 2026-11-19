import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import {
  ArrowRight,
  BadgePercent,
  Bot,
  CalendarCheck,
  Car,
  Check,
  ChartColumn,
  ChevronDown,
  CreditCard,
  Database,
  FileCheck,
  FileText,
  Filter,
  Gauge,
  Globe,
  GraduationCap,
  HandCoins,
  Handshake,
  Headphones,
  House,
  Landmark,
  LayoutDashboard,
  ListOrdered,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  MessagesSquare,
  Phone,
  Plug,
  Receipt,
  Scale,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Tractor,
  TrendingUp,
  Truck,
  UserCheck,
  Wallet,
  Wifi,
  X,
} from "lucide-react";

import { LeadForm } from "@/components/site/LeadForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat, WhatsAppLink, waButton } from "@/components/site/WhatsAppButton";
import { COMPANY, SITE_URL, telHref, track } from "@/lib/company";

const TITLE = "Recuperação de Crédito e Cobrança Extrajudicial | Assertiva";
const DESCRIPTION =
  "Recuperação de crédito e cobrança extrajudicial para empresas, bancos e cooperativas. Mais de 20 anos, cobrança humanizada e remuneração por êxito.";

// Foco de SEO da home: marca Assertiva, "recuperação de crédito" e "assessoria de cobrança".
// As palavras da campanha ("empresa de cobrança terceirizada/extrajudicial") ficam com a landing page
// (lp.assertivarc.com.br), para as duas páginas não disputarem a mesma busca.
const faqs = [
  {
    q: "O que é recuperação de crédito?",
    a: "É o conjunto de ações para receber valores em atraso: diagnóstico da carteira, localização dos devedores, negociação e acompanhamento dos acordos até o pagamento, preferencialmente sem processo judicial.",
  },
  {
    q: "O que faz uma empresa de recuperação de crédito?",
    a: "Assume a cobrança da sua carteira de inadimplentes: localiza os devedores, negocia por vários canais e acompanha cada acordo até o pagamento, com relatórios para a sua empresa.",
  },
  {
    q: "Como a Assertiva é remunerada?",
    a: "Por êxito. Nossa remuneração é calculada sobre a carteira efetivamente recuperada, ou seja, só ganhamos quando você recebe.",
  },
  {
    q: "Qual a diferença entre cobrança extrajudicial e judicial?",
    a: "A extrajudicial busca o acordo sem processo, por telefone, WhatsApp, SMS, e-mail e visitas. É mais rápida e barata. A judicial entra quando a negociação não avança, e trabalhamos as duas de forma escalonada para evitar a judicialização precoce.",
  },
  {
    q: "A cobrança prejudica o relacionamento com meus clientes?",
    a: "Não. Somos especialistas em cobrança humanizada: abordagem respeitosa, transparente e alinhada à sua política comercial, ao Código de Defesa do Consumidor e à LGPD.",
  },
  {
    q: "Vocês trabalham dentro da LGPD?",
    a: "Sim. Atuamos exclusivamente dentro da LGPD: os dados são usados só para a finalidade da cobrança, com acesso restrito, armazenamento seguro e abordagem respeitosa ao devedor.",
  },
  {
    q: "Atendem cooperativas de crédito?",
    a: "Sim. Estamos cadastrados no CAS do Sicredi, o que permite que mais de 100 cooperativas nos contratem de imediato, e atuamos há 8 anos com cooperativas.",
  },
  {
    q: "Vocês atuam em todo o Brasil?",
    a: "Sim. A sede fica no Espírito Santo, com operação digital nacional e equipe de visita externa fidelizada em todo o território.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              "@id": `${SITE_URL}/#empresa`,
              name: "Assertiva Recuperação de Crédito",
              alternateName: COMPANY.legalName,
              legalName: COMPANY.legalName,
              taxID: COMPANY.cnpj,
              foundingDate: "2017",
              description: DESCRIPTION,
              url: `${SITE_URL}/`,
              logo: `${SITE_URL}/logos/logo-assertiva-rc.png`,
              image: `${SITE_URL}/og-image.png`,
              telephone: `+55 ${COMPANY.phones[0]}`,
              address: { "@type": "PostalAddress", addressRegion: "ES", addressCountry: "BR" },
              areaServed: { "@type": "Country", name: "Brasil" },
              sameAs: [COMPANY.instagram, COMPANY.linkedin],
              knowsAbout: ["Recuperação de crédito", "Cobrança extrajudicial", "Cobrança judicial", "Assessoria de cobrança"],
              contactPoint: [
                ...COMPANY.phones.map((p) => ({ "@type": "ContactPoint", telephone: `+55 ${p}`, contactType: "customer service", areaServed: "BR", availableLanguage: "Portuguese" })),
                { "@type": "ContactPoint", telephone: `+55 ${COMPANY.whatsappLabel}`, contactType: "sales", areaServed: "BR", availableLanguage: "Portuguese" },
              ],
            },
            { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: "Assertiva Recuperação de Crédito", inLanguage: "pt-BR", publisher: { "@id": `${SITE_URL}/#empresa` } },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

const nav = [
  { href: "#segmentos", label: "Segmentos" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#digital", label: "Tecnologia" },
  { href: "#lgpd", label: "LGPD" },
  { href: "#contato", label: "Contato" },
];

const logos = [
  { src: "/logos/logo_5_sicredi_final.png", alt: "Sicredi", w: 382, h: 96 },
  { src: "/logos/logo_4_sicoob_final.png", alt: "Sicoob", w: 423, h: 96 },
  { src: "/logos/logo_horizontes_fibra.png", alt: "Horizontes Fibra", w: 506, h: 96 },
  { src: "/logos/logo_2_grupo_lima_final.png", alt: "Grupo Lima", w: 160, h: 160, square: true },
];

const segments = [
  { icon: Landmark, t: "Cooperativas e bancos", d: "Cadastrados no CAS do Sicredi e há 8 anos recuperando ativos de cooperativas." },
  { icon: ShieldCheck, t: "Seguros e consórcio", d: "Cobrança de parcelas e cotas em atraso com abordagem consultiva." },
  { icon: Wallet, t: "Consignado", d: "Recuperação de contratos com régua dedicada a cada perfil." },
  { icon: CreditCard, t: "Cartões", d: "Negociação em escala, com canais digitais e ofertas por perfil de dívida." },
  { icon: ShoppingCart, t: "Varejo e maquinário", d: "Recuperação de crediário, financiamentos e equipamentos." },
  { icon: House, t: "Imobiliário, IPTU e IPVA", d: "Cobrança de aluguéis, condomínios e tributos com estratégia escalonada." },
  { icon: Tractor, t: "Pesados e agrícola", d: "Máquinas, veículos pesados e crédito rural, com visita externa e apreensão." },
];

const services = [
  { icon: Headphones, t: "Tele Cobrança", d: "Equipe treinada para abordagens respeitosas e focadas em conversão." },
  { icon: Scale, t: "Cobrança Amigável e Judicial", d: "Estratégia escalonada por perfil de endividamento, evitando a judicialização precoce quando possível." },
  { icon: MapPin, t: "Visita Externa", d: "Equipe fidelizada em todo o país, com status da visita, fotos do local e parecer conclusivo." },
  { icon: Truck, t: "Apreensão e Remoção", d: "Recuperação de garantias com procedimento legal assistido e inteligência logística." },
  { icon: Bot, t: "Cobrança Digital com IA", d: "Plataforma SALT: negociação automatizada 24 horas no WhatsApp, SMS, web e voz." },
  { icon: FileText, t: "Gestão de Documentos", d: "Armazenamento, higienização e controle de todo o ciclo documental dos processos." },
];

const flow = [
  { icon: Filter, t: "Seleção", d: "A inteligência artificial analisa centenas de parâmetros da carteira para definir a melhor abordagem." },
  { icon: MessagesSquare, t: "Comunicação", d: "WhatsApp e SMS como réguas principais, com chat online, e-mail e voz." },
  { icon: Wifi, t: "Navegação grátis", d: "Acesso 3G/4G patrocinado: o devedor negocia sem consumir o plano de dados." },
  { icon: Receipt, t: "Fechamento digital", d: "Ofertas dinâmicas por link e emissão imediata do boleto ou pagamento no cartão." },
];

const management = [
  { icon: ListOrdered, t: "Priorização automática", d: "Distribuição preditiva da carteira com algoritmos inteligentes." },
  { icon: LayoutDashboard, t: "Dashboards em tempo real", d: "Indicadores e retorno de cada ação, com monitoria e qualificação do atendimento." },
  { icon: Search, t: "Pesquisa e enriquecimento", d: "Plataforma Neoway, pesquisa de processos judiciais e enriquecimento de dados de contato." },
  { icon: Database, t: "Base com 250 milhões de dados", d: "Localização de devedores e atualização cadastral para chegar a quem precisa ser contatado." },
  { icon: ChartColumn, t: "Relatórios e BI", d: "Dashboards no Google Data Studio com funil de engajamento e KPIs da sua carteira." },
  { icon: Plug, t: "Integração por API", d: "Conexão por webhooks e web services com o seu ERP, CRM ou data warehouse." },
  { icon: Gauge, t: "Monitoria de qualidade", d: "Avaliação personalizada e acompanhamento da evolução de cada colaborador em tempo real." },
  { icon: GraduationCap, t: "Treinamento contínuo", d: "Capacitação e avaliação constantes, individuais e por equipe." },
];

const lgpd = [
  { icon: FileCheck, t: "Finalidade definida", d: "Os dados da sua carteira são usados apenas para a cobrança contratada, nada além disso." },
  { icon: Lock, t: "Segurança da informação", d: "Acesso restrito à equipe responsável e armazenamento protegido." },
  { icon: UserCheck, t: "Respeito ao devedor", d: "Abordagem transparente, sem constrangimento ou exposição, como prevê o Código de Defesa do Consumidor." },
  { icon: Scale, t: "Conformidade com a lei", d: "Processos de cobrança alinhados à LGPD (Lei nº 13.709/2018) em todos os canais." },
];

const steps = [
  { t: "Diagnóstico da carteira", d: "Avaliamos a estrutura e o perfil da dívida da sua carteira, sem custo." },
  { t: "Régua multicanal", d: "Seus clientes entram na nossa esteira de contato por WhatsApp, SMS, web, telefone e visita, 24 horas por dia." },
  { t: "Acompanhamento e repasse", d: "Você acompanha os indicadores em tempo real e recebe os valores recuperados." },
];

function Section({ id, eyebrow, title, intro, children, tone = "base" }: { id?: string; eyebrow?: string; title: ReactNode; intro?: string; children: ReactNode; tone?: "base" | "surface" }) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 ${tone === "surface" ? "border-y border-border bg-surface" : ""}`}>
      <div className="mx-auto max-w-6xl px-5">
        {eyebrow && <p className="text-sm font-bold uppercase tracking-wider text-primary">{eyebrow}</p>}
        <h2 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

function Card({ icon: I, t, d, tone = "card" }: { icon: ComponentType<{ className?: string }>; t: string; d: string; tone?: "card" | "surface" }) {
  return (
    <div className={`rounded-xl border border-border p-6 transition hover:border-primary/50 ${tone === "card" ? "bg-card" : "bg-surface"}`}>
      <div className="inline-flex rounded-lg bg-primary/15 p-2.5"><I className="size-5 text-primary" /></div>
      <h3 className="mt-4 text-lg font-bold">{t}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{d}</p>
    </div>
  );
}

function Home() {
  const [open, setOpen] = useState<number | null>(0);
  const [menu, setMenu] = useState(false);
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
      {/* Cabeçalho */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#inicio" aria-label="Assertiva Recuperação de Crédito, início">
            <img src="/logos/logo-assertiva-rc.png" alt="Assertiva Recuperação de Crédito" width={1019} height={240} fetchPriority="high" className="h-12 w-auto sm:h-14" />
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-6 text-sm font-semibold text-muted-foreground lg:flex">
            {nav.map((n) => <a key={n.href} href={n.href} className="hover:text-foreground">{n.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contato" className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:brightness-110 sm:inline-block">Análise gratuita</a>
            <button type="button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="menu-celular" className="rounded-lg border border-border p-2 lg:hidden">
              <span className="sr-only">Abrir menu</span>
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menu && (
          <nav id="menu-celular" aria-label="Menu" className="border-t border-border px-5 py-3 lg:hidden">
            {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="block py-2 font-semibold">{n.label}</a>)}
          </nav>
        )}
      </header>

      {/* Início */}
      <section id="inicio" className="relative scroll-mt-20 bg-hero">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">
              <Sparkles className="size-3.5" /> Especialista em cobrança humanizada
            </p>
            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] sm:mt-5 sm:text-5xl lg:text-[3.4rem]">
              Recuperação de crédito e cobrança extrajudicial <span className="text-gradient">para seu crédito render mais</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              A Assertiva Recuperação de Crédito combina mais de 20 anos de mercado com inteligência artificial e uma base de 250 milhões de dados para localizar e negociar com seus inadimplentes, do jeito certo.
            </p>
            <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
              <a href="#contato" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-bold text-primary-foreground hover:brightness-110 sm:w-auto">
                Solicitar análise gratuita <ArrowRight className="size-5" />
              </a>
              <WhatsAppLink location="inicio" className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
                <MessageCircle className="size-4 text-[#25D366]" /> ou fale no WhatsApp
              </WhatsAppLink>
            </div>
            <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-2">
              {["Remuneração por êxito", "100% dentro da LGPD", "Cobrança extrajudicial e judicial", "Atuação em todo o Brasil"].map((b) => (
                <li key={b} className="flex items-center gap-2"><Check className="size-4 shrink-0 text-primary" />{b}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              ["20+", "anos de mercado"],
              ["250 mi", "dados na base"],
              ["24/7", "autoatendimento digital"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-border bg-card/80 p-4 text-center shadow-glow sm:p-6">
                <div className="whitespace-nowrap font-display text-2xl font-extrabold text-primary sm:text-3xl xl:text-4xl">{n}</div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{l}</div>
              </div>
            ))}
            <div className="col-span-3 rounded-2xl border border-primary/40 bg-card/80 p-5 sm:p-6">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary"><HandCoins className="size-4" /> Remuneração por êxito</p>
              <p className="mt-2 text-lg font-bold sm:text-xl">Só ganhamos quando você recebe.</p>
              <p className="mt-1 text-sm text-muted-foreground">Nossa remuneração é calculada sobre a carteira efetivamente recuperada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes */}
      <section aria-label="Clientes" className="bg-paper py-10 text-paper-foreground">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-sm font-semibold">Recuperando ativos de cooperativas, bancos e empresas</h2>
          <div className="mt-6 grid grid-cols-2 items-center justify-items-center gap-6 md:flex md:flex-wrap md:justify-center md:gap-x-14">
            {logos.map((l) => (
              <img key={l.alt} src={l.src} alt={l.alt} width={l.w} height={l.h} loading="lazy" decoding="async"
                className={`w-auto max-w-full object-contain ${l.square ? "h-16 md:h-20" : "h-8 sm:h-10 md:h-12"}`} />
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm opacity-75">Cadastrados no <strong>CAS (Centro Administrativo do Sicredi)</strong>: mais de 100 cooperativas podem nos contratar de imediato.</p>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="scroll-mt-20 border-y border-border bg-surface py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Quem somos</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Assessoria de cobrança e <span className="text-gradient">recuperação de crédito</span> há mais de 20 anos</h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                A Assertiva Recuperação de Crédito (Assertiva Multicanalidade) é uma assessoria de cobrança com sede no Espírito Santo e
                atuação em todo o Brasil. Recuperamos ativos de cooperativas de crédito, bancos e empresas de diversos segmentos,
                combinando cobrança humanizada, tecnologia própria e uma base com mais de 250 milhões de dados.
              </p>
              <p>
                Cuidamos de todo o ciclo de recuperação de crédito, da cobrança extrajudicial à judicial, com relatórios em tempo real,
                processos alinhados à LGPD e remuneração por êxito: nosso resultado depende do quanto você recebe.
              </p>
            </div>
          </div>
          <ul className="grid gap-3 self-center">
            {[
              "Mais de 20 anos de experiência em recuperação de crédito",
              "Cadastrada no CAS do Sicredi: mais de 100 cooperativas podem contratar de imediato",
              "Sede no Espírito Santo, com operação digital e visita externa em todo o país",
              "Cobrança humanizada, dentro da LGPD e do Código de Defesa do Consumidor",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm"><Check className="mt-0.5 size-5 shrink-0 text-primary" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Segmentos */}
      <Section id="segmentos" eyebrow="Onde atuamos" title={<>Segmentos <span className="text-gradient">atendidos</span></>} intro="Cada setor tem um perfil de devedor e uma régua de cobrança própria. Adaptamos a estratégia à sua carteira.">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((s) => <Card key={s.t} icon={s.icon} t={s.t} d={s.d} tone="surface" />)}
          <a href="#contato" className="flex flex-col justify-center rounded-xl border border-dashed border-primary/50 p-6 text-sm font-semibold text-primary hover:bg-primary/5">
            Seu segmento não está aqui? <span className="mt-1 inline-flex items-center gap-1">Fale com a gente <ArrowRight className="size-4" /></span>
          </a>
        </div>
        <a href="/cooperativas-de-credito/" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
          Conheça a cobrança para cooperativas de crédito <ArrowRight className="size-4" />
        </a>
      </Section>

      {/* Soluções */}
      <Section id="solucoes" tone="surface" eyebrow="Nossas soluções" title={<>Assessoria de cobrança completa, <span className="text-gradient">do contato ao pagamento</span></>}>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <Card key={s.t} icon={s.icon} t={s.t} d={s.d} />)}
        </div>
      </Section>

      {/* Tecnologia */}
      <Section id="digital" eyebrow="Plataforma SALT" title={<>Cobrança 100% digital com <span className="text-gradient">inteligência artificial</span></>} intro="Negociação automatizada 24 horas por dia, sem intervenção humana, em canais integrados: web, WhatsApp, SMS e voz sintetizada. Hospedada em infraestrutura IBM/AWS.">
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {flow.map((s, i) => (
            <li key={s.t} className="relative rounded-xl border border-border bg-surface p-6">
              <span className="font-display text-4xl font-extrabold text-gradient">0{i + 1}</span>
              <div className="mt-3 flex items-center gap-2"><s.icon className="size-5 text-primary" /><h3 className="text-lg font-bold">{s.t}</h3></div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: Globe, t: "Experiência omnichannel", d: "Canais integrados que reduzem a necessidade de atendimento presencial." },
            { icon: Smartphone, t: "Negociação no celular", d: "O devedor recebe a oferta por link e fecha o acordo em poucos toques." },
            { icon: Bot, t: "Robô 24 horas", d: "Atendimento automatizado todos os dias da semana, a qualquer hora." },
          ].map((s) => <Card key={s.t} icon={s.icon} t={s.t} d={s.d} tone="surface" />)}
        </div>
      </Section>

      {/* Gestão e dados */}
      <Section tone="surface" eyebrow="Gestão 360º" title={<>Dados, governança e <span className="text-gradient">transparência</span></>} intro="Operações, sistemas, planejamento, RH, control desk e MIS trabalhando em sintonia para você acompanhar cada passo da sua carteira.">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {management.map((s) => <Card key={s.t} icon={s.icon} t={s.t} d={s.d} />)}
        </div>
      </Section>

      {/* Cartão de crédito */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-8 rounded-2xl border border-primary/40 bg-card bg-hero p-8 shadow-glow sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary"><CreditCard className="size-4" /> Novidade</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Renegociação no <span className="text-gradient">cartão de crédito</span></h2>
            <p className="mt-4 max-w-xl text-muted-foreground">Na plataforma SALT, o devedor pode parcelar o acordo no cartão e você recebe sem esperar as parcelas.</p>
          </div>
          <ul className="grid gap-3">
            {[
              { i: CalendarCheck, t: "Renegociação de 1 a 12 parcelas" },
              { i: Wallet, t: "Dinheiro na sua conta em D+1" },
              { i: BadgePercent, t: "Sem onerar: as taxas já estão incluídas nas opções pagas pelo devedor" },
            ].map(({ i: I, t }) => (
              <li key={t} className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4 text-sm"><I className="mt-0.5 size-5 shrink-0 text-primary" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Êxito */}
      <Section tone="surface" eyebrow="Remuneração por êxito" title={<>Só ganhamos quando <span className="text-gradient">você ganha</span></>} intro="Trabalhamos por êxito: nossa remuneração é calculada sobre a carteira efetivamente recuperada. Nosso interesse é o mesmo que o seu, recuperar o máximo possível.">
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: BadgePercent, t: "Sobre o valor recuperado", d: "A remuneração incide sobre o que efetivamente volta para o seu caixa." },
            { icon: TrendingUp, t: "Interesses alinhados", d: "Quanto mais você recebe, melhor para os dois." },
            { icon: Handshake, t: "Parceria de longo prazo", d: "Relatórios de cada ação e atendimento próximo durante todo o contrato." },
          ].map((s) => <Card key={s.t} icon={s.icon} t={s.t} d={s.d} />)}
        </div>
      </Section>

      {/* LGPD */}
      <Section id="lgpd" eyebrow="Proteção de dados" title={<>Cobrança feita exclusivamente <span className="text-gradient">dentro da LGPD</span></>} intro="Os dados dos seus clientes são tratados com responsabilidade em todas as etapas. Recuperar crédito não pode colocar a sua empresa em risco.">
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lgpd.map((s) => <Card key={s.t} icon={s.icon} t={s.t} d={s.d} tone="surface" />)}
        </div>
      </Section>

      {/* Processo */}
      <Section tone="surface" eyebrow="Metodologia" title={<>Processo simples e eficaz <span className="text-gradient">em 3 passos</span></>}>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t}>
              <div className="font-display text-5xl font-extrabold text-gradient">0{i + 1}</div>
              <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Perguntas frequentes */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-20">
        <h2 className="text-center text-3xl font-bold">Perguntas frequentes</h2>
        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <h3>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold">
                  {f.q}<ChevronDown className={`size-5 shrink-0 text-primary transition ${open === i ? "rotate-180" : ""}`} />
                </button>
              </h3>
              {/* Resposta sempre no HTML (o Google lê); só o visual é recolhido. */}
              <p className={`px-5 pb-5 text-sm text-muted-foreground ${open === i ? "" : "hidden"}`}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="relative scroll-mt-20 bg-hero">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Contato</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Fale com um <span className="text-gradient">especialista</span></h2>
            <p className="mt-4 max-w-md text-muted-foreground">Descubra quanto da sua carteira é possível recuperar. Respondemos em até 1 dia útil.</p>
            <ul className="mt-8 grid gap-4 text-sm">
              <li>
                <WhatsAppLink location="contato" className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 font-bold ${waButton}`}>
                  <MessageCircle className="size-5" /> WhatsApp {COMPANY.whatsappLabel}
                </WhatsAppLink>
              </li>
              {COMPANY.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} onClick={() => track("phone_click", { location: "contato" })} className="inline-flex items-center gap-2 font-semibold hover:text-primary"><Phone className="size-4 text-primary" />{p}</a>
                </li>
              ))}
              <li className="inline-flex items-center gap-2 text-muted-foreground"><MapPin className="size-4 text-primary" />Sede no {COMPANY.address}, atendimento em todo o país</li>
              <li className="inline-flex items-center gap-2 text-muted-foreground"><Car className="size-4 text-primary" />Equipe de visita externa em todo o território nacional</li>
            </ul>
          </div>
          {/* No celular o formulário vem primeiro: é a conversão principal. */}
          <div className="order-first lg:order-none">
            <LeadForm id="form" title="Solicite uma análise gratuita" />
          </div>
        </div>
      </section>

      <SiteFooter />

      <WhatsAppFloat show={scrolled && !formVisible} />
    </main>
  );
}
