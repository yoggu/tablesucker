# Tablesucker
See who sucks at tablesoccer.
Track your games and stats.

using Next.js and supabase.

## Gettting started:
```
npm install
```
```
npm run dev
```

cmd to generate types:
```
npx supabase gen types typescript --project-id "qewlkgtrjssdmsvdydac" --schema public > types/supabase.ts
```

cmd to generate assets:
```
npx pwa-asset-generator public/images/tablesucker.png public/images -b "linear-gradient(180deg, rgba(7,2,1,1) 0%, rgba(15,15,17,1) 100%)" -p 0 -x -r -d
```
