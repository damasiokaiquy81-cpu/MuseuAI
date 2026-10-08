/* ============================================================
   MUSEUAI — LÓGICA DO BIOSITE (vanilla JS, sem dependências)
   Renderiza os links do config.js, copia o link da página e
   cuida das mensagens flutuantes.
   ============================================================ */

const $ = (sel) => document.querySelector(sel);

function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
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

function linkWhatsapp(mensagem) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
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

/* Link desta página (o biosite inteiro) */
function linkDaPagina() {
  return location.href.split("#")[0];
}

/* ---------------- render ---------------- */

function renderTopo() {
  document.title = `${CONFIG.nome} — links e contato`;

  $("#foto").src = CONFIG.foto;
  $("#nome").textContent = CONFIG.nome;
  $("#frase").textContent = CONFIG.frase;
  $("#handle").textContent = CONFIG.handle;

  const status = $("#status");
  if (CONFIG.status) {
    $("#status-texto").textContent = CONFIG.status;
    status.style.display = "";
  } else {
    status.style.display = "none";
  }

  $("#marca").textContent = CONFIG.nomeMarca || "MuseuAI";
  $("#ano").textContent = new Date().getFullYear();
}

function renderLinks() {
  $("#links").innerHTML = CONFIG.links.map((link, i) => {
    const url = link.url === "WHATSAPP" ? linkWhatsapp(CONFIG.mensagemWhatsapp || "Olá! Quero pedir um orçamento.") : link.url;
    const icone = ICONE[link.icone] || ICONE.link;
    const classes = ["link"];
    if (link.icone === "whatsapp") classes.push("whatsapp");
    if (link.destaque) classes.push("destaque");

    return `
    <a class="${classes.join(" ")}" href="${esc(url)}" target="_blank" rel="noopener"
       style="animation-delay:${i * 80}ms">
      <span class="icone">${icone}</span>
      <span class="textos">
        <strong>${esc(link.titulo)}</strong>
        ${link.subtitulo ? `<small>${esc(link.subtitulo)}</small>` : ""}
      </span>
      <span class="seta" aria-hidden="true">→</span>
    </a>`;
  }).join("");
}

/* ---------------- interações ---------------- */

$("#compartilhar").addEventListener("click", async () => {
  const ok = await copiarTexto(linkDaPagina());
  toast(ok ? "✅ Link copiado! Cole na bio, no status ou onde quiser." : "Não consegui copiar 😕");
});

$("#handle").addEventListener("click", async () => {
  const ok = await copiarTexto(linkDaPagina());
  toast(ok ? "✅ Link copiado! Envie para quem quiser." : "Não consegui copiar 😕");
});

/* ---------------- início ---------------- */

renderTopo();
renderLinks();
