/* ============================================================
   MUSEUAI — SUAS OBRAS
   ------------------------------------------------------------
   👉 Para adicionar uma obra nova:
      1. Copie a imagem para a pasta artes/ (jpg, png, webp ou svg)
      2. Adicione um objeto aqui embaixo seguindo o modelo:

   {
     id: "nome-unico-sem-espacos",   // usado no link da obra
     titulo: "Nome da Obra",
     arquivo: "artes/sua-imagem.jpg",
     ano: 2026,
     tecnica: "Óleo sobre tela",     // ou Acrílica, Aquarela, Digital...
     descricao: "Um parágrafo curto sobre a obra.",
     largura: 800,                   // largura da imagem em px
     altura: 1000                    // altura da imagem em px
   },

   💡 "largura" e "altura" ajudam o site a preparar o espaço
      do quadro antes de a imagem carregar (sem pulos no layout).
   ============================================================ */

const ARTES = [
  {
    id: "aurora",
    titulo: "Aurora",
    arquivo: "artes/aurora.svg",
    ano: 2026,
    tecnica: "Arte digital",
    descricao: "O instante exato em que a noite desiste e o dia acende — " +
               "um sol nasce entre montanhas e banha tudo de dourado.",
    largura: 800, altura: 1000
  },
  {
    id: "mare",
    titulo: "Maré",
    arquivo: "artes/mare.svg",
    ano: 2026,
    tecnica: "Arte digital",
    descricao: "Camadas de onda sobre onda, do azul-raso ao azul-fundo. " +
               "Feita para quem sente o mar até em terra firme.",
    largura: 1000, altura: 800
  },
  {
    id: "cerrado",
    titulo: "Cerrado em chamas suaves",
    arquivo: "artes/cerrado.svg",
    ano: 2025,
    tecnica: "Arte digital",
    descricao: "O pôr do sol do interior: terra vermelha, árvores tortas " +
               "e um céu que parece pegar fogo sem queimar ninguém.",
    largura: 800, altura: 1000
  },
  {
    id: "noturno",
    titulo: "Noturno nº 1",
    arquivo: "artes/noturno.svg",
    ano: 2025,
    tecnica: "Arte digital",
    descricao: "Uma noite parada, lua cheia e um lago que guarda todas " +
               "as estrelas. Feita para quartos com janela grande.",
    largura: 800, altura: 800
  },
  {
    id: "floresta",
    titulo: "Floresta em camadas",
    arquivo: "artes/floresta.svg",
    ano: 2025,
    tecnica: "Arte digital",
    descricao: "Fileiras de pinheiros se perdendo na neblina — quanto " +
               "mais fundo você olha, mais verde escuro aparece.",
    largura: 1000, altura: 800
  },
  {
    id: "bauhaus",
    titulo: "Estudo geométrico",
    arquivo: "artes/bauhaus.svg",
    ano: 2026,
    tecnica: "Arte digital",
    descricao: "Círculo, arco e barra: um exercício de forma e cor na " +
               "tradição das vanguardas — pura alegria organizada.",
    largura: 800, altura: 1000
  },
  {
    id: "dunas",
    titulo: "Dunas ao meio-dia",
    arquivo: "artes/dunas.svg",
    ano: 2024,
    tecnica: "Arte digital",
    descricao: "Ondas de areia quente dobrando sobre si mesmas. " +
               "Dá até para sentir o sol batendo na tela.",
    largura: 1000, altura: 1000
  },
  {
    id: "chuva",
    titulo: "Chuva de verão",
    arquivo: "artes/chuva.svg",
    ano: 2024,
    tecnica: "Arte digital",
    descricao: "Vidro embaçado, linhas de chuva e um ponto vermelho " +
               "esperando o céu passar — a calma depois do temporal.",
    largura: 800, altura: 1000
  }
];
