/* ============================================================
   MUSEUAI — PROPOSTA COMERCIAL (versão simples)
   ------------------------------------------------------------
   👉 Edite AQUI seus dados e os planos/preços.

   Cada plano tem "previews": as páginas que abrem dentro do
   site quando o cliente clica nos botões. Um plano pode ter
   1 ou 2 previews (o Combo tem os dois sites).
   Quando publicar os sites do cliente, troque as urls pelas
   publicadas, ex.: url: "https://site-do-cliente.netlify.app"
   ============================================================ */

const CONFIG = {
  /* --- Seus dados (quem vende o serviço) --- */
  nome: "Kaiquy Damasio",           // fixado — seu nome em toda proposta padrão
  foto: "artes/kaiquy.jpg",         // sua foto (também fixada)
  whatsapp: "5562996008155",        // seu WhatsApp (só números, com DDI + DDD)
  instagram: "",                    // ex.: "seu.perfil" (vazio esconde o botão)

  /* --- Dados do cliente (cabeçalho em formato de carta: "Para:") ---
     Ao criar a proposta de um cliente novo, troque aqui 👇 */
  cliente: {
    nome: "Nome do Cliente",
    foto: "artes/cliente.svg"       // troque pela foto do cliente (jpg/png)
  },

  mensagemGeral: "Olá! Vi sua proposta de sites para artistas e quero conversar. 🎨",

  /* ============================================================
     OS PLANOS (valores, mensagens e o preview de cada um)
     ============================================================ */
  planos: [
    {
      id: "biosite",
      nome: "Biosite",
      preco: 40,
      resumo: "Página de links estilo linktree: WhatsApp, redes e portfólio num só lugar bonito.",
      entrega: "Entrega imediata",
      mensagem: "Olá! Quero fechar o Biosite (R$ 40) 🎨",
      previews: [
        { rotulo: "Biosite", url: "../modelos/biosite/index.html", largura: 520 }
      ],
      destaque: false
    },
    {
      id: "site",
      nome: "Site Museu",
      preco: 97,
      resumo: "Galeria em formato de museu com orçamento pelo WhatsApp e avaliações em cada obra.",
      entrega: "Entrega imediata",
      mensagem: "Olá! Quero fechar o Site Museu (R$ 97) 🖼️",
      previews: [
        { rotulo: "Site Museu", url: "../modelos/site-principal/index.html", largura: 0 }
      ],
      destaque: false
    },
    {
      id: "combo",
      nome: "Combo completo",
      preco: 130,
      resumo: "Os dois juntos, com a mesma identidade visual: o museu para vender e o biosite para espalhar.",
      entrega: "Entrega imediata",
      mensagem: "Olá! Quero fechar o Combo completo (R$ 130) 🖼️✨",
      previews: [
        { rotulo: "Site Museu", url: "../modelos/site-principal/index.html", largura: 0 },
        { rotulo: "Biosite", url: "../modelos/biosite/index.html", largura: 520 }
      ],
      destaque: true
    }
  ]
};
