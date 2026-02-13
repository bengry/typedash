---
name: commit-conventions
description: Automatically detects and follows project commit conventions when making git commits. Checks for commitlint configuration and enforces conventional commits when present, otherwise falls back to user preferences.
user-invocable: false
---

# Commit Conventions

Background skill that ensures commit messages follow the project's conventions.

## Detection (run before every commit)

1. Check for commitlint config: `.commitlintrc*`, `commitlint.config.*`, or `@commitlint/*` in `devDependencies`/`dependencies`.
2. **If found** → use Conventional Commits format (below).
3. **If not found** → follow the user's CLAUDE.md commit preferences (e.g., plain messages, no semantic prefixes).

## Conventional Commit Format

When commitlint is detected, use this format:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Types

| Type | Purpose |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (not CSS) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Build system or external dependencies |
| `ci` | CI configuration |
| `chore` | Other changes that don't modify src or test |
| `revert` | Reverts a previous commit |

### Subject rules

- Imperative mood ("add", not "added" or "adds")
- Lowercase first letter
- No period at the end
- Max 70 characters (type + scope + subject combined)

### Scope

- Optional, describes the area of change (e.g., `feat(auth): ...`, `build(deps): ...`)
- Use the most specific relevant scope

### Body

- Separated from subject by a blank line
- Explain **what** and **why**, not how
- Wrap at 100 characters

### Breaking changes

- Add `!` after type/scope: `feat(api)!: remove deprecated endpoints`
- Or use `BREAKING CHANGE:` footer with description

### Reverts

- Format: `revert: <subject of reverted commit>`
- Body should contain: `This reverts commit <hash>.`

## Hook Discipline

- **NEVER** use `--no-verify` unless the user explicitly asks for it.
- If a pre-commit or commit-msg hook fails, **fix the root cause** (reformat the message, fix lint errors, etc.) instead of bypassing hooks.
- If a commitlint hook rejects the message, rewrite the message to comply and retry.

## Post-Commit Verification

If commitlint is available in the project (`npx commitlint --help` succeeds), run after committing:

```
npx commitlint --last
```

If this fails, amend the commit with a corrected message.
