/* ============================================================
   MUSEUAI — LÓGICA DA PROPOSTA (vanilla JS, sem dependências)
   Renderiza o topo e os planos; o botão de cada plano abre um
   preview do site correspondente aqui dentro (iframe).
   ============================================================ */

const $ = (sel) => document.querySelector(sel);

function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function linkWhatsapp(mensagem) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

let jaViuPrevia = false; // o valor só aparece depois de ela ver um preview

const ICONE_WHATS = `<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.7 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.3-.5v-.5L9.4 7.2c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2-.7 3.2a10.4 10.4 0 0 0 3.8 4.6c1.6 1 2.9 1.5 3.9 1.6.7.1 1.4-.1 1.9-.5.4-.4.7-1 .8-1.5v-.5l-.7-.3Z"/></svg>`;
const ICONE_INSTA = `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>`;

/* ícones minimalistas (traço fino) */
const ICONE_TAG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.6 13.4 12 22l-8-8 8.6-8.6a2 2 0 0 1 1.4-.6H19a2 2 0 0 1 2 2v5.2c0 .5-.2 1-.4 1.4z"/><circle cx="16.5" cy="7.5" r="1.3"/></svg>`;
const ICONE_RELOGIO = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

/* ---------------- topo ---------------- */

function renderTopo() {
  // De: quem envia (você) · Para: o cliente
  $("#foto-de").src = CONFIG.foto;
  $("#nome-de").textContent = CONFIG.nome;
  $("#foto-para").src = (CONFIG.cliente && CONFIG.cliente.foto) || "artes/cliente.svg";
  $("#nome-para").textContent = (CONFIG.cliente && CONFIG.cliente.nome) || "Nome do Cliente";
  document.title = `Proposta comercial — ${(CONFIG.cliente && CONFIG.cliente.nome) || CONFIG.nome}`;
  $("#cliente-nome").textContent = (CONFIG.cliente && CONFIG.cliente.nome) || "você";

  $("#btn-zap").href = linkWhatsapp(CONFIG.mensagemGeral);
  $("#btn-zap").innerHTML = ICONE_WHATS;

  const insta = $("#btn-insta");
  if (CONFIG.instagram) {
    insta.href = "https://instagram.com/" + String(CONFIG.instagram).replace(/^@/, "");
    insta.innerHTML = ICONE_INSTA;
  } else {
    insta.remove();
  }
}

/* ---------------- planos ---------------- */

function renderPlanos() {
  $("#grade-planos").innerHTML = CONFIG.planos.map((p) => {
    // todos os botões de preview ficam visíveis desde o início
    const botoes = p.previews.map((pv, i) => `
      <button class="btn ${p.destaque && i === 0 ? "btn-ouro" : "btn-fantasma"}"
              data-preview="${p.id}" data-idx="${i}">
        Ver o ${esc(pv.rotulo)} ao vivo
      </button>`).join("");

    // depois de ver um preview: aparece o botão da proposta comercial
    const proposta = jaViuPrevia
      ? `<button class="btn btn-ouro" data-proposta="${p.id}">${ICONE_TAG} Quero este</button>`
      : "";

    return `
    <article class="plano ${p.destaque ? "destaque" : ""}">
      ${p.destaque ? `<span class="tag">Mais escolhido</span>` : ""}
      <h3>${esc(p.nome)}</h3>
      <p class="resumo">${esc(p.resumo)}</p>
      ${botoes}
      ${proposta}
    </article>`;
  }).join("");
}

/* ---------------- preview (iframe) ---------------- */

function abrirPreview(id, indice = 0) {
  const plano = CONFIG.planos.find((p) => p.id === id);
  if (!plano) return;
  const pv = plano.previews[indice] || plano.previews[0];

  $("#preview-nome").textContent = pv.rotulo;
  $("#preview-ctx").hidden = plano.previews.length <= 1;

  const moldura = $("#preview-frame");
  moldura.src = pv.url;
  moldura.style.width = pv.largura ? `min(100%, ${pv.largura}px)` : "100%";

  $("#preview").hidden = false;
  document.body.classList.add("travado");

  // depois de ver um preview, revela os outros botões + proposta nos cards
  if (!jaViuPrevia) { jaViuPrevia = true; renderPlanos(); }
}

function fecharPreview() {
  if ($("#preview").hidden) return;
  $("#preview").hidden = true;
  $("#preview-frame").src = "about:blank";
  document.body.classList.remove("travado");
}

/* ---------------- popup da proposta comercial ---------------- */

function abrirPopup(id) {
  const plano = CONFIG.planos.find((p) => p.id === id);
  if (!plano) return;

  $("#popup-conteudo").innerHTML = `
    <p class="overline">Proposta · ${esc(plano.nome)}</p>
    <h3 class="popup-titulo">${esc(plano.nome)}</h3>
    <p class="popup-resumo">${esc(plano.resumo)}</p>
    <div class="popup-preco"><span class="moeda">R$</span> ${plano.preco}</div>
    <span class="entrega">${ICONE_RELOGIO} ${esc(plano.entrega)}</span>
    <a class="btn btn-ouro" target="_blank" rel="noopener" href="${linkWhatsapp(plano.mensagem)}">
      ${ICONE_WHATS} Fechar pelo WhatsApp
    </a>
    <p class="popup-nota">A mensagem já vai pronta — é só enviar!</p>`;

  $("#popup").hidden = false;
  document.body.classList.add("travado");
}

function fecharPopup() {
  if ($("#popup").hidden) return;
  $("#popup").hidden = true;
  $("#popup-conteudo").innerHTML = "";
  document.body.classList.remove("travado");
}

/* ---------------- interações ---------------- */

document.addEventListener("click", (e) => {
  const botao = e.target.closest("[data-preview]");
  if (botao) { abrirPreview(botao.dataset.preview, Number(botao.dataset.idx || 0)); return; }

  if (e.target.closest("[data-fechar]")) { fecharPreview(); return; }

  const botaoProposta = e.target.closest("[data-proposta]");
  if (botaoProposta) { abrirPopup(botaoProposta.dataset.proposta); return; }

  if (e.target.closest("[data-fechar-popup]")) fecharPopup();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!$("#popup").hidden) fecharPopup();
  else fecharPreview();
});

/* ---------------- início ---------------- */

renderTopo();
renderPlanos();
