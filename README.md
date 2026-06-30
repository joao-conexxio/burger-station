# 🍔 Burger Station — Link de Pagamento (Demo Conexxio)

Aplicação de **link de pagamento** que recebe os itens de um pedido pela URL e exibe
uma tela de checkout completa (resumo, frete, formas de pagamento e confirmação).

Faz parte de uma **demonstração da Conexxio**: um bot na **Blip** usa IA para simular
um atendente da hamburgueria fictícia *Burger Station*. O bot monta o pedido no WhatsApp
e, ao final, envia este link já preenchido com os itens, o número do pedido e o frete —
fechando o fluxo de ponta a ponta com um pagamento funcional.

🔗 **Produção:** https://joao-conexxio.github.io/burger-station/

---

## ✨ Funcionalidades

- **Pedido via URL** — itens, número do pedido e frete chegam por query params (gerados pelo bot).
- **Frete dinâmico** — calculado na etapa de coleta do bot e enviado em `?shipping=` / `?frete=`.
- **Entrega ou Retirada** — toggle que recalcula o total (retirada = frete grátis).
- **Formas de pagamento** — Pix, Cartão de Crédito, Cartão de Débito e Dinheiro.
- **Tela de sucesso** — exibe número do pedido, total pago e prazo de preparo (30–45 min).
- **Responsivo** — layout mobile-first, ideal para abrir direto do WhatsApp.

---

## 🔌 Contrato da URL (integração com o bot)

A tela de checkout usa **HashRouter**, então a rota fica após o `#`:

```
https://joao-conexxio.github.io/burger-station/#/checkout?order={id}&shipping={frete}&products={json}
```

### Parâmetros

| Parâmetro  | Obrigatório | Descrição                                                                 |
|------------|-------------|---------------------------------------------------------------------------|
| `products` | Sim         | Array JSON dos itens, **URL-encodado** (ver formato abaixo).              |
| `order`    | Não         | ID de 6 dígitos do pedido (gerado pelo `registrar_pedido` do bot).        |
| `shipping` | Não         | Taxa de entrega (ex.: `7.90` ou `7,90`). Alias: `frete`. Padrão: `6.00`.  |

> Na opção **Retirada**, o frete é sempre grátis, independente do `shipping` recebido.

### Formato dos itens (`products`)

```json
[
  { "id": "1", "name": "Cheddar Bacon", "price": 32.90, "quantity": 2 },
  { "id": "2", "name": "Batata Frita G", "price": 18.90, "quantity": 1 }
]
```

- `id`, `name`, `price` e `quantity` são obrigatórios.
- `unit` é **opcional** (ex.: `"kg"`); quando ausente, exibe "cada".

### Exemplo de link pronto

```
https://joao-conexxio.github.io/burger-station/#/checkout?order=482913&shipping=7.90&products=%5B%7B%22id%22%3A%221%22%2C%22name%22%3A%22Cheddar%20Bacon%22%2C%22price%22%3A32.9%2C%22quantity%22%3A2%7D%5D
```

No fluxo da Blip, gere o `products` com URL-encode do JSON dos itens antes de concatenar à URL.

---

## 🛠️ Tecnologias

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/) (HashRouter)
- [lucide-react](https://lucide.dev/) (ícones)

---

## 📁 Estrutura principal

```
src/
├── pages/
│   ├── Index.tsx        # Landing/demo + documentação do link
│   ├── Checkout.tsx     # Tela de checkout (lê a URL, calcula total, tela de sucesso)
│   └── NotFound.tsx
├── components/
│   ├── CartItem.tsx     # Item do pedido (quantidade, subtotal)
│   ├── OrderSummary.tsx # Resumo + toggle Entrega/Retirada
│   └── PaymentGateway.tsx # Formas de pagamento
└── ...
```

---

## 🚀 Rodando localmente

Requer **Node.js** e **npm** ([instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# Instalar dependências
npm i

# Servidor de desenvolvimento (http://localhost:8080)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## 📦 Deploy

Hospedado no **GitHub Pages** via GitHub Actions.

- Todo push na branch `main` dispara o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
  que faz o build e publica o conteúdo de `dist/` na branch `gh-pages`.
- O `base` do Vite ([`vite.config.ts`](vite.config.ts)) e o `homepage` ([`package.json`](package.json))
  apontam para `/burger-station` — devem bater com o nome do repositório.

> Ao renomear o repositório, atualize `base` (Vite) e `homepage` (package.json),
> ou os assets do GitHub Pages quebram (404).
