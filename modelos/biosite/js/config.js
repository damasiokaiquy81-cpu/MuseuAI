/* ============================================================
   MUSEUAI — BIOSITE (estilo linktree)
   ------------------------------------------------------------
   👉 É AQUI que você edita tudo: nome, @, frase, foto, status
      e a lista de links (WhatsApp, Instagram, etc.).

   Na lista de links, cada item aceita:
     titulo:    texto do botão
     subtitulo: texto pequeno (opcional)
     url:       endereço — use "WHATSAPP" para gerar o link
                do WhatsApp automaticamente
     icone:     "whatsapp" | "instagram" | "youtube" | "email"
                | "galeria" | "tiktok" | "pin" | "link"
     destaque:  true → botão dourado (o principal da página)
   ============================================================ */

const CONFIG = {
  nome: "Seu Nome Aqui",            // 👈 TROQUE
  handle: "@seuperfil",             // 👈 TROQUE (aparece na plaquinha)
  frase: "Transformo ideias em arte. Encomendas abertas — chama no WhatsApp 👇",

  status: "Aceitando encomendas",   // "" (vazio) para esconder a plaquinha de status

  foto: "artes/artista.svg",        // troque por uma foto sua (jpg/png) na pasta artes/

  /* WhatsApp: só números, com DDI + DDD (ex.: 5511999999999) */
  whatsapp: "5511999999999",        // 👈 TROQUE
  mensagemWhatsapp: "Olá! Vim pelo seu biosite e quero pedir um orçamento. 🎨",

  /* Link do site principal (a galeria museu).
     Deixe assim para funcionar junto dos modelos, ou troque pela
     URL publicada quando você subir o site (ex.: "https://seusite.com"). */
  sitePrincipal: "../site-principal/index.html",

  links: [
    {
      titulo: "Minha galeria completa",
      subtitulo: "Portfólio em formato de museu",
      url: "../site-principal/index.html",   // 👈 troque pela URL publicada
      icone: "galeria",
      destaque: true
    },
    {
      titulo: "Chamar no WhatsApp",
      subtitulo: "Orçamentos e encomendas",
      url: "WHATSAPP",
      icone: "whatsapp"
    },
    {
      titulo: "Instagram",
      subtitulo: "Bastidores e novidades",
      url: "https://instagram.com/seuperfil",  // 👈 TROQUE
      icone: "instagram"
    },
    {
      titulo: "YouTube",
      subtitulo: "Processos e vídeos das obras",
      url: "#",                                // 👈 TROQUE (ou apague o link)
      icone: "youtube"
    },
    {
      titulo: "E-mail",
      subtitulo: "",
      url: "mailto:seuemail@email.com",        // 👈 TROQUE
      icone: "email"
    }
  ]
};
