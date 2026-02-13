# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

typedash is a modern TypeScript utility library similar to lodash, focused on type-safety, tree-shaking, and leveraging modern JavaScript features. Each utility function is designed to be imported individually for optimal bundle size.

## Common Commands

### Development

- `pnpm dev` - Run build and tests in watch mode concurrently
- `pnpm build` - Build the project with tsup (generates both CJS and ESM)
- `pnpm test` - Run all tests with vitest
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

### Code Quality

- `pnpm lint` - Run all linting checks (format, type-check, linter, dependency dedup)
- `pnpm lint:fix` - Fix linting issues and format code
- `pnpm lint:type-check` - Run TypeScript type checking with `tsc --noEmit`

### Testing Individual Functions

- `pnpm test [pattern]` - Run tests matching pattern (e.g., `pnpm test pick` for pick function tests)

## Architecture & Structure

### Function Organization

- Each utility function lives in `src/functions/[functionName]/`
- Function structure:
  - `[functionName].ts` - Main implementation with JSDoc comments and TypeScript overloads
  - `[functionName].spec.ts` - Comprehensive test suite using vitest
  - `index.ts` - Simple re-export of the function
- Internal utilities are in `src/functions/_internal/` and prefixed with underscore
- All functions are re-exported in `src/functions/index.ts`

### Types

- Custom TypeScript types in `src/types/`
- Common utility types: `Maybe<T>`, `Many<T>`, `Falsey`, `EmptyObject`, etc.
- Internal types in `src/types/_internal/`

### Build System

- Uses tsup with automatic entry point generation for each function
- Builds both CommonJS and ESM formats
- Generates TypeScript declaration files
- Tree-shakeable - each function can be imported individually

### Code Style & Standards

- Uses Biome for linting and formatting
- Strict TypeScript configuration with `noUncheckedIndexedAccess`
- Function naming: camelCase for functions, PascalCase for types
- File naming: camelCase or PascalCase
- Comprehensive type safety - functions handle null/undefined gracefully
- All functions should have JSDoc documentation
- Test files use `.spec.ts` extension

### Testing Patterns

- Each function should have comprehensive test coverage
- Test null/undefined inputs
- Test edge cases and large inputs
- Use descriptive test names explaining the scenario
- Group related tests with `describe` blocks when appropriate

### Adding New Functions

1. Create directory: `src/functions/[functionName]/`
2. Implement function with proper TypeScript types and JSDoc
3. Write comprehensive tests
4. Add index.ts re-export
5. Add to `src/functions/index.ts`
6. Build system will automatically create individual entry points

### Performance Considerations

- Functions should handle both single values and arrays where appropriate using `Many<T>` type
- Prefer native JavaScript methods when possible
- Avoid runtime type checking - trust TypeScript types
- Functions should be lightweight and tree-shakeable

## Dependencies

- Runtime: Only `type-fest` for advanced TypeScript utilities
- Build: tsdown, TypeScript, vitest, Biome
- Uses pnpm 10.0.0 package manager
