# NUESTRA Platform

A multi-brand e-commerce ecosystem for streetwear and youth football equipment.

## Overview

NUESTRA Platform consists of three main products:

- **nuestra.com** - Streetwear Shop
- **sport.nuestra.com** - Youth/Kids Football Equipment
- **{fanpage}.nuestra.com** - Multi-tenant Fan Pages Platform

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Oswald + Barlow (optimized with `next/font`)

## Features

- Responsive design for desktop and mobile
- Product catalog with filters and search
- Product detail pages with size selection
- Sport section for youth football equipment
- Modern UI with fast refresh development

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
web-nuestra/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop pages
│   ├── product/[id]/      # Product detail pages
│   └── sport/             # Sport section
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── sport/             # Sport-specific components
├── lib/                   # Utilities and data
│   ├── products.ts
│   └── sportProducts.ts
├── public/                # Static assets
│   └── images/            # Product and brand images
└── docs/                  # Documentation
```

## Roadmap

- [x] Streetwear shop (nuestra.com)
- [ ] Sport equipment shop (sport.nuestra.com)
- [ ] Multi-tenant fan pages platform
- [ ] Supabase integration
- [ ] Payment processing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Contact

For questions or feedback, please open an issue on GitHub.
