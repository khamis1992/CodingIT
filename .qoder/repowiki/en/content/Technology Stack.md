# Technology Stack

<cite>
**Referenced Files in This Document**   
- [next.config.mjs](file://next.config.mjs)
- [tailwind.config.ts](file://tailwind.config.ts)
- [pnpm-workspace.yaml](file://pnpm-workspace.yaml)
- [package.json](file://package.json)
- [apps/desktop/package.json](file://apps/desktop/package.json)
- [supabase/README.md](file://supabase/README.md)
</cite>

## Table of Contents
1. [Next.js 14 with App Router](#nextjs-14-with-app-router)
2. [Remix](#remix)
3. [Electron](#electron)
4. [Supabase (PostgreSQL)](#supabase-postgresql)
5. [E2B SDK](#e2b-sdk)
6. [Tailwind CSS](#tailwind-css)
7. [Nanostores](#nanostores)
8. [shadcn/ui and Radix UI](#shadcnui-and-radix-ui)
9. [Monorepo Structure with pnpm Workspaces](#monorepo-structure-with-pnpm-workspaces)
10. [Performance Implications and Best Practices](#performance-implications-and-best-practices)
11. [Extending the Stack](#extending-the-stack)

## Next.js 14 with App Router

The web application leverages Next.js 14 with the App Router for server-side rendering, routing, and API route handling. The App Router enables nested layouts, streaming, and improved data fetching patterns. The configuration in `next.config.mjs` includes performance optimizations such as static asset caching and package import optimization for frequently used libraries like `lucide-react` and `@radix-ui/react-icons`. The `optimizePackageImports` feature reduces bundle sizes by automatically tree-shaking and optimizing imports.

The headers configuration sets long-term caching for static assets like images, improving load performance and reducing bandwidth usage. This setup ensures optimal delivery of static content while maintaining dynamic capabilities for personalized user experiences.

**Section sources**
- [next.config.mjs](file://next.config.mjs#L1-L43)
- [package.json](file://package.json#L1-L142)

## Remix

The desktop application utilizes Remix as the framework for building the user interface. Remix provides a full-stack framework approach with nested routes, data loading, and error boundaries. It integrates with Cloudflare Pages and Workers for serverless deployment and edge computing capabilities. The desktop application uses Remix with Vite for development, enabling fast hot module replacement and modern build tooling.

Remix is configured to work within the Electron environment, allowing for seamless integration between the desktop shell and web-based UI components. The framework handles routing, data loading, and form submissions efficiently, providing a responsive user experience.

**Section sources**
- [apps/desktop/package.json](file://apps/desktop/package.json#L1-L246)
- [apps/desktop/scripts/electron-dev.mjs](file://apps/desktop/scripts/electron-dev.mjs#L1-L180)

## Electron

The desktop application is built using Electron, enabling cross-platform desktop deployment on Windows, macOS, and Linux. Electron wraps the web application in a native shell, providing access to system-level APIs and features. The application uses Electron 38 with modern ES module support and Vite for building both the main and preload processes.

Key Electron features implemented include:
- Auto-updater for seamless application updates
- Native window management with custom bounds persistence
- Secure storage using `electron-store` with encryption
- Integration with system menus and native dialogs
- Development workflow with hot-reload capabilities

The main process manages window creation, auto-updates, and system integration, while the preload script bridges the secure context between Node.js and the renderer process.

**Section sources**
- [apps/desktop/electron/main/index.ts](file://apps/desktop/electron/main/index.ts)
- [apps/desktop/electron/main/ui/window.ts](file://apps/desktop/electron/main/ui/window.ts#L1-L53)
- [apps/desktop/electron/main/utils/auto-update.ts](file://apps/desktop/electron/main/utils/auto-update.ts#L1-L38)

## Supabase (PostgreSQL)

The application uses Supabase as its backend-as-a-service platform, providing PostgreSQL database capabilities, authentication, storage, and real-time functionality. The database schema is organized into logical files within the `supabase/schemas/` directory, following a specific loading order to ensure proper dependency resolution.

The schema organization includes:
- `extensions.sql`: Core PostgreSQL and Supabase extensions
- `sequences.sql`: Database sequences and auto-increment management
- `auth.sql`: Complete authentication schema with MFA support
- `storage.sql`: File storage and object management
- `public.sql`: Main application schema with business logic

Row Level Security (RLS) is enabled on all user-facing tables, ensuring data isolation and security. The platform supports vector indexes for AI/ML features, full-text search, and comprehensive indexing for performance optimization.

**Section sources**
- [supabase/README.md](file://supabase/README.md#L1-L129)
- [lib/supabase-credentials.ts](file://lib/supabase-credentials.ts#L1-L2)

## E2B SDK

The E2B SDK enables secure code execution in isolated sandbox environments. The platform integrates with E2B to provide code interpretation capabilities, allowing users to execute Python and other language code safely. The SDK is used in API routes to connect to and manage sandbox instances, with automatic timeout configuration and session management.

Key integration points include:
- Code evaluation in chat interactions
- File system operations within sandboxes
- Persistent sandbox connections using session IDs
- Environment variable configuration for API keys

The E2B integration enables real-time code execution and analysis without compromising system security.

**Section sources**
- [app/api/chat/codeInterpreter.ts](file://app/api/chat/codeInterpreter.ts#L1-L55)
- [lib/sandbox.ts](file://lib/sandbox.ts#L1-L27)
- [app/api/sandbox/[sbxId]/files/route.ts](file://app/api/sandbox/[sbxId]/files/route.ts#L1-L76)

## Tailwind CSS

Tailwind CSS is used as the utility-first CSS framework for styling the application. The configuration in `tailwind.config.ts` extends the default theme with custom colors, border radii, and animations. The configuration enables dark mode support through CSS classes and defines a responsive container with custom breakpoints.

Key features of the Tailwind configuration include:
- CSS variables for theming (hsl values)
- Custom font families with fallbacks
- Animation keyframes for accordion components
- Responsive design with mobile-first approach
- Integration with `tailwindcss-animate` plugin

The content configuration scans the application directories to purge unused CSS in production, ensuring minimal bundle sizes.

**Section sources**
- [tailwind.config.ts](file://tailwind.config.ts#L1-L131)
- [app/globals.css](file://app/globals.css)

## Nanostores

Nanostores is used as the state management solution across both web and desktop applications. It provides a lightweight, type-safe approach to state management with minimal boilerplate. The stores are used to manage various application states including:
- Chat state and messaging
- User profile information
- Application settings
- Log entries and system events
- GitHub and GitLab connections

Nanostores integrate with React through `@nanostores/react`, enabling automatic reactivity and component updates when state changes. The stores are designed to be simple and composable, with atomic updates and minimal overhead.

**Section sources**
- [apps/desktop/app/lib/stores/chat.ts](file://apps/desktop/app/lib/stores/chat.ts#L1-L6)
- [apps/desktop/app/lib/stores/profile.ts](file://apps/desktop/app/lib/stores/profile.ts#L1-L27)
- [apps/desktop/app/lib/stores/logs.ts](file://apps/desktop/app/lib/stores/logs.ts#L1-L58)

## shadcn/ui and Radix UI

The application uses shadcn/ui components built on top of Radix UI primitives for accessible, composable UI elements. Radix UI provides unstyled, accessible components that serve as the foundation for the custom component library. The implementation includes various components such as:
- Dialogs and modals
- Dropdown menus and select inputs
- Tabs and accordions
- Buttons and form controls
- Toast notifications and alerts

The components are customized with project-specific styling and integrated with the Tailwind CSS theme. The use of Radix UI ensures proper accessibility semantics, keyboard navigation, and screen reader support.

**Section sources**
- [components/ui/dialog.tsx](file://components/ui/dialog.tsx#L1-L39)
- [components/ui/tabs.tsx](file://components/ui/tabs.tsx#L1-L38)
- [components/ui/select.tsx](file://components/ui/select.tsx#L1-L40)

## Monorepo Structure with pnpm Workspaces

The project uses a monorepo structure managed by pnpm workspaces, enabling shared dependencies and code across multiple applications. The `pnpm-workspace.yaml` file defines the workspace packages, including the root directory and all applications under `apps/*`.

Key benefits of this structure include:
- Shared dependencies between web and desktop applications
- Consistent version management
- Efficient dependency resolution
- Isolated application builds
- Shared component libraries

The workspace configuration includes overrides for specific package versions to ensure compatibility and security. The `onlyBuiltDependencies` configuration optimizes installation by specifying which dependencies require building.

**Section sources**
- [pnpm-workspace.yaml](file://pnpm-workspace.yaml#L1-L19)
- [package.json](file://package.json#L1-L142)
- [apps/desktop/package.json](file://apps/desktop/package.json#L1-L246)

## Performance Implications and Best Practices

The technology stack has been selected and configured with performance as a primary consideration. Key performance optimizations include:
- Static asset caching with long TTLs
- Code splitting and lazy loading
- Tree-shaking of unused dependencies
- Optimized package imports
- Efficient state management with Nanostores
- Database indexing and query optimization
- Responsive design with mobile-first approach

Best practices implemented across the stack include:
- Security through RLS and input validation
- Type safety with TypeScript
- Accessibility via Radix UI components
- Responsive layouts with Tailwind CSS
- Error boundaries and graceful degradation
- Comprehensive logging and monitoring

**Section sources**
- [next.config.mjs](file://next.config.mjs#L1-L43)
- [tailwind.config.ts](file://tailwind.config.ts#L1-L131)
- [supabase/README.md](file://supabase/README.md#L1-L129)

## Extending the Stack

To extend the stack with new dependencies while maintaining consistency:
1. Add dependencies to the appropriate `package.json` file
2. Update pnpm overrides if version conflicts exist
3. Ensure TypeScript types are available or declared
4. Integrate with existing state management patterns
5. Follow component design system guidelines
6. Update documentation with new technology usage

When adding UI components, follow the shadcn/ui pattern of composing Radix UI primitives with Tailwind CSS classes. For state management, prefer Nanostores for global state and React hooks for local component state.

**Section sources**
- [package.json](file://package.json#L1-L142)
- [apps/desktop/package.json](file://apps/desktop/package.json#L1-L246)
- [pnpm-workspace.yaml](file://pnpm-workspace.yaml#L1-L19)