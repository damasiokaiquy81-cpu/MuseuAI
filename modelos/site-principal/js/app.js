/* ============================================================
   MUSEUAI — LÓGICA DO SITE (vanilla JS, sem dependências)
   ------------------------------------------------------------
   Aqui acontece tudo: render das seções, navegação por link
   (#/obra/id), botão do WhatsApp, copiar link e avaliações.
   ============================================================ */

const $ = (sel) => document.querySelector(sel);

/* ---------------- utilitários ---------------- */

function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function fmtNota(n) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function fmtData(iso) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  } catch { return ""; }
}

function plural(n, um, varios) { return n === 1 ? um : varios; }

/* Estrelas de exibição (aceita média quebrada, ex.: 4.5) */
function estrelasHTML(media, tamanho = "") {
  const pct = Math.max(0, Math.min(100, (media / 5) * 100));
  return `<span class="estrelas ${tamanho}" aria-label="Nota ${fmtNota(media)} de 5">
    <span class="estrelas-trilha" aria-hidden="true">★★★★★</span>
    <span class="estrelas-preenchido" aria-hidden="true" style="width:${pct}%">★★★★★</span>
  </span>`;
}

/* Aviso flutuante (toast) */
let toastTimer = null;
function toast(mensagem) {
  const el = $("#toast");
  el.textContent = mensagem;
  el.classList.add("mostrar");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("mostrar"), 3200);
}

/* ---------------- estado global ---------------- */

let AVALIACOES = [];
let obraAbertaId = null;
let notaSelecionada = 0;
let jaAnimou = false; // animação de entrada só na primeira renderização

/* ---------------- métricas ---------------- */

function metricasPorObra() {
  const mapa = {};
  for (const a of AVALIACOES) {
    if (!mapa[a.obra]) mapa[a.obra] = { soma: 0, total: 0 };
    mapa[a.obra].soma += Number(a.nota) || 0;
    mapa[a.obra].total++;
  }
  for (const k in mapa) mapa[k].media = mapa[k].soma / mapa[k].total;
  return mapa;
}

function metricasGerais() {
  const total = AVALIACOES.length;
  const media = total ? AVALIACOES.reduce((s, a) => s + (Number(a.nota) || 0), 0) / total : 0;
  return { total, media };
}

/* ---------------- links ---------------- */

function linkWhatsapp(mensagem) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

function mensagemParaObra(obra) {
  return (CONFIG.mensagemObra || "Olá! Quero pedir um orçamento da obra {obra}.").replaceAll("{obra}", obra.titulo);
}

/* Link copiável que abre o site direto na obra */
function linkDaObra(obra) {
  return location.href.split("#")[0] + "#/obra/" + obra.id;
}

async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // Plano B para navegadores mais antigos
    const ta = document.createElement("textarea");
    ta.value = texto;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

/* Ícones (SVG inline) */
const ICONE_WHATS = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.7 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5v-.5L9.4 7.2c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2-.7 3.2a10.4 10.4 0 0 0 3.8 4.6c1.6 1 2.9 1.5 3.9 1.6.7.1 1.4-.1 1.9-.5.4-.4.7-1 .8-1.5v-.5l-.7-.3Z"/></svg>`;
const ICONE_LINK = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>`;
const ICONE_COMPARTILHAR = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>`;

/* ---------------- render: hero ---------------- */

function renderHero() {
  $("#artista-nome").textContent = CONFIG.nomeArtista;
  $("#artista-funcao").textContent = CONFIG.funcao;
  $("#artista-bio").textContent = CONFIG.bio;
  $("#artista-foto").src = CONFIG.fotoArtista;

  const msgGeral = CONFIG.mensagemGeral || "Olá! Vi sua galeria online e quero conversar.";
  $("#hero-wa").innerHTML = `${ICONE_WHATS} Pedir orçamento`;
  $("#hero-wa").href = linkWhatsapp(msgGeral);
  $("#topo-wa").href = linkWhatsapp(msgGeral);
  $("#rodape-wa").innerHTML = `${ICONE_WHATS} Chamar no WhatsApp`;
  $("#rodape-wa").href = linkWhatsapp(msgGeral);
  $("#rodape-marca").textContent = CONFIG.nomeSite;
  $("#rodape-ano").textContent = new Date().getFullYear();
  const infos = [CONFIG.email, CONFIG.instagram ? "@" + CONFIG.instagram : "", CONFIG.cidade].filter(Boolean);
  $("#rodape-info").textContent = infos.join("  ·  ");
}

/* Média geral exibida no início */
function renderHeroStats() {
  const { total, media } = metricasGerais();
  const el = $("#hero-stats");
  if (total > 0) {
    el.innerHTML = `
      <span class="hero-num">${fmtNota(media)}</span>
      <span class="hero-stat-meio">
        ${estrelasHTML(media, "grande")}
        <small>média geral das ${ARTES.length} obras</small>
      </span>
      <span class="hero-sep" aria-hidden="true"></span>
      <span class="hero-stat-total"><strong>${total}</strong> ${plural(total, "avaliação recebida", "avaliações recebidas")}</span>`;
  } else {
    el.innerHTML = `
      <span class="hero-num">—</span>
      <span class="hero-stat-meio">
        <small>Ainda sem avaliações.<br>Seja a primeira pessoa a avaliar uma obra! ✨</small>
      </span>`;
  }
}

/* ---------------- render: cards ---------------- */

function notaDoCard(id, mapa) {
  const m = mapa[id];
  if (m) {
    return `${estrelasHTML(m.media, "mini")} <span class="conta">${fmtNota(m.media)} (${m.total})</span>`;
  }
  return `<span class="sem-nota">sem avaliações ainda</span>`;
}

function cardObraHTML(obra, selo = "") {
  const mapa = metricasPorObra();
  return `
  <article class="obra ${jaAnimou ? "visivel" : "revela"}" data-obra="${obra.id}" tabindex="0" role="button" aria-label="Ver a obra ${esc(obra.titulo)}">
    ${selo ? `<span class="selo">${selo}</span>` : ""}
    <div class="moldura">
      <div class="passpartout">
        <img src="${obra.arquivo}" alt="${esc(obra.titulo)}" loading="lazy">
      </div>
    </div>
    <div class="placa placa-obra">
      <strong>${esc(obra.titulo)}</strong>
      <span>${esc(obra.tecnica)} · ${esc(obra.ano)}</span>
      <div class="obra-nota">${notaDoCard(obra.id, mapa)}</div>
    </div>
  </article>`;
}

/* Destaques: as 3 mais bem avaliadas; sem avaliações → 3 aleatórias */
function renderDestaques() {
  const mapa = metricasPorObra();
  const avaliadas = ARTES.filter((a) => mapa[a.id]).sort((a, b) => mapa[b.id].media - mapa[a.id].media);
  const semAvaliacoes = avaliadas.length === 0;

  const resto = embaralhar(ARTES.filter((a) => !avaliadas.some((x) => x.id === a.id)));
  const lista = [...avaliadas, ...resto].slice(0, 3);

  $("#destaques-sub").textContent = semAvaliacoes
    ? "Ainda não temos avaliações por aqui — então deixo três escolhidas para você conhecer. Avalie a sua favorita!"
    : "As obras que mais encantaram quem já visitou o museu.";

  $("#grade-destaques").innerHTML = lista.map((obra, i) => {
    const selo = mapa[obra.id]
      ? `★ Nº ${i + 1} · mais bem avaliada`
      : "★ em destaque";
    return cardObraHTML(obra, semAvaliacoes || !mapa[obra.id] ? "★ em destaque" : selo);
  }).join("");
}

function renderGaleria() {
  $("#grade-galeria").innerHTML = ARTES.map((obra) => cardObraHTML(obra)).join("");
}

function renderTudo() {
  renderHeroStats();
  renderDestaques();
  renderGaleria();
  observarReveals();
}

/* ---------------- sala do museu (detalhe da obra) ---------------- */

function listaAvaliacoesHTML(id) {
  const lista = AVALIACOES.filter((a) => a.obra === id)
    .sort((a, b) => new Date(b.data) - new Date(a.data));
  if (lista.length === 0) {
    return `<p class="sem-nota">Nenhuma avaliação ainda. Sua pode ser a primeira! 💛</p>`;
  }
  return lista.map((av) => `
    <div class="avaliacao">
      <div class="avaliacao-topo">
        <span class="avaliacao-nome">${esc(av.nome || "Visitante")}</span>
        <span class="avaliacao-data">${fmtData(av.data)}</span>
      </div>
      ${estrelasHTML(av.nota, "mini")}
      ${av.comentario ? `<p class="avaliacao-texto">${esc(av.comentario)}</p>` : ""}
    </div>`).join("");
}

function salaHTML(obra) {
  const mapa = metricasPorObra();
  const m = mapa[obra.id];
  const indice = ARTES.indexOf(obra) + 1;
  const podeCompartilhar = typeof navigator.share === "function";

  return `
  <div class="sala-grid">
    <div class="sala-quadro">
      <div class="moldura">
        <div class="passpartout"><img src="${obra.arquivo}" alt="${esc(obra.titulo)}"></div>
      </div>
      <div class="placa placa-obra">
        <strong>${esc(obra.titulo)}</strong>
        <span>${esc(obra.tecnica)} · ${esc(obra.ano)}</span>
      </div>
    </div>

    <div class="sala-painel">
      <p class="overline">Sala ${String(indice).padStart(2, "0")} de ${String(ARTES.length).padStart(2, "0")}</p>
      <h3 class="sala-titulo">${esc(obra.titulo)}</h3>
      <div class="obra-nota obra-nota-esq">
        ${m
          ? `${estrelasHTML(m.media)} <span class="conta">${fmtNota(m.media)} · ${m.total} ${plural(m.total, "avaliação", "avaliações")}</span>`
          : `<span class="sem-nota">Esta obra ainda não tem avaliações — seja quem inaugura!</span>`}
      </div>
      <p class="sala-desc">${esc(obra.descricao)}</p>

      <div class="sala-acoes">
        <a class="btn btn-verde" target="_blank" rel="noopener"
           href="${linkWhatsapp(mensagemParaObra(obra))}">
          ${ICONE_WHATS} Pedir orçamento no WhatsApp
        </a>
        <div class="linha-acoes">
          <button class="btn btn-fantasma" data-copiar="${obra.id}">${ICONE_LINK} Copiar link desta arte</button>
          ${podeCompartilhar ? `<button class="btn btn-fantasma" data-compartilhar="${obra.id}">${ICONE_COMPARTILHAR} Compartilhar</button>` : ""}
        </div>
        <p class="sala-dica">O link copiado abre o site direto nesta obra — serve para divulgar, pedir avaliação ou compartilhar com um cliente.</p>
      </div>

      <hr class="divisor">

      <div class="avaliar">
        <h4>Avalie esta obra</h4>
        <div class="estrelas-input" id="estrelas-input" role="radiogroup" aria-label="Sua nota de 1 a 5 estrelas">
          ${[1, 2, 3, 4, 5].map((v) =>
            `<button type="button" data-valor="${v}" aria-label="${v} estrela${v > 1 ? "s" : ""}">★</button>`).join("")}
        </div>
        <input id="avaliacao-nome" maxlength="60" placeholder="Seu nome (opcional)">
        <textarea id="avaliacao-comentario" maxlength="600" placeholder="O que você achou da obra? (opcional)"></textarea>
        <button class="btn btn-ouro" id="avaliacao-enviar">Enviar avaliação</button>
        ${Store.modo === "local"
          ? `<p class="aviso-modo">Modo local: as avaliações ficam salvas neste navegador. Ative o modo online no <em>js/config.js</em> para reunir as de todos os visitantes (veja o README).</p>`
          : ""}
      </div>

      <div class="avaliacoes-lista" id="avaliacoes-lista">${listaAvaliacoesHTML(obra.id)}</div>
    </div>
  </div>`;
}

function exibirObra(id) {
  const obra = ARTES.find((a) => a.id === id);
  if (!obra) {
    toast("Obra não encontrada 🤔");
    fecharSala();
    return;
  }
  obraAbertaId = obra.id;
  notaSelecionada = 0;
  $("#sala-conteudo").innerHTML = salaHTML(obra);
  $("#sala").hidden = false;
  document.body.classList.add("travado");
  ligarEstrelasInput();
}

function fecharSala() {
  if ($("#sala").hidden) return;
  $("#sala").hidden = true;
  $("#sala-conteudo").innerHTML = "";
  obraAbertaId = null;
  document.body.classList.remove("travado");
  // limpa o hash sem criar histórico novo
  if (location.hash) {
    history.replaceState(null, "", location.pathname + location.search);
  }
}

/* Navegação por hash: #/obra/<id> abre a obra direto */
function rotear() {
  const m = location.hash.match(/^#\/obra\/([^#?]+)/);
  if (m) exibirObra(decodeURIComponent(m[1]));
  else fecharSala();
}
window.addEventListener("hashchange", rotear);

function abrirObra(id) {
  if (obraAbertaId === id) return;
  location.hash = "/obra/" + encodeURIComponent(id);
}

/* ---------------- avaliações ---------------- */

function ligarEstrelasInput() {
  const botões = [...document.querySelectorAll("#estrelas-input button")];
  const acender = (ate) => botões.forEach((b, i) => b.classList.toggle("acesa", i < ate));

  botões.forEach((b, i) => {
    b.addEventListener("mouseenter", () => acender(i + 1));
    b.addEventListener("focus", () => acender(i + 1));
    b.addEventListener("mouseleave", () => acender(notaSelecionada));
    b.addEventListener("blur", () => acender(notaSelecionada));
    b.addEventListener("click", () => {
      notaSelecionada = i + 1;
      acender(notaSelecionada);
    });
  });
  acender(0);
}

async function enviarAvaliacao() {
  if (!obraAbertaId) return;
  if (!notaSelecionada) {
    toast("Escolha de 1 a 5 estrelas antes de enviar ⭐");
    return;
  }
  const botao = $("#avaliacao-enviar");
  botao.disabled = true;
  botao.textContent = "Enviando…";

  const avaliacao = {
    obra: obraAbertaId,
    nota: notaSelecionada,
    nome: ($("#avaliacao-nome")?.value || "").trim(),
    comentario: ($("#avaliacao-comentario")?.value || "").trim(),
    data: new Date().toISOString()
  };

  try {
    await Store.salvar(avaliacao);
    AVALIACOES = await Store.carregar();
    jaAnimou = true;

    const painel = $(".sala-caixa");
    const scrollAnterior = painel ? painel.scrollTop : 0;

    // Atualiza a obra aberta, os cards, os destaques e a média geral
    notaSelecionada = 0; // zera as estrelas para uma possível nova avaliação
    if (obraAbertaId) $("#sala-conteudo").innerHTML = salaHTML(ARTES.find((a) => a.id === obraAbertaId));
    painel.scrollTop = scrollAnterior;
    ligarEstrelasInput();
    renderTudo();

    toast("Avaliação enviada — muito obrigado! 💛");
    const lista = $("#avaliacoes-lista");
    if (lista) lista.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (erro) {
    console.error(erro);
    toast("Não consegui enviar sua avaliação 😕 Tente novamente.");
  } finally {
    const btn = $("#avaliacao-enviar");
    if (btn) { btn.disabled = false; btn.textContent = "Enviar avaliação"; }
  }
}

/* ---------------- copiar / compartilhar ---------------- */

async function copiarLinkDaObra(id) {
  const obra = ARTES.find((a) => a.id === id);
  if (!obra) return;
  const ok = await copiarTexto(linkDaObra(obra));
  toast(ok ? "✅ Link copiado! Cole onde quiser para abrir direto nesta arte." : "Não consegui copiar 😕");
}

async function compartilharObra(id) {
  const obra = ARTES.find((a) => a.id === id);
  if (!obra) return;
  try {
    await navigator.share({
      title: `${obra.titulo} — ${CONFIG.nomeSite}`,
      text: `Veja a obra "${obra.titulo}"`,
      url: linkDaObra(obra)
    });
  } catch { /* usuário cancelou */ }
}

/* ---------------- interações globais ---------------- */

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-fechar]")) { fecharSala(); return; }

  const copiar = e.target.closest("[data-copiar]");
  if (copiar) { copiarLinkDaObra(copiar.dataset.copiar); return; }

  const compartilhar = e.target.closest("[data-compartilhar]");
  if (compartilhar) { compartilharObra(compartilhar.dataset.compartilhar); return; }

  const enviar = e.target.closest("#avaliacao-enviar");
  if (enviar) { enviarAvaliacao(); return; }

  const card = e.target.closest("[data-obra]");
  if (card) { abrirObra(card.dataset.obra); }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharSala();
  if (e.key === "Enter" || e.key === " ") {
    const card = e.target.closest?.("[data-obra]");
    if (card && !$("#sala").contains(e.target)) {
      e.preventDefault();
      abrirObra(card.dataset.obra);
    }
  }
});

/* ---------------- animação de entrada ---------------- */

let observador = null;
function observarReveals() {
  const elementos = [...document.querySelectorAll(".revela")];
  if (elementos.length === 0) return;
  if (!observador) {
    observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      }
    }, { threshold: 0.12 });
  }
  elementos.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    observador.observe(el);
  });
  jaAnimou = true;
}

/* ---------------- início ---------------- */

(async function iniciar() {
  renderHero();
  renderTudo();
  rotear();
  try {
    AVALIACOES = await Store.carregar();
  } catch (erro) {
    console.error(erro);
    AVALIACOES = [];
    toast("Não consegui carregar as avaliações 😕");
  }
  renderTudo();
})();
