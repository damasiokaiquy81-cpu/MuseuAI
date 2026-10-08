/* Mini servidor local para testar o MuseuAI (não é necessário para publicar).
   Uso:  node servidor.js   →  http://localhost:8000/modelos/site-principal/  */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORTA = 8000;
const RAIZ = __dirname;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8"
};

http.createServer((req, res) => {
  const url = req.url.split("?")[0].split("#")[0];

  /* Endpoint temporário: recebe imagens renderizadas do PDF (usado na modelagem) */
  if (req.method === "POST" && url === "/_salvar") {
    let corpo = "";
    req.on("data", (pedaco) => { corpo += pedaco; });
    req.on("end", () => {
      try {
        const { nome, base64 } = JSON.parse(corpo);
        if (!/^[a-zA-Z0-9._-]+$/.test(nome)) throw new Error("nome inválido");
        const destino = path.join(RAIZ, "_renderados", nome);
        fs.mkdirSync(path.dirname(destino), { recursive: true });
        fs.writeFileSync(destino, Buffer.from(base64, "base64"));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, bytes: base64.length }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, erro: e.message }));
      }
    });
    return;
  }

  let caminho = decodeURIComponent(url);
  if (caminho.endsWith("/")) caminho += "index.html";
  if (caminho === "/") caminho = "/modelos/site-principal/index.html";
  const arquivo = path.join(RAIZ, caminho);

  if (!arquivo.startsWith(RAIZ)) {
    res.writeHead(403); res.end("Proibido"); return;
  }

  fs.readFile(arquivo, (erro, dados) => {
    if (erro) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 — não encontrado: " + caminho);
      return;
    }
    const tipo = TIPOS[path.extname(arquivo).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": tipo });
    res.end(dados);
  });
}).listen(PORTA, () => {
  console.log(`MuseuAI rodando:`);
  console.log(`  site principal → http://localhost:${PORTA}/modelos/site-principal/`);
  console.log(`  biosite        → http://localhost:${PORTA}/modelos/biosite/`);
});
