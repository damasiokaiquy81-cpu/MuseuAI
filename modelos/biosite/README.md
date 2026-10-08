# ✨ Biosite MuseuAI — página de links (estilo linktree)

Página única com a bio do artista e botões para WhatsApp, redes sociais
e a galeria. Mesma identidade visual do site principal: tema escuro com
dourado, fonte Playfair Display e o avatar emoldurado como um quadro.

Não precisa instalar nada: é HTML + CSS + JavaScript puro.

---

## ▶️ Como abrir

Dê dois cliques em `index.html`, ou (com o servidor da raiz ligado)
acesse `http://localhost:8000/modelos/biosite/`.

---

## ✏️ Como editar — `js/config.js`

| Campo | O que é |
|---|---|
| `nome` | Nome do artista (título grande) |
| `handle` | O @ que aparece na plaquinha — ex.: `@maria.arte` |
| `frase` | Frase curta de bio |
| `status` | Plaqueta de status — ex.: "Aceitando encomendas" (vazio = esconde) |
| `foto` | Sua foto — coloque o arquivo na pasta `artes/` (jpg/png/svg) |
| `whatsapp` | **Só números, com DDI + DDD** — ex.: `5511999999999` |
| `mensagemWhatsapp` | Mensagem que chega quando alguém clica no botão |
| `sitePrincipal` | Link da galeria publicada (ex.: `https://seusite.com`) |

### A lista de links

```js
{
  titulo: "Chamar no WhatsApp",
  subtitulo: "Orçamentos e encomendas",   // opcional
  url: "WHATSAPP",                        // "WHATSAPP" gera o link do WhatsApp
  icone: "whatsapp",                      // whatsapp | instagram | youtube | email
                                          // | galeria | tiktok | pin | link
  destaque: true                          // opcional → botão dourado
}
```

Para adicionar um link novo: copie um bloco, cole na lista e edite.
Para remover: apague o bloco. Salve e recarregue a página. Pronto!

---

## 💡 Extras

- A plaquinha do **@** e o botão do rodapé **copiam o link da página**
  (igual linktree) — para espalhar na bio do Instagram e afins.
- O botão do WhatsApp fica verde automaticamente (ícone `whatsapp`).
- O primeiro link com `destaque: true` fica dourado — use o mais
  importante (normalmente a galeria).

## 🚀 Como publicar de graça

Arraste esta pasta em [app.netlify.com/drop](https://app.netlify.com/drop)
ou importe na [Vercel](https://vercel.com). Depois troque
`sitePrincipal` no config pela URL publicada da galeria. 🎨
