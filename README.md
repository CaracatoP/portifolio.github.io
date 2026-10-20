# portifolio.github.io

Portfólio de João Gabriel Caracato. React 19, TypeScript, Vite, Tailwind CSS 4 e Motion; componentes no padrão shadcn/ui (cva + tailwind-merge) e efeitos inspirados em Magic UI e Aceternity.

## Rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173/portifolio.github.io/`. `npm run build` gera `dist/`.

## Deploy

`.github/workflows/deploy.yml` builda e publica no GitHub Pages a cada push na `main`. O Pages do repositório precisa estar com a fonte **GitHub Actions** (Settings → Pages → Build and deployment).

## Estrutura

- `src/data.ts`: todo o conteúdo (projetos, stack, processo, contato).
- `src/components/`: seções da página; `ui/` tem os primitivos, `mockups/` as interfaces ilustrativas dos produtos (dados fictícios).
- `public/`: avatar, favicon e os redirecionamentos de `portifolio.html` e `contato.html`.

## Movimento

As animações respeitam `prefers-reduced-motion`. Para ver tudo mesmo com o sistema pedindo menos movimento, abra com `?motion=on`.
