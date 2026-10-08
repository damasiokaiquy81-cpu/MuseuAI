/* ============================================================
   MUSEUAI — ARMAZENAMENTO DAS AVALIAÇÕES
   ------------------------------------------------------------
   Funciona em dois modos, escolhidos em js/config.js:

   • MODO LOCAL (padrão): avaliações salvas no navegador de quem
     avaliou (localStorage). Ótimo para testar e usar o site já.

   • MODO ONLINE: se você preencher CONFIG.supabase com url e
     anonKey, as avaliações de todos os visitantes ficam salvas
     num banco de dados gratuito (Supabase) — o dono vê tudo.
   ============================================================ */

const CHAVE_LOCAL = "museuai_avaliacoes";

const Store = {
  modo: (CONFIG.supabase && CONFIG.supabase.url && CONFIG.supabase.anonKey)
    ? "online"
    : "local",

  /* --- Carrega todas as avaliações --- */
  async carregar() {
    if (this.modo === "online") {
      const url = `${CONFIG.supabase.url}/rest/v1/${CONFIG.supabase.tabela}?select=*&order=criado_em.desc&limit=1000`;
      const resposta = await fetch(url, {
        headers: {
          apikey: CONFIG.supabase.anonKey,
          Authorization: `Bearer ${CONFIG.supabase.anonKey}`
        }
      });
      if (!resposta.ok) throw new Error("Falha ao carregar avaliações: " + resposta.status);
      const dados = await resposta.json();
      // Normaliza para o mesmo formato do modo local
      return dados.map((r) => ({
        obra: r.obra,
        nota: Number(r.nota),
        nome: r.nome || "",
        comentario: r.comentario || "",
        data: r.criado_em || ""
      }));
    }
    // Modo local
    try { return JSON.parse(localStorage.getItem(CHAVE_LOCAL)) || []; }
    catch { return []; }
  },

  /* --- Salva uma avaliação nova --- */
  async salvar(avaliacao) {
    if (this.modo === "online") {
      const url = `${CONFIG.supabase.url}/rest/v1/${CONFIG.supabase.tabela}`;
      const resposta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: CONFIG.supabase.anonKey,
          Authorization: `Bearer ${CONFIG.supabase.anonKey}`,
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          obra: avaliacao.obra,
          nota: avaliacao.nota,
          nome: avaliacao.nome,
          comentario: avaliacao.comentario,
          criado_em: avaliacao.data
        })
      });
      if (!resposta.ok) throw new Error("Falha ao salvar avaliação: " + resposta.status);
      return;
    }
    // Modo local
    const lista = await this.carregar();
    lista.push(avaliacao);
    localStorage.setItem(CHAVE_LOCAL, JSON.stringify(lista));
  }
};
