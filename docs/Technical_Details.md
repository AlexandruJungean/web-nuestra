# NUESTRA Platform - Technical Details

## Table of Contents
1. [Monorepo Structure](#monorepo-structure)
2. [Database Schema](#database-schema)
3. [Authentication System](#authentication-system)
4. [Multi-tenant Routing](#multi-tenant-routing)
5. [Theme System](#theme-system)
6. [Supabase Configuration](#supabase-configuration)
7. [Deployment Configuration](#deployment-configuration)

---

## Monorepo Structure

### Directory Layout

```
nuestra-platform/
├── apps/
│   ├── streetwear/                 # nuestra.com
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── shop/
│   │   │   └── product/[id]/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── sport/                      # sport.nuestra.com
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── fanpages/                   # *.nuestra.com (multi-tenant)
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx            # Landing/redirect
│       │   ├── org/
│       │   │   └── [slug]/         # Dynamic org routes
│       │   │       ├── layout.tsx  # Org-specific layout
│       │   │       ├── page.tsx    # Org home
│       │   │       ├── shop/
│       │   │       ├── news/
│       │   │       ├── login/
│       │   │       └── register/
│       │   └── admin/              # Super admin
│       ├── components/
│       │   ├── shared/             # Default components
│       │   └── overrides/          # Org-specific overrides
│       │       ├── bihorul/
│       │       └── ascensio/
│       ├── lib/
│       ├── middleware.ts
│       ├── next.config.ts
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── ui/                         # Shared UI components
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── database/                   # Supabase client & types
│   │   ├── src/
│   │   │   ├── client.ts           # Supabase client factory
│   │   │   ├── types.ts            # Generated types
│   │   │   ├── queries/
│   │   │   │   ├── organizations.ts
│   │   │   │   ├── profiles.ts
│   │   │   │   └── products.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                     # Shared configurations
│   │   ├── src/
│   │   │   ├── constants.ts
│   │   │   ├── fonts.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── utils/                      # Shared utilities
│       ├── src/
│       │   ├── formatters.ts
│       │   ├── validators.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── turbo.json
├── package.json
├── pnpm-workspace.yaml
└── .env.local
```

### Turborepo Configuration

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env.local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "type-check": {
      "dependsOn": ["^build"]
    }
  }
}
```

### Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Root Package.json

```json
{
  "name": "nuestra-platform",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "dev:streetwear": "turbo dev --filter=streetwear",
    "dev:sport": "turbo dev --filter=sport",
    "dev:fanpages": "turbo dev --filter=fanpages",
    "build": "turbo build",
    "lint": "turbo lint",
    "type-check": "turbo type-check",
    "db:generate": "pnpm --filter=database generate",
    "db:push": "pnpm --filter=database push"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.0.0"
  },
  "packageManager": "pnpm@8.0.0"
}
```

---

## Database Schema

### Complete SQL Schema

```sql
-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ORGANIZATIONS (Fan Pages)
-- ============================================
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,              -- "bihorul", "ascensio"
  name TEXT NOT NULL,                      -- "Bihorul FC Fan Page"
  description TEXT,
  custom_domain TEXT,                      -- Optional: "bihorul.com"
  plan TEXT DEFAULT 'basic',               -- "basic", "pro", "enterprise"
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast slug lookups
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_active ON organizations(is_active) WHERE is_active = true;

-- ============================================
-- ORGANIZATION SETTINGS (Theme & Features)
-- ============================================
CREATE TABLE organization_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID UNIQUE REFERENCES organizations(id) ON DELETE CASCADE,
  
  -- Branding
  logo_url TEXT,
  favicon_url TEXT,
  hero_image_url TEXT,
  
  -- Theme Colors
  primary_color TEXT DEFAULT '#722F37',
  secondary_color TEXT DEFAULT '#1a2a3a',
  accent_color TEXT DEFAULT '#ffffff',
  background_color TEXT DEFAULT '#0a0a0a',
  text_color TEXT DEFAULT '#ffffff',
  
  -- Typography
  heading_font TEXT DEFAULT 'Oswald',
  body_font TEXT DEFAULT 'Barlow',
  
  -- Features (JSON for flexibility)
  features JSONB DEFAULT '{
    "shop": true,
    "news": true,
    "gallery": true,
    "forum": false,
    "tickets": false,
    "membership_tiers": false,
    "newsletter": true,
    "comments": true,
    "likes": true
  }'::jsonb,
  
  -- Layout
  layout_type TEXT DEFAULT 'default',     -- "default", "magazine", "minimal", "sports"
  
  -- Custom CSS (for advanced customization)
  custom_css TEXT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Social Links
  social_links JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PROFILES (User Data)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  date_of_birth DATE,
  
  -- Global preferences
  preferred_language TEXT DEFAULT 'en',
  email_verified BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORGANIZATION MEMBERS (User ↔ Org Relationship)
-- ============================================
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  -- Role in this organization
  role TEXT DEFAULT 'member',              -- "owner", "admin", "moderator", "member"
  
  -- Org-specific profile data
  display_name TEXT,                       -- Can be different per org
  bio TEXT,
  
  -- Membership status
  status TEXT DEFAULT 'active',            -- "active", "suspended", "banned"
  
  -- Timestamps
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ,
  
  UNIQUE(user_id, organization_id)
);

-- Indexes for membership queries
CREATE INDEX idx_org_members_user ON organization_members(user_id);
CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_role ON organization_members(role);

-- ============================================
-- PRODUCTS
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  
  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2),          -- Original price for sales
  currency TEXT DEFAULT 'EUR',
  
  -- Images
  images JSONB DEFAULT '[]'::jsonb,        -- Array of image URLs
  
  -- Variants (sizes, colors)
  variants JSONB DEFAULT '[]'::jsonb,
  
  -- Inventory
  track_inventory BOOLEAN DEFAULT true,
  inventory_count INTEGER DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'draft',             -- "draft", "active", "archived"
  is_featured BOOLEAN DEFAULT false,
  
  -- Categorization
  category TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(organization_id, slug)
);

-- Indexes
CREATE INDEX idx_products_org ON products(organization_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);

-- ============================================
-- POSTS (News/Blog)
-- ============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id),
  
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  
  -- Media
  featured_image TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft',             -- "draft", "published", "archived"
  
  -- Timestamps
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Engagement
  view_count INTEGER DEFAULT 0,
  
  UNIQUE(organization_id, slug)
);

-- Indexes
CREATE INDEX idx_posts_org ON posts(organization_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published ON posts(published_at DESC) WHERE status = 'published';

-- ============================================
-- ORDERS
-- ============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  
  -- Order number (human readable)
  order_number TEXT NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'pending',           -- "pending", "confirmed", "shipped", "delivered", "cancelled"
  
  -- Amounts
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  
  -- Shipping
  shipping_address JSONB,
  billing_address JSONB,
  
  -- Payment
  payment_status TEXT DEFAULT 'pending',   -- "pending", "paid", "failed", "refunded"
  payment_method TEXT,
  payment_intent_id TEXT,                  -- Stripe payment intent
  
  -- Items
  items JSONB NOT NULL,                    -- Array of order items
  
  -- Notes
  customer_notes TEXT,
  internal_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(organization_id, order_number)
);

-- Indexes
CREATE INDEX idx_orders_org ON orders(organization_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- ============================================
-- PAGES (Custom CMS Pages)
-- ============================================
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  
  -- Block-based content (for flexibility)
  content JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  is_published BOOLEAN DEFAULT false,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(organization_id, slug)
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Organizations: Public read for active orgs
CREATE POLICY "Public can view active organizations"
ON organizations FOR SELECT
USING (is_active = true);

-- Organization Settings: Public read
CREATE POLICY "Public can view organization settings"
ON organization_settings FOR SELECT
USING (
  organization_id IN (SELECT id FROM organizations WHERE is_active = true)
);

-- Profiles: Users can read/update their own
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Organization Members: Complex policies
CREATE POLICY "Users can view their memberships"
ON organization_members FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Org admins can view all members"
ON organization_members FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

CREATE POLICY "Users can join organizations"
ON organization_members FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Products: Public read for active, admins can manage
CREATE POLICY "Public can view active products"
ON products FOR SELECT
USING (status = 'active');

CREATE POLICY "Org admins can manage products"
ON products FOR ALL
USING (
  organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- Posts: Public read for published, admins can manage
CREATE POLICY "Public can view published posts"
ON posts FOR SELECT
USING (status = 'published');

CREATE POLICY "Org admins can manage posts"
ON posts FOR ALL
USING (
  organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin', 'moderator')
  )
);

-- Orders: Users see their own, admins see all in org
CREATE POLICY "Users can view own orders"
ON orders FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Org admins can view all orders"
ON orders FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- Pages: Public read for published
CREATE POLICY "Public can view published pages"
ON pages FOR SELECT
USING (is_published = true);

CREATE POLICY "Org admins can manage pages"
ON pages FOR ALL
USING (
  organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  )
);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_organization_settings_updated_at
  BEFORE UPDATE ON organization_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create organization settings when org is created
CREATE OR REPLACE FUNCTION create_org_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO organization_settings (organization_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_org_settings_on_org_create
  AFTER INSERT ON organizations
  FOR EACH ROW EXECUTE FUNCTION create_org_settings();

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

---

## Authentication System

### Isolated Sessions Configuration

```typescript
// packages/database/src/client.ts
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Browser client (client components)
export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    // NO cookie domain override = isolated to current subdomain
  )
}

// Server client (server components, route handlers)
export function createServerSupabaseClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({
              name,
              value,
              ...options,
              // ISOLATED: Cookie only for current subdomain
              // DO NOT set domain = stays on bihorul.nuestra.com only
              path: '/',
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              httpOnly: true,
            })
          } catch (error) {
            // Handle server component cookie setting
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({
              name,
              value: '',
              ...options,
              maxAge: 0,
            })
          } catch (error) {
            // Handle server component cookie removal
          }
        },
      },
    }
  )
}
```

### Registration Flow (Seamless Join)

```typescript
// apps/fanpages/app/org/[slug]/register/actions.ts
'use server'

import { createServerSupabaseClient } from '@nuestra/database'
import { redirect } from 'next/navigation'

export async function registerUser(
  orgSlug: string,
  formData: FormData
) {
  const supabase = createServerSupabaseClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  
  // 1. Get organization
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .select('id')
    .eq('slug', orgSlug)
    .eq('is_active', true)
    .single()
  
  if (orgError || !org) {
    return { error: 'Organization not found' }
  }
  
  // 2. Check if email already exists in Supabase Auth
  const { data: existingUser } = await supabase.auth.admin.getUserByEmail(email)
  
  if (existingUser?.user) {
    // User exists - they need to login and will be joined via magic link
    return { 
      error: 'ACCOUNT_EXISTS',
      message: 'An account with this email exists. We\'ve sent you a link to join this fan page.'
    }
    // TODO: Send magic link for seamless join
  }
  
  // 3. Create new user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { 
        full_name: fullName,
        initial_org_slug: orgSlug  // Track which org they signed up from
      },
      emailRedirectTo: `https://${orgSlug}.nuestra.com/auth/callback`
    }
  })
  
  if (authError) {
    return { error: authError.message }
  }
  
  // 4. Profile is auto-created via database trigger
  // 5. Add membership to this organization
  if (authData.user) {
    const { error: memberError } = await supabase
      .from('organization_members')
      .insert({
        user_id: authData.user.id,
        organization_id: org.id,
        role: 'member'
      })
    
    if (memberError) {
      console.error('Failed to create membership:', memberError)
    }
  }
  
  // 6. Supabase will send verification email
  return { 
    success: true,
    message: 'Check your email to verify your account'
  }
}
```

### Seamless Join for Existing Users

```typescript
// apps/fanpages/app/org/[slug]/join/actions.ts
'use server'

import { createServerSupabaseClient } from '@nuestra/database'

export async function sendJoinLink(orgSlug: string, email: string) {
  const supabase = createServerSupabaseClient()
  
  // Get organization
  const { data: org } = await supabase
    .from('organizations')
    .select('id, name')
    .eq('slug', orgSlug)
    .single()
  
  if (!org) return { error: 'Organization not found' }
  
  // Check if user exists
  const { data: existingUser } = await supabase.auth.admin.getUserByEmail(email)
  
  if (!existingUser?.user) {
    return { error: 'No account found. Please register.' }
  }
  
  // Check if already a member
  const { data: existingMembership } = await supabase
    .from('organization_members')
    .select('id')
    .eq('user_id', existingUser.user.id)
    .eq('organization_id', org.id)
    .single()
  
  if (existingMembership) {
    return { error: 'You are already a member. Please login.' }
  }
  
  // Send magic link (acts as both auth + join verification)
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `https://${orgSlug}.nuestra.com/auth/callback?action=join`,
      data: {
        join_org_id: org.id,
        join_org_slug: orgSlug
      }
    }
  })
  
  if (error) return { error: error.message }
  
  return { 
    success: true,
    message: `Check your email to join ${org.name}`
  }
}
```

### Auth Callback Handler

```typescript
// apps/fanpages/app/auth/callback/route.ts
import { createServerSupabaseClient } from '@nuestra/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const action = requestUrl.searchParams.get('action')
  
  if (code) {
    const supabase = createServerSupabaseClient()
    
    // Exchange code for session
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`)
    }
    
    if (user && action === 'join') {
      // User is joining an existing organization via magic link
      const joinOrgId = user.user_metadata?.join_org_id
      
      if (joinOrgId) {
        // Check if already member
        const { data: existing } = await supabase
          .from('organization_members')
          .select('id')
          .eq('user_id', user.id)
          .eq('organization_id', joinOrgId)
          .single()
        
        if (!existing) {
          // Create membership
          await supabase
            .from('organization_members')
            .insert({
              user_id: user.id,
              organization_id: joinOrgId,
              role: 'member'
            })
        }
      }
    }
  }
  
  // Redirect to dashboard
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
```

---

## Multi-tenant Routing

### Middleware

```typescript
// apps/fanpages/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname
  
  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return response
  }
  
  let orgSlug: string | null = null
  
  // ============================================
  // SUBDOMAIN DETECTION
  // ============================================
  
  // Production: bihorul.nuestra.com
  if (hostname.endsWith('.nuestra.com')) {
    const subdomain = hostname.replace('.nuestra.com', '').split(':')[0]
    if (!['www', 'sport', 'admin'].includes(subdomain)) {
      orgSlug = subdomain
    }
  }
  
  // Development: bihorul.localhost:3000
  else if (hostname.includes('.localhost')) {
    const subdomain = hostname.split('.localhost')[0]
    if (subdomain && subdomain !== 'localhost') {
      orgSlug = subdomain
    }
  }
  
  // Development: bihorul.lvh.me:3000
  else if (hostname.includes('.lvh.me')) {
    const subdomain = hostname.split('.lvh.me')[0]
    if (subdomain && subdomain !== 'www') {
      orgSlug = subdomain
    }
  }
  
  // ============================================
  // NO SUBDOMAIN = Show landing or 404
  // ============================================
  
  if (!orgSlug) {
    return response
  }
  
  // ============================================
  // VALIDATE ORGANIZATION EXISTS
  // ============================================
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options, maxAge: 0 })
        },
      },
    }
  )
  
  // Check if organization exists
  const { data: org, error } = await supabase
    .from('organizations')
    .select('id, name, is_active')
    .eq('slug', orgSlug)
    .single()
  
  if (error || !org || !org.is_active) {
    // Organization doesn't exist or is inactive
    return NextResponse.redirect(new URL('https://nuestra.com/not-found', request.url))
  }
  
  // ============================================
  // GET CURRENT USER & MEMBERSHIP
  // ============================================
  
  const { data: { user } } = await supabase.auth.getUser()
  
  let isMember = false
  let memberRole: string | null = null
  
  if (user) {
    const { data: membership } = await supabase
      .from('organization_members')
      .select('role')
      .eq('user_id', user.id)
      .eq('organization_id', org.id)
      .single()
    
    isMember = !!membership
    memberRole = membership?.role || null
  }
  
  // ============================================
  // SET CONTEXT HEADERS
  // ============================================
  
  response.headers.set('x-org-id', org.id)
  response.headers.set('x-org-slug', orgSlug)
  response.headers.set('x-org-name', org.name)
  response.headers.set('x-user-authenticated', user ? 'true' : 'false')
  response.headers.set('x-user-is-member', isMember ? 'true' : 'false')
  response.headers.set('x-user-role', memberRole || '')
  
  // ============================================
  // REWRITE TO ORG-SPECIFIC ROUTES
  // ============================================
  
  const url = request.nextUrl.clone()
  url.pathname = `/org/${orgSlug}${pathname}`
  
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
```

### Organization Context Provider

```typescript
// apps/fanpages/lib/context/OrgContext.tsx
'use client'

import { createContext, useContext } from 'react'

interface OrgSettings {
  primaryColor: string
  secondaryColor: string
  headingFont: string
  bodyFont: string
  features: {
    shop: boolean
    news: boolean
    gallery: boolean
    forum: boolean
    [key: string]: boolean
  }
  layoutType: string
  customCss: string | null
}

interface OrgContextValue {
  id: string
  slug: string
  name: string
  settings: OrgSettings
  isMember: boolean
  memberRole: string | null
}

const OrgContext = createContext<OrgContextValue | null>(null)

export function OrgProvider({
  children,
  value
}: {
  children: React.ReactNode
  value: OrgContextValue
}) {
  return (
    <OrgContext.Provider value={value}>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --color-primary: ${value.settings.primaryColor};
            --color-secondary: ${value.settings.secondaryColor};
            --font-heading: ${value.settings.headingFont};
            --font-body: ${value.settings.bodyFont};
          }
          ${value.settings.customCss || ''}
        `
      }} />
      {children}
    </OrgContext.Provider>
  )
}

export function useOrg() {
  const context = useContext(OrgContext)
  if (!context) {
    throw new Error('useOrg must be used within OrgProvider')
  }
  return context
}
```

---

## Theme System

### Layout with Dynamic Theme

```typescript
// apps/fanpages/app/org/[slug]/layout.tsx
import { headers } from 'next/headers'
import { createServerSupabaseClient } from '@nuestra/database'
import { OrgProvider } from '@/lib/context/OrgContext'
import { getLayoutComponent } from '@/lib/layouts'

export default async function OrgLayout({
  params,
  children
}: {
  params: { slug: string }
  children: React.ReactNode
}) {
  const headersList = headers()
  const orgId = headersList.get('x-org-id')!
  const orgSlug = headersList.get('x-org-slug')!
  const orgName = headersList.get('x-org-name')!
  const isMember = headersList.get('x-user-is-member') === 'true'
  const memberRole = headersList.get('x-user-role') || null
  
  // Fetch settings
  const supabase = createServerSupabaseClient()
  const { data: settings } = await supabase
    .from('organization_settings')
    .select('*')
    .eq('organization_id', orgId)
    .single()
  
  const orgContext = {
    id: orgId,
    slug: orgSlug,
    name: orgName,
    settings: {
      primaryColor: settings?.primary_color || '#722F37',
      secondaryColor: settings?.secondary_color || '#1a2a3a',
      headingFont: settings?.heading_font || 'Oswald',
      bodyFont: settings?.body_font || 'Barlow',
      features: settings?.features || {},
      layoutType: settings?.layout_type || 'default',
      customCss: settings?.custom_css || null,
    },
    isMember,
    memberRole,
  }
  
  // Get layout component based on settings
  const Layout = getLayoutComponent(settings?.layout_type || 'default')
  
  return (
    <OrgProvider value={orgContext}>
      <Layout settings={orgContext.settings}>
        {children}
      </Layout>
    </OrgProvider>
  )
}
```

### Layout Component Factory

```typescript
// apps/fanpages/lib/layouts/index.ts
import DefaultLayout from './DefaultLayout'
import MagazineLayout from './MagazineLayout'
import MinimalLayout from './MinimalLayout'
import SportsLayout from './SportsLayout'

const layouts = {
  default: DefaultLayout,
  magazine: MagazineLayout,
  minimal: MinimalLayout,
  sports: SportsLayout,
}

export function getLayoutComponent(type: string) {
  return layouts[type as keyof typeof layouts] || layouts.default
}
```

---

## Deployment Configuration

### Netlify Configuration

```toml
# apps/fanpages/netlify.toml

[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

# Wildcard subdomain support
[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200

# Branch deploys (optional - for org-specific branches)
[context.bihorul]
  command = "pnpm build"

[context.ascensio]
  command = "pnpm build"
```

### Environment Variables

```env
# .env.local (development)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

NEXT_PUBLIC_BASE_DOMAIN=lvh.me:3000
NEXT_PUBLIC_APP_TYPE=fanpages

# .env.production
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

NEXT_PUBLIC_BASE_DOMAIN=nuestra.com
NEXT_PUBLIC_APP_TYPE=fanpages
```

---

## Local Development Commands

```bash
# Install dependencies
pnpm install

# Run all apps
pnpm dev

# Run specific app
pnpm dev:streetwear    # localhost:3000
pnpm dev:sport         # localhost:3001
pnpm dev:fanpages      # localhost:3002

# Test subdomains locally (fanpages)
# Open: bihorul.lvh.me:3002
# Open: ascensio.lvh.me:3002

# Generate Supabase types
pnpm db:generate

# Build all apps
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

---

## Testing Checklist

### Authentication
- [ ] New user can register on fan page
- [ ] Existing user sees "account exists" message
- [ ] Magic link joins user to new fan page
- [ ] Sessions are isolated between subdomains
- [ ] Logout only affects current subdomain
- [ ] Email verification works correctly

### Multi-tenancy
- [ ] Subdomain routing works correctly
- [ ] Invalid subdomains show 404
- [ ] Organization context is correct
- [ ] Theme applies correctly per org
- [ ] Features toggle correctly per org

### Data Isolation
- [ ] Users only see their org's products
- [ ] Users only see their org's posts
- [ ] Orders are scoped to organization
- [ ] RLS policies prevent cross-org access

### Customization
- [ ] Color changes apply immediately
- [ ] Logo changes work
- [ ] Layout switching works
- [ ] Custom CSS applies correctly
- [ ] Feature flags enable/disable correctly

