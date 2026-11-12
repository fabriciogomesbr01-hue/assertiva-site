import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

import { LEAD_KEY, LEADS_WHATSAPP, newLeadId, sendLead, toE164, track, waLink, type Lead } from "@/lib/company";

export const SEGMENTS = [
  "Cooperativas e bancos",
  "Seguros e consórcio",
  "Consignado",
  "Cartões",
  "Varejo e maquinário",
  "Imobiliário, IPTU e IPVA",
  "Pesados e agrícola",
];

// Formulário de lead: envia por e-mail/planilha (sendLead) e leva para /obrigado, onde a conversão é registrada.
export function LeadForm({ id, title = "Análise gratuita da sua carteira" }: { id?: string; title?: string }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [fallbackMsg, setFallbackMsg] = useState("");
  // Antes do JavaScript carregar, o navegador enviaria o formulário "cru" (dados na URL, nada enviado).
  // O botão só é liberado quando o envio por JavaScript está pronto.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("_honey")) return; // Campo invisível preenchido: robô de spam.
    setStatus("sending");
    const msg = `Olá! Quero uma análise gratuita da minha carteira.\nNome: ${f.get("nome")}\nEmpresa: ${f.get("empresa")}\nTelefone: ${f.get("telefone")}\nSegmento: ${f.get("segmento")}\nValor em atraso: ${f.get("volume")}`;
    try {
      await sendLead({
        Nome: String(f.get("nome")),
        Empresa: String(f.get("empresa")),
        Telefone: String(f.get("telefone")),
        Segmento: String(f.get("segmento")),
        "Valor em atraso": String(f.get("volume")),
        Origem: window.location.href,
      });
    } catch {
      // Nenhum serviço de envio respondeu: oferece o WhatsApp com os dados, para o contato não se perder.
      setFallbackMsg(msg);
      setStatus("error");
      track("form_error");
      return;
    }
    // O evento de conversão (generate_lead) é disparado pela página /obrigado, a partir destes dados.
    const lead: Lead = {
      id: newLeadId(),
      nome: String(f.get("nome") || "").split(" ")[0] ?? "",
      segmento: String(f.get("segmento")),
      volume: String(f.get("volume")),
      phone: toE164(String(f.get("telefone") || "")),
      msg,
      tracked: false,
    };
    try {
      sessionStorage.setItem(LEAD_KEY, JSON.stringify(lead));
    } catch {
      // Sem sessionStorage: a página de obrigado não consegue confirmar o envio nem disparar a conversão.
    }
    navigate({ to: "/obrigado" });
  };

  const field =
    "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";
  return (
    <form id={id} onSubmit={onSubmit} method="post" action="#contato" className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-glow sm:p-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">Sem custo e sem compromisso. Resposta de um especialista em até 1 dia útil.</p>
      <div className="mt-6 grid gap-3">
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <label className="sr-only" htmlFor="nome">Seu nome</label>
        <input required id="nome" name="nome" autoComplete="name" placeholder="Seu nome" className={field} />
        <label className="sr-only" htmlFor="empresa">Empresa ou cooperativa</label>
        <input required id="empresa" name="empresa" autoComplete="organization" placeholder="Empresa / Cooperativa" className={field} />
        <label className="sr-only" htmlFor="telefone">WhatsApp com DDD</label>
        <input required id="telefone" name="telefone" type="tel" inputMode="tel" autoComplete="tel" minLength={10} placeholder="WhatsApp com DDD" className={field} />
        <label className="sr-only" htmlFor="segmento">Segmento</label>
        <select required id="segmento" name="segmento" defaultValue="" className={field}>
          <option value="" disabled>Segmento</option>
          {SEGMENTS.map((s) => <option key={s}>{s}</option>)}
          <option>Outro</option>
        </select>
        <label className="sr-only" htmlFor="volume">Valor em atraso na carteira</label>
        <select required id="volume" name="volume" defaultValue="" className={field}>
          <option value="" disabled>Valor em atraso na carteira</option>
          <option>Até R$ 100 mil</option>
          <option>R$ 100 mil a R$ 500 mil</option>
          <option>R$ 500 mil a R$ 2 milhões</option>
          <option>Acima de R$ 2 milhões</option>
        </select>
        <button type="submit" disabled={!ready || status === "sending"} className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-display text-base font-bold text-primary-foreground transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70">
          {status === "sending" ? "Enviando..." : <>Quero recuperar meu crédito <ArrowRight className="size-5" /></>}
        </button>
        {status === "error" && (
          <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm">
            <p className="text-foreground">Não conseguimos enviar pelo formulário agora. Envie seus dados pelo WhatsApp que respondemos por lá:</p>
            <a href={waLink(fallbackMsg, LEADS_WHATSAPP)} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { location: "form_error" })}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground hover:brightness-110">
              <MessageCircle className="size-5" /> Enviar pelo WhatsApp
            </a>
          </div>
        )}
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 shrink-0 text-primary" />
        <span>
          Ao enviar, você concorda em ser contatado pela Assertiva sobre esta solicitação. Seus dados são tratados conforme a LGPD e a nossa{" "}
          <Link to="/politica-de-privacidade" className="underline hover:text-foreground">Política de Privacidade</Link>.
        </span>
      </p>
    </form>
  );
}
