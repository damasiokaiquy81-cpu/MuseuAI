/* ============================================================
   MUSEUAI — CONFIGURAÇÕES DO SITE
   ------------------------------------------------------------
   👉 É AQUI que você personaliza tudo: seu nome, WhatsApp,
      bio, mensagens e (se quiser) avaliações online.
   ============================================================ */

const CONFIG = {
  /* --- Nome do site e do artista --- */
  nomeSite: "MuseuAI",
  nomeArtista: "Seu Nome Aqui",          // 👈 TROQUE pelo seu nome
  funcao: "Pintora · Ilustradora · Artista digital", // 👈 suas áreas
  cidade: "Sua cidade, Brasil",

  /* --- Sua apresentação (parte "quem sou eu") --- */
  bio: "Eu crio arte que mistura técnica e sentimento. Cada peça " +
       "desta galeria é única e feita à mão — algumas estão à venda, " +
       "outras posso reproduzir sob encomenda no tamanho e nas cores " +
       "que você quiser. Escolha uma obra, avalie e me chame no WhatsApp!",

  fotoArtista: "artes/artista.svg",      // troque por uma foto sua (jpg/png)

  /* --- WhatsApp: só números, com DDI + DDD (ex.: 5511999999999) --- */
  whatsapp: "5511999999999",             // 👈 TROQUE pelo seu número

  /* --- Mensagens automáticas do WhatsApp --- */
  mensagemObra: 'Olá! Vi a obra "{obra}" na sua galeria e quero pedir um orçamento. Pode me passar os valores?',
  mensagemGeral: "Olá! Vi sua galeria online e quero conversar sobre um trabalho.",

  email: "seuemail@email.com",           // aparece no rodapé
  instagram: "",                         // ex.: "seu.perfil" (opcional)

  /* ============================================================
     MODO ONLINE (opcional) — avaliações compartilhadas
     ------------------------------------------------------------
     Por padrão o site roda em MODO LOCAL: as avaliações ficam
     salvas no navegador de quem avaliou (ótimo para testar).

     Para reunir as avaliações de TODOS os visitantes em um só
     lugar (de graça), crie uma conta no Supabase (supabase.com),
     rode o SQL do README.md e cole as chaves aqui:

     supabase: {
       url: "https://xxxxx.supabase.co",
       anonKey: "eyJhbGciOi...",
       tabela: "avaliacoes"
     },
     ============================================================ */
  supabase: {
    url: "",        // 👈 cole a URL do projeto (Project Settings → API)
    anonKey: "",    // 👈 cole a chave anônima (anon public key)
    tabela: "avaliacoes"
  }
};
