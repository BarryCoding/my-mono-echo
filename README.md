# Echo

## Echo Intro

In this video, we're building an AI-powered **customer support platform** from scratch.

You'll set up real-time AI chat with Convex Agents.  
Add voice support with VAPI.  
Upload docs and build a knowledge base with embeddings and RAG.  
Teach the AI how to escalate to a human or auto-resolve a conversation.

We'll build workspaces, teams, authentication, and billing with Clerk.  
You'll learn how to embed the chat widget, store API keys with AWS, and track errors with Sentry. Every chapter ends with a pull request and a CodeRabbit review.

This isn't just a demo. It's a full-stack, production-ready B2B SaaS template. Let's build Echo 🚀.

Key features:
🤖 Real-time AI Chat using Convex Agents
📣 Human Handoff & Auto-Close using AI Tools
🧠 Smart Knowledge Base using Embeddings and RAG
🔊 Voice Support by VAPI
🔑 API Key Storage by AWS Secrets Manager
👥 Team Management by Clerk
🔐 Authentication by Clerk
💳 Subscription Billing by Clerk
🛠️ Embeddable Widget
📈 Operator Dashboard for Managing Conversations
🧰 Developer Toolkit for Embed Script
🧠 AI Model Support: OpenAI, Anthropic, Grok
🌐 Built with Next.js 15
⚛️ Powered by React 19
🎨 Styled with Tailwind v4
🧩 Components from shadcn/ui
📦 Monorepo managed with Turborepo
🪵 Error Tracking by Sentry
🧑‍💻 Pull Request Reviews by CodeRabbit

## 01 Setup

1. Install PNPM (package manager)

```bash
pnpm -v
node -v
```

2. Setup Monorepo with shadcn/ui template
  - Turborepo (build system)
  - Next.js 15
  - React 19
  - Tailwind v4

```bash
pnpm dlx shadcn@2.9.2 init
# choose monorepo
# name my-mono-echo
# ...
cd my-mono-echo
cursor .
```

3. Learn monorepo with Turborepo
  - (ignored) experiment [packages/math](https://turborepo.com/docs/crafting-your-repository/creating-an-internal-package)

create 2nd app widget by copying apps/web
```bash
# copy apps/web to apps/widget 
# update widget package name and port

# back to workspace root
pnpm install
```

add new shadcn/ui components
```bash
# enter apps/web scaffold by shadcn
cd apps/web
pnpm dlx shadcn@2.9.2 add input
```

## 02 Convex as backend

1. resolve lint error from build command

```bash
pnpm view eslint@9.20.1 
# output: @eslint/js: 9.20.0 

# package eslint-config install @eslint/js with version consistency
pnpm -F eslint-config add -D @eslint/js@9.20.0
```

2. add convex internal package
   1. packages/backend/package.json
   2. root: `pnpm install`

```bash
pnpm -F backend add convex
```

3. run convex setup
   1. add setup script to its package.json

```bash
pnpm -F backend run setup
# new project
# my-echo-convex
# cloud deployment 
# -> check my convex dashboard
```

4. create schema and functions
   1. add `schema.ts` to create users table
   2. root: `pnpm run dev`
   3. add `users.ts`, try getMany
   4. the schema and function are sync with convex dashboard

### use convex in apps/web

```sh
pnpm -F web add convex
# add @workspace/backend
pnpm install
```

1. add convex to dependencies
2. add @workspace/backend to dependencies
3. add convex provider
4. modify paths of tsconfig.json and backend tsconfig.json
5. experiment query and mutation in web

### use convex in apps/widget

> Don't forget the env variable used in provider

1. add convex and @workspace/backend to dependencies 
   1. `pnpm install`
2. setup convex provider
3. setup tsconfig.json
4. experiment query and mutation in widget

## [Clerk Authentication](https://clerk.com/)

- login with github

### [Clerk Dashboard](https://dashboard.clerk.com/apps)

1. Create application
   1. Application name: Echo
   2. Options: Email, Google and Github
   3. Create application -> Echo App Overview

### [Convex auth w/ Clerk for Next.js Documentation](https://docs.convex.dev/auth/clerk#nextjs)

1. Done: Sign up for Clerk
2. Done: Create an application in Clerk
3. Create a JWT Template in Echo App configure
   1. change template to 'convex'
   2. copy `Issuer URL`
4. Set the `Issuer URL` in your env vars
   1. apps/web/.env.local
   2. key: NEXT_PUBLIC_CLERK_FRONTEND_API_URL
   3. value: `Issuer URL`
5. Configure Convex with the Clerk issuer domain
   1. packages/backend/convex/auth.config.ts
   2. add `"@types/node": "^20",` to backend package
   3. setup env for local backend CLERK_JWT_ISSUER_DOMAIN
   4. setup env for convex app Settings -> Environment Variables
6. Deploy your changes
   1. root: `pnpm run dev`
   2. sync with remote convex
7. Install clerk (apps/web only)
   1. `pnpm -F web add @clerk/nextjs`
8. Set your Clerk API keys
   1. apps/web/.env.local
9. Add Clerk middleware
   1. apps/web/middleware.ts
10. Configure ConvexProviderWithClerk
    1. apps/web/components/providers.tsx ("use client")
11. Wrap your app in Clerk and Convex
    1. apps/web/app/layout.tsx (server component)
12. Show UI based on authentication state (UI auth)
    1. apps/web/app/page.tsx
13. Use authentication state in your Convex functions (backend auth: most reliable)
    1. packages/backend/convex/user.ts 
       1. try add user in widget (unauthenticated)
       2. try add user in web (authenticated)

### Using middleware

> middleware auth is not reliable

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// public route explicit control
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/test-public(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})
```

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// private route explicit control
const isPrivateRoute = createRouteMatcher([
  "/test-private(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (isPrivateRoute(req)) {
    await auth.protect()
  }
})
```

### group auth route

- [Custom Sign in](https://clerk.com/docs/references/nextjs/custom-sign-in-or-up-page)
- [Custom Sign Up](https://clerk.com/docs/references/nextjs/custom-sign-up-page)


## Organizations

- auth module

### AuthGuard

1. Authorized and Unauthorized
2. Wrap (dashboard)/layout.tsx

### Enable organizations

1. clerk app dashboard -> Organizations tab -> configure 
   1. enable organizations
   2. edit **Limited membership** to 1
2. organization-guard
   1. enforce to create organization if user has no organization
3. organization-select-view

### middleware for org

1. organization select page
2. isOrganizationPublicRoute in middleware with redirect

### guard in backend

1. clerk app dashboard -> configure -> JWT templates
   1. claim add `"orgId": "{{org.id}}",`

## Error Tracking

### Create an error scenario

- throw error when add user

### track error in convex dashboard

- convex dashboard -> project -> functions -> user add

### [integrate sentry in apps/web](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

```sh
cd apps/web

pnpm dlx @sentry/wizard@latest -i nextjs
# continue yes
# sentry sass
# account yes -> redirect to browser -> new project "echo"
# PNPM
# yes yes yes
```

1. apps/web: add `.env.sentry-build-plugin` to `.gitignore`
2. apps/web: remove `--turbopack` in scripts

```sh
# root
pnpm install

pnpm run dev
```

3. go to http://localhost:3000/sentry-example-page
   1. throw sample error -> error sent to sentry
4. back to sentry dashboard refresh and track errors

### integrate convex to sentry

- convex project dashboard -> setting -> integrations
  - convex pro plan ? -> pending

## AI Voice Assistant

### create a Vapi account

- sign up with github
- read [Vapi documentation guide](https://docs.vapi.ai/guides)

### vapi Inbound customer support

> follow steps of [inbound support example](https://docs.vapi.ai/assistants/examples/inbound-support)

1. Create a knowledge base
   1. download `transactions.scv` and `accounts.scv`
   2. upload the **files** in vapi dashboard
2. Create an assistant (Tom)
3. Configure the assistant
4. Add Tools to an Assistant
5. Test talking to the Tom
6. Assign a Phone Number to an Tom

### Widget using vapi SDK

```sh
pnpm -F widget add @vapi-ai/web
```

- widget module
  - use-vapi.ts
- testing agent from widget page using client SDK

## Web Dashboard Layout

### Add shadcn/ui components

```sh
cd apps/web
pnpm dlx shadcn@2.9.2 add --all
```

### create a dashboard

- layout
- sidebar
  - header: OrganizationSwitcher
  - content: Sidebar group
  - footer: UserButton

### Create empty pages

- Customer Support
  - /conversations
  - /files
- Configuration
  - /customization
  - /integrations
  - /plugins/vapi
- Account
  - /billing

## Theme

> theme resources [tweakcn](https://tweakcn.com/)

- modify globals.css
- modify sidebar active style

## Widget Layout

- views
  - widget-view
- components
  - widget-header
  - widget-footer

## Widget Session

- contactSession table
- contactSession functions
- fix zod and resolver conflicts
- widget auth screen

## Widget Screen Router

- add jotai `pnpm -F widget add jotai` and its Provider
- create widget atoms
- define screens
- create screen router

## Widget Loading

- error screen
- convex functions
  - contactSession.validate
  - organizations.validate 
    - `pnpm -F backend add @clerk/backend`
    - CLERK_SECRET_KEY (local and clerk dashboard setting)
- [ ] loading screen
  - [ ] load organization and verify
  - [ ] load contact and verify

06:29:43 13 Conversations
07:00:58 14 AI Agents
08:10:11 15 Infinite Scroll
08:39:59 16 Widget Inbox
09:11:20 17 Dashboard Inbox
10:07:14 18 Dashboard Chat
10:56:01 19 AI Tool Calling
11:48:47 End of Part 1


## TODO:

- monorepo integrate the docs

- price tag for all services
  - convex: $25 / month
  - code rabbit: $15 / month
  - sentry $29 / month (team)