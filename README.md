# Site principal Assertiva (assertivarc.com.br)

Home institucional da Assertiva Recuperação de Crédito, recriada a partir do site anterior (Next.js da DNS Consulting)
com foco em SEO e conversão. Mesma base técnica da landing page (lp.assertivarc.com.br).

## Publicação na Locaweb (hospedagem Windows / IIS)

1. `npm install` e `npm run build`: gera o site estático em `dist/client`.
2. Faça backup da pasta `web` atual da hospedagem (Arquivos e FTP no painel da Locaweb).
3. Envie todo o conteúdo de `dist/client` para a pasta `web`, incluindo `web.config`.
4. Depois que o SSL voltar a funcionar, ative a regra "Forcar HTTPS" no `web.config` (instruções no próprio arquivo).

## Configuração

Dados da empresa, telefones, WhatsApp, e-mails de lead, GTM e URL do site: `src/lib/company.ts`.
O formulário usa o mesmo Google Apps Script da landing page (`scripts/google-apps-script.gs`).
