# NUESTRA Platform - Project Plan

## Overview

The NUESTRA Platform is a multi-brand ecosystem consisting of three main products:

1. **nuestra.com** - Streetwear Shop (already built)
2. **sport.nuestra.com** - Youth/Kids Football Equipment
3. **{fanpage}.nuestra.com** - Multi-tenant Fan Pages Platform

---

## Architecture Decision: Monorepo with Turborepo

```
nuestra-platform/
├── apps/
│   ├── streetwear/          → nuestra.com
│   ├── sport/               → sport.nuestra.com
│   └── fanpages/            → *.nuestra.com (multi-tenant)
├── packages/
│   ├── ui/                  → Shared UI components
│   ├── database/            → Supabase client, types, queries
│   ├── config/              → Shared configurations
│   └── utils/               → Shared utilities
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## Product 1: Streetwear Shop (nuestra.com)

### Status: ✅ Built

### Features
- Home page with hero, featured products, brand story
- Shop page with filters and product grid
- Product detail page with size selection
- Responsive design for desktop and mobile

### Tech Stack
- Next.js 16
- TypeScript
- Tailwind CSS 4
- Oswald + Barlow fonts

---

## Product 2: Youth/Kids Football Equipment (sport.nuestra.com)

### Status: 🔲 To Be Built

### Target Audience
- Kids and youth football players
- Parents buying for children
- Youth football clubs/academies
- Coaches from Radical Football conferences

### Design Direction
- Brighter, more playful than streetwear
- Kid-friendly but not childish
- Focus on quality and durability messaging
- Team/club ordering capabilities

### Key Features
- Product catalog (jerseys, shorts, socks, balls, training gear)
- Size guides for kids
- Team/bulk ordering
- Club customization options
- Parent/coach accounts

### Branding
- Tagline: "The Game is Ours"
- Logo: N angled (geometric, sport-focused)
- Colors: Black/white base + lime, red, blue accents

---

## Product 3: Fan Pages Platform (*.nuestra.com)

### Status: 🔲 To Be Built

### Concept
Multi-tenant platform where football players, clubs, and personalities get their own branded fan page under the NUESTRA domain.

### Examples
- `bihorul.nuestra.com` - Bihorul FC Fan Page
- `ascensio.nuestra.com` - Marco Ascensio Fan Page
- `{any}.nuestra.com` - Any player/club

### Key Requirements

#### Multi-tenancy
- Single codebase serves unlimited fan pages
- Each fan page = one "organization" in database
- Adding new fan page = database insert only (no deploy)

#### Customization Per Fan Page
- Colors, fonts, logos (database-driven)
- Enable/disable features (shop, forum, news, etc.)
- Layout templates (selectable)
- Custom CSS for advanced styling
- Component overrides for premium clients

#### Data Isolation
- Each organization has completely separate:
  - Members/users
  - Products
  - Posts/news
  - Orders
  - All content
- Enforced via Supabase Row Level Security (RLS)

#### Authentication
- **Isolated Sessions**: Each subdomain has its own session
- User must log in separately on each fan page
- Shared Supabase Auth backend, but isolated cookies
- Seamless join flow when existing user registers on new fan page

---

## Authentication Flow

### Core Principles
1. **One Supabase Auth account per email** (global)
2. **Isolated sessions per subdomain** (feels like separate sites)
3. **Separate profile/membership per organization**
4. **Email verification happens once globally**

### User Journeys

#### Journey 1: New User Registers on Bihorul
```
1. User visits bihorul.nuestra.com/register
2. Enters email: john@example.com (NEW)
3. Creates Supabase Auth account
4. Receives verification email
5. Clicks verification link
6. Profile created for Bihorul organization
7. Logged in on bihorul.nuestra.com
8. Cookie set for bihorul.nuestra.com only
```

#### Journey 2: Same User Visits Ascensio (Different Fan Page)
```
1. User visits ascensio.nuestra.com
2. NOT logged in (isolated session - no cookie for this subdomain)
3. User clicks "Register" or "Login"
4. Enters email: john@example.com
5. System detects: email exists in Supabase Auth
6. Sends magic link / verification code to email
7. User clicks link / enters code
8. Profile created for Ascensio organization
9. Logged in on ascensio.nuestra.com
10. Cookie set for ascensio.nuestra.com only
```

#### Journey 3: User Returns to Bihorul
```
1. User visits bihorul.nuestra.com
2. Cookie exists for this subdomain
3. ✅ Automatically logged in
4. Sees their Bihorul profile/content
```

### Why Email Verification Once (Globally)?

**Recommended: Verify email once, skip on subsequent fan pages**

Reasons:
- Better UX (less friction for users joining multiple fan pages)
- Email is already proven to belong to user
- The "join" action still requires user intent
- Session isolation already makes sites feel separate
- Per-fanpage verification adds friction without security benefit

Flow for already-verified user:
```
1. User (verified) tries to register on new fan page
2. System: "You already have a NUESTRA account"
3. User enters password OR receives magic link
4. Automatically joined to new fan page
5. No email verification needed (already verified)
```

---

## Database Schema Overview

### Core Tables

| Table | Purpose |
|-------|---------|
| `organizations` | Fan pages (slug, name, settings) |
| `organization_settings` | Theme, colors, features per org |
| `profiles` | User profiles (linked to Supabase Auth) |
| `organization_members` | User ↔ Organization membership |
| `products` | Products (scoped by organization) |
| `posts` | News/blog posts (scoped by organization) |
| `orders` | E-commerce orders (scoped by organization) |
| `pages` | Custom CMS pages (scoped by organization) |

### Row Level Security (RLS)
- All tables with `organization_id` have RLS policies
- Users can only access data from organizations they belong to
- Public content (published posts, active products) visible to all
- Admin actions restricted to org admins/owners

---

## Development Phases

### Phase 1: Monorepo Setup (Week 1)
- [ ] Initialize Turborepo structure
- [ ] Migrate existing streetwear app
- [ ] Set up shared packages (ui, database, config)
- [ ] Configure build and deployment pipeline

### Phase 2: Supabase Setup (Week 1-2)
- [ ] Create production Supabase project
- [ ] Implement database schema
- [ ] Configure Row Level Security policies
- [ ] Set up authentication with isolated sessions
- [ ] Create database types and client package

### Phase 3: Fan Pages Platform - Core (Week 2-4)
- [ ] Multi-tenant middleware (subdomain routing)
- [ ] Organization context provider
- [ ] Authentication flows (register, login, join)
- [ ] Theme system (database-driven)
- [ ] Basic layouts and templates

### Phase 4: Fan Pages Platform - Features (Week 4-6)
- [ ] News/posts system
- [ ] Product catalog (per organization)
- [ ] Member management
- [ ] Admin dashboard per organization
- [ ] Feature flags system

### Phase 5: Sport Site (Week 6-8)
- [ ] Design system (kid-friendly theme)
- [ ] Product catalog
- [ ] Team/bulk ordering
- [ ] Size guides
- [ ] Club accounts

### Phase 6: Polish & Launch (Week 8-10)
- [ ] Performance optimization
- [ ] SEO setup
- [ ] Analytics integration
- [ ] Documentation
- [ ] Production deployment

---

## Hosting & Deployment

### Domain Configuration
```
nuestra.com           → Netlify (streetwear app)
sport.nuestra.com     → Netlify (sport app)
*.nuestra.com         → Netlify (fanpages app - wildcard)
```

### DNS Setup (Cloudflare or Registrar)
```
Type    Name    Value                       
─────────────────────────────────────────────
A       @       75.2.60.5                   (Netlify)
A       @       99.83.190.102               (Netlify)
CNAME   www     nuestra-streetwear.netlify.app
CNAME   sport   nuestra-sport.netlify.app
CNAME   *       nuestra-fanpages.netlify.app  (wildcard)
```

### Environment Variables
```env
# Shared across all apps
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# App-specific
NEXT_PUBLIC_BASE_DOMAIN=nuestra.com
NEXT_PUBLIC_APP_TYPE=streetwear|sport|fanpages
```

---

## Success Metrics

### Technical
- Page load time < 2s
- Lighthouse score > 90
- Zero downtime deployments
- Database query time < 100ms

### Business
- Time to add new fan page < 5 minutes
- Theme customization without developer
- 99.9% uptime
- Support for 100+ concurrent fan pages

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Supabase rate limits | Implement caching, optimize queries |
| Subdomain SSL | Use Netlify's automatic wildcard SSL |
| Database size growth | Implement data archival strategy |
| Complex customization requests | Define clear customization tiers |
| Multi-tenant data leaks | Strict RLS policies, security audits |

---

## Open Questions

1. **Payment processing**: Stripe per organization or unified?
2. **Media storage**: Supabase Storage or external CDN?
3. **Email service**: Supabase email or external (Resend, SendGrid)?
4. **Analytics**: Shared or per-organization dashboards?
5. **Custom domains**: Support `bihorul.com` → `bihorul.nuestra.com`?

---

## Next Steps

1. Review and approve this plan
2. Purchase `nuestra.com` domain (if not owned)
3. Create production Supabase project
4. Initialize monorepo structure
5. Begin Phase 1 development

