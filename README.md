# 🖼️ MuseuAI — fábrica de sites para artistas

Sistema de modelos para criar sites de portfólio rápido: cada artista
ganha uma cópia de um modelo em `clientes/`, edita os textos e publica.

```
MuseuAI/
├── modelos/
│   ├── site-principal/   → site galeria em formato de museu
│   │                       (obras, orçamento por WhatsApp, avaliações,
│   │                        destaques e link copiável de cada arte)
│   └── biosite/          → página de links estilo linktree
│                          (bio, WhatsApp, redes sociais, galeria)
├── propostas/            → site de proposta comercial para enviar aos
│                          clientes (planos: Biosite R$ 40, Site Museu
│                          R$ 97, Combo R$ 130 — fecha pelo WhatsApp)
├── clientes/             → um site por cliente
│   ├── nagila-borges-arte/ → 1º cliente modelado (3 projetos):
│   │   ├── biosite/       → links dela (portfólio, produtos, WhatsApp)
│   │   ├── portfolio/     → PDF dela convertido em site (idêntico)
│   │   └── proposta/      → proposta comercial com preview e funil
│   └── teste/            → pasta de teste (vazia)
└── servidor.js           → servidor local só para testar (opcional)
```

---

## 📦 Como criar o site de um cliente novo

1. **Copie o modelo desejado** (pasta `site-principal` ou `biosite`) para
   dentro de `clientes/` renomeando pelo nome do cliente, ex.:
   `clientes/maria-arte`
2. **Edite os arquivos do cliente:**
   - `js/config.js` → nome, WhatsApp, bio, mensagens
   - `js/data.js` (só no site-principal) → obras do cliente
3. **Teste local:** rode `node servidor.js` na pasta MuseuAI e abra
   `http://localhost:8000/clientes/maria-arte/`
4. **Publique:** arraste a pasta do cliente no
   [Netlify Drop](https://app.netlify.com/drop) ou importe na Vercel.

## ▶️ Teste rápido dos modelos

```
node servidor.js
```

- Site principal → http://localhost:8000/modelos/site-principal/
- Biosite        → http://localhost:8000/modelos/biosite/

(É só um servidorzinho de teste — para publicar, é tudo estático, sem Node.)

Cada modelo tem o próprio `README.md` com o manual completo.
