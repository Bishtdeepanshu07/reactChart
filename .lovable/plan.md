

## Remove stale `xlsx` reference from lockfile

The `xlsx` package has already been removed from `package.json`. The security scanner is likely detecting it from a stale entry in `bun.lock` / `bun.lockb` / `package-lock.json`. 

### Steps

1. **Clean lockfiles** — Remove the stale lockfile entries that still reference `xlsx ^0.18.5`. This requires regenerating the lockfile (which happens automatically on next install since `xlsx` is no longer in `package.json`).

2. **Verify no code imports** — Confirm no source files import from `xlsx` (the codebase already uses `exceljs` exclusively). A quick search shows zero imports of `xlsx` in the source code.

This is a single-step fix: trigger a dependency reinstall so the lockfile no longer contains the vulnerable `xlsx` package.

