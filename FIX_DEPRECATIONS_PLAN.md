# Plan to Fix Deprecation Warnings

## Analysis

The warnings are from:
1. **Direct dependencies** we can update
2. **Transitive dependencies** (dependencies of our dependencies) - need overrides

## Strategy

### Phase 1: Update Direct Dependencies (Safe)
Update our packages to latest compatible versions

### Phase 2: Force Transitive Dependency Updates (Overrides)
Use npm overrides to force newer versions of problematic transitive deps

### Phase 3: Test & Deploy
Verify everything works and redeploy

---

## Detailed Fix Plan

### 1. Update ESLint (Keep v8 for Next.js 14 compatibility)
- Next.js 14 requires ESLint 8
- ESLint 9 requires Next.js 15+
- **Action:** Keep ESLint 8, but update to latest 8.x

### 2. Update Other Direct Dependencies
- Update all packages to latest compatible versions
- Test for breaking changes

### 3. Add npm Overrides for Transitive Dependencies
Force newer versions of:
- `glob` → latest (fixes security vulnerabilities)
- `rimraf` → v4+ (if possible)
- `inflight` → remove/replace with lru-cache
- `@humanwhocodes/*` → @eslint/* equivalents

### 4. Update Next.js (Careful - may have breaking changes)
- Next.js 14.2.5 → 14.2.35 (patch updates, safe)
- Next.js 16 has breaking changes, avoid for now

---

## Implementation Steps

1. Update package.json with latest versions
2. Add npm overrides section
3. Run npm install
4. Test build locally
5. Fix any breaking changes
6. Commit and push
7. Monitor Vercel build

---

## Risk Assessment

**Low Risk:**
- Patch version updates (14.2.5 → 14.2.35)
- Minor version updates of most packages
- Adding overrides for transitive deps

**Medium Risk:**
- Major version updates (would require testing)
- Next.js 16 upgrade (has breaking changes)

**Recommendation:** Start with safe updates, test thoroughly, then consider major updates separately.

