# 💼 Proposta — site para vender seus serviços (versão simples)

Página direta: no topo, **sua foto redondinha + seu nome** e os botões do
**WhatsApp** e **Instagram**. Abaixo, os **3 planos com os valores**.
O botão de cada plano abre o **site correspondente em preview, aqui
dentro da própria página**, com botão de fechar o negócio no WhatsApp.

| Plano | Valor |
|---|---|
| Biosite (página de links) | **R$ 40** |
| Site Museu (galeria completa) | **R$ 97** |
| Combo: os dois juntos | **R$ 130** |

## ▶️ Como abrir

Dê dois cliques em `index.html`, ou (com o servidor da raiz ligado)
acesse `http://localhost:8000/propostas/`.

> 💡 Os previews funcionam melhor pelo servidor (`node servidor.js`)
> ou já publicado na internet — alguns navegadores bloqueiam iframes
> de arquivo local.

## ✏️ Como editar — `js/config.js`

- `nome`, `foto`, `whatsapp`, `instagram` → **seus** dados (bloco "De:" da carta)
- `cliente` → `nome` e `foto` da pessoa que vai receber a proposta (bloco "Para:")
  👉 é aqui que você molda para cada cliente
- `planos` → para cada plano: `preco`, `resumo`, `entrega`, `mensagem`
  (que chega no seu WhatsApp) e **`previews`** (os sites que abrem ao clicar).

Quando publicar o biosite/site do cliente, troque o `url` do preview pela URL
publicada, ex.: `url: "https://site-do-cliente.netlify.app"`.

## 📤 Como enviar para o cliente

Publique **a pasta MuseuAI inteira** no [Netlify Drop](https://app.netlify.com/drop)
(os previews dependem dos modelos estarem juntos) e mande o link do
`/propostas/` para o cliente.
