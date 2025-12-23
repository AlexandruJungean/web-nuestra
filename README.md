# Website Nuestra

A Next.js application bootstrapped with `create-next-app`.

This repository contains the source code for the web-nuestra Next.js project. The app uses the App Router (app directory) and the `next/font` system for optimized font loading.

## Features

- Next.js (App Router)
- Automatic font optimization with `next/font`
- Fast refresh and zero-config development

## Requirements

- Node.js 18 or newer
- npm, yarn, pnpm, or bun (any package manager of your choice)

## Getting started

1. Install dependencies:

```bash
# npm
npm install

# or yarn
yarn

# or pnpm
pnpm install

# or bun
bun install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser to see the app. The App Router's root page is at `app/page.js` — editing that file will update the page automatically.

## Available scripts

- `dev` - run the development server
- `build` - create an optimized production build
- `start` - start the production server (after `build`)
- `lint` - run ESLint (if configured)

Run scripts via your package manager, for example `npm run build`.

## Fonts

This project uses `next/font` to optimize font loading (for example Geist or other fonts). See Next.js docs for customizing fonts: https://nextjs.org/docs/app/building-your-application/optimizing/fonts

## Environment variables

If your project needs environment variables, add them to a `.env.local` file and ensure they are listed in `.gitignore`. Example:

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Deployment

The easiest way to deploy this Next.js app is to use Vercel: https://vercel.com/new. See Next.js deployment docs for other options: https://nextjs.org/docs/app/building-your-application/deploying

## Project structure (typical)

- `app/` - Next.js App Router pages and layout
- `public/` - static files served at the root
- `styles/` - global and component styles
- `package.json` - scripts and dependencies

Adjust the structure notes to match this repository as needed.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch
3. Open a pull request with a clear description of changes

## Resources

- Next.js docs: https://nextjs.org/docs
- Create Next App: https://github.com/vercel/next.js/tree/canary/packages/create-next-app

## License

Specify a license for the project by adding a `LICENSE` file. If you don't have one yet, consider using MIT or another license that fits your needs.


(Original README content: This project was bootstrapped with `create-next-app`. Updated to add clearer setup instructions and structure.)
