/* ============================================================
   PROPOSTA COMERCIAL — NÁGILA BORGES ARTE
   ------------------------------------------------------------
   De: Kaiquy Damasio → Para: Nágila Borges
   Planos: Biosite (R$ 40) · Portfólio (R$ 97) · Combo (R$ 130)
   Os previews abrem os sites DELELA: /biosite/ e /portfolio/
   ============================================================ */

const CONFIG = {
  /* --- Seus dados (quem vende o serviço) --- */
  nome: "Kaiquy Damasio",
  foto: "artes/kaiquy.jpg",
  whatsapp: "5562996008155",        // seu WhatsApp (só números, com DDI + DDD)
  instagram: "",                    // ex.: "kaiquydamasio" (vazio esconde o botão)

  /* --- Dados do cliente (cabeçalho em formato de carta: "Para:") --- */
  cliente: {
    nome: "Nágila Borges",
    foto: "artes/cliente-nagila.webp"
  },

  mensagemGeral: "Olá! Vi a proposta de sites e quero conversar. 🎨",

  /* ============================================================
     OS PLANOS (valores, mensagens e o preview de cada um)
     ============================================================ */
  planos: [
    {
      id: "biosite",
      nome: "Biosite",
      preco: 40,
      resumo: "Página de links estilo linktree: portfólio, produtos e WhatsApp num só lugar bonito.",
      entrega: "Entrega imediata",
      mensagem: "Olá! Quero fechar o Biosite (R$ 40) 🎨",
      previews: [
        { rotulo: "Biosite", url: "../biosite/index.html", largura: 520 }
      ],
      destaque: false
    },
    {
      id: "portfolio",
      nome: "Portfólio",
      preco: 97,
      resumo: "Seu portfólio em formato de site: as páginas do seu PDF viram um site igualzinho, no celular e no computador.",
      entrega: "Entrega imediata",
      mensagem: "Olá! Quero fechar o Portfólio (R$ 97) 🎨",
      previews: [
        { rotulo: "Portfólio", url: "../portfolio/index.html", largura: 0 }
      ],
      destaque: false
    },
    {
      id: "combo",
      nome: "Combo completo",
      preco: 130,
      resumo: "Os dois juntos, com a mesma identidade visual: o portfólio para mostrar e o biosite para espalhar.",
      entrega: "Entrega imediata",
      mensagem: "Olá! Quero fechar o Combo completo (R$ 130) 🎨✨",
      previews: [
        { rotulo: "Portfólio", url: "../portfolio/index.html", largura: 0 },
        { rotulo: "Biosite", url: "../biosite/index.html", largura: 520 }
      ],
      destaque: true
    }
  ]
};
