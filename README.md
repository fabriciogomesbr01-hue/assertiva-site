# Site principal Assertiva (assertivarc.com.br)

Home institucional da Assertiva Recuperação de Crédito, recriada a partir do site anterior (Next.js da DNS Consulting)
com foco em SEO e conversão. Mesma base técnica da landing page (lp.assertivarc.com.br).

## Publicação

GitHub Pages: cada envio para o `main` roda `.github/workflows/deploy.yml` (typecheck, testes, build e deploy).
O domínio vem de `public/CNAME`. Na Zona de DNS da Locaweb, `assertivarc.com.br` aponta (registro A) para os IPs do
GitHub Pages e `www` é um CNAME para `fabriciogomesbr01-hue.github.io`. Os e-mails (MX) continuam na Locaweb.

## Configuração

Dados da empresa, telefones, WhatsApp, e-mails de lead, GTM e URL do site: `src/lib/company.ts`.
O formulário usa o mesmo Google Apps Script da landing page (`scripts/google-apps-script.gs`).
