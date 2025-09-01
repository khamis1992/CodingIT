# Agent Guidelines for CodingIT

## Build/Lint/Test Commands
- **Development**: `npm run dev` (Next.js with Turbo)
- **Build**: `npm run build` (Next.js production build)
- **Start**: `npm run start` (Next.js production server)
- **Lint**: `npm run lint` (ESLint with Next.js rules)
- **No test framework configured** - run lint after changes

## Code Style Guidelines

### Formatting
- **Quotes**: Single quotes only (`'string'`)
- **Semicolons**: Never use semicolons
- **Imports**: Auto-sorted with `@trivago/prettier-plugin-sort-imports`

### TypeScript
- **Strict mode**: Enabled in `tsconfig.json`
- **Path aliases**: Use `@/*` for relative imports from root
- **Types**: Always use explicit types, prefer interfaces for objects

### Naming Conventions
- **Variables/Functions**: camelCase (`userName`, `getUserData`)
- **Components**: PascalCase (`UserProfile`, `ChatInput`)
- **Files**: kebab-case for components (`user-profile.tsx`), camelCase for utilities (`authUtils.ts`)

### Error Handling
- Use `console.warn()` for non-critical warnings
- Handle async errors with `.catch()` or try-catch
- Validate inputs with TypeScript types and runtime checks

### Imports
- Group imports: React/Next, third-party libraries, local utilities
- Use absolute imports with `@/` alias
- Sort imports automatically (handled by Prettier plugin)

### Best Practices
- No comments unless absolutely necessary
- Use functional components with hooks
- Follow React/Next.js conventions
- Maintain consistent file structure