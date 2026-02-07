# Frontend Development Guidelines

Default to using Bun instead of Node.js.

- Use `bun install` instead of `npm install`
- Use `bun run <script>` instead of `npm run <script>`
- Bun automatically loads .env files

## Stack

- React 19
- TanStack Router (file-based routing)
- TanStack Query (React Query)
- react-hook-form + zod
- shadcn/ui + Tailwind CSS v4
- TypeScript
- Vite (required for TanStack Router plugin)
- Jest + React Testing Library

## Scripts

```sh
bun run dev           # Start dev server on port 3000
bun run build         # Type check and build for production
bun run preview       # Preview production build
bun run test          # Run tests
bun run test:watch    # Run tests in watch mode
bun run test:coverage # Run tests with coverage
bun run format        # Format all files with Prettier
bun run format:check  # Check if files are formatted
```

## Code Formatting

Prettier is configured with Claude hooks to auto-format files after every edit.

**Configuration:** `.prettierrc`
- No semicolons
- Single quotes
- Trailing commas (ES5)
- 2 space indentation

**Claude Hooks:** `.claude/settings.json`
- Runs `prettier --write` automatically after Write/Edit operations

## Project Structure (Feature-based)

```
src/
├── features/           # Feature modules
│   ├── auth/           # Authentication feature
│   │   ├── components/ # LoginForm, LoginPage
│   │   ├── hooks/      # Auth-related hooks
│   │   ├── schemas/    # Zod schemas (login.schema.ts)
│   │   └── index.ts    # Feature exports
│   └── home/           # Home feature
│       ├── components/ # HomePage
│       └── index.ts    # Feature exports
├── shared/             # Shared across features
│   ├── components/     # Button, Input, Card
│   ├── hooks/          # Shared hooks
│   └── lib/            # Utilities, helpers
├── routes/             # TanStack Router routes (thin layer)
├── test/               # Test setup
├── main.tsx            # App entry point
├── index.css           # Global styles
└── routeTree.gen.ts    # Auto-generated (do not edit)
```

### Feature Structure

Each feature is self-contained with its own components, hooks, and schemas:

```
features/auth/
├── components/
│   ├── LoginForm.tsx    # Form component
│   ├── LoginPage.tsx    # Page component
│   └── index.ts         # Component exports
├── hooks/               # Feature-specific hooks
├── schemas/
│   ├── login.schema.ts  # Zod validation schema
│   └── index.ts         # Schema exports
└── index.ts             # Public feature API
```

## Routing

Routes are file-based using TanStack Router. Add new routes in `src/routes/`:

- `__root.tsx` - Root layout wrapping all routes
- `index.tsx` - Home page (`/`)
- `about.tsx` - About page (`/about`)
- `users/index.tsx` - Users list (`/users`)
- `users/$id.tsx` - User detail (`/users/:id`)

The route tree is auto-generated when running the dev server.

## Testing

Use Jest with React Testing Library:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

## Forms with Zod

Use react-hook-form with zod resolver:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
})

function Form() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })
  // ...
}
```

## Path Aliases

Use `@/` to import from `src/`:

```tsx
// Import from features
import { LoginPage, LoginForm } from '@/features/auth'
import { HomePage } from '@/features/home'

// Import from shared
import { Button, Input, Card } from '@/shared/components'
```

## Adding a New Feature

1. Create the feature folder: `src/features/<feature-name>/`
2. Add `components/`, `hooks/`, `schemas/` as needed
3. Export public API from `index.ts`
4. Create route in `src/routes/` that imports from the feature

## shadcn/ui Components

This project uses shadcn/ui with Tailwind CSS v4 for accessible, themeable UI components.

### Adding New Components

Use the shadcn CLI to add new components:

```sh
bunx shadcn@latest add <component>
```

Example:
```sh
bunx shadcn@latest add dialog
bunx shadcn@latest add dropdown-menu
```

### Available Components

Located in `src/shared/components/ui/`:
- `button` - Button with variants (default, destructive, outline, secondary, ghost, link)
- `input` - Text input with focus states
- `label` - Accessible label using Radix
- `card` - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `form` - React Hook Form integration (Form, FormField, FormItem, FormLabel, FormControl, FormMessage)

### Using the `cn()` Utility

The `cn()` function combines clsx and tailwind-merge for conditional class names:

```tsx
import { cn } from '@/shared/lib/utils'

function Component({ className, isActive }) {
  return (
    <div className={cn(
      'base-classes',
      isActive && 'active-classes',
      className
    )}>
      Content
    </div>
  )
}
```

### Theming with CSS Variables

Theme colors are defined in `src/index.css` using CSS custom properties:

- Light/dark mode via `@media (prefers-color-scheme: dark)`
- Colors: `--color-background`, `--color-foreground`, `--color-primary`, etc.
- Border radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`

Use Tailwind classes that reference these variables:
```tsx
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">
```
