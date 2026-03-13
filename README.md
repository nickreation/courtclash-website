# Court Clash – Site web

Site vitrine et page joueur pour [Court Clash](https://courtclash.app).  
Remplace (ou complète) le site WordPress. Déployable sur **Vercel**.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (lecture publique des profils joueurs pour `/player/[id]`)

## Routes

- **`/`** – Page d’accueil (à personnaliser avec le contenu du site actuel)
- **`/player/[id]`** – Page affichée quand quelqu’un scanne le QR code d’un joueur hors de l’app : infos du joueur + boutons « Ouvrir l’app » et stores

## Configuration

### 1. Variables d’environnement

Copier `.env.example` en `.env.local` et renseigner :

- `NEXT_PUBLIC_SUPABASE_URL` – URL du projet Supabase (identique à l’app Court Clash)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Clé anon Supabase

Les mêmes valeurs que dans le projet **court-clash-v2** conviennent (même base pour la vue `user_stats_view`).

### 2. Installation et lancement

```bash
cd courtclash-website
npm install
cp .env.example .env.local
# Éditer .env.local avec tes clés Supabase
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).  
Tester la page joueur : [http://localhost:3000/player/UUID_D_UN_JOUEUR](http://localhost:3000/player/UUID_D_UN_JOUEUR).

### 3. Déploiement Vercel

1. Créer un nouveau projet sur [vercel.com](https://vercel.com) (Import Git Repository).
2. Choisir le dépôt **courtclash-website** (ou le dossier si monorepo).
3. Framework Preset : **Next.js** (détecté automatiquement).
4. Ajouter les variables d’environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Déployer.
6. Dans **Settings → Domains**, ajouter **courtclash.app** (et www si besoin).
7. Chez ton registrar DNS : pointer **courtclash.app** vers Vercel (CNAME ou A selon les instructions Vercel).

### 4. Lien avec l’app

- Dans l’app **court-clash-v2**, le QR code sur l’écran Game encode :  
  `https://courtclash.app/player/{userId}`  
  (ou `https://app.courtclash.app/player/...` si tu gardes le site actuel sur le domaine principal et l’app sur un sous-domaine).
- Quand ce site est servi sur **courtclash.app**, le scan ouvre directement cette page ; « Ouvrir l’app » utilise le deep link `courtclash://player/{id}`.

## À personnaliser

- **Page d’accueil** (`app/page.tsx`) : reprendre le contenu et le design du site WordPress (sections, témoignages, FAQ, etc.).
- **App Store** : dans `app/player/[id]/page.tsx` et `app/page.tsx`, remplacer l’URL App Store `idXXXXXXXXX` par l’ID réel de l’app sur l’App Store.

## RLS Supabase

La page `/player/[id]` lit la vue **user_stats_view** avec la clé **anon**. La vue utilise `security_invoker`, donc les politiques RLS des tables **users** et **player_stats** s’appliquent.

- **Sans politique pour anon** : la page affiche « Joueur introuvable ».
- Une migration dans **court-clash-v2** autorise la lecture publique :
  - `supabase/migrations/20250313120000_allow_anon_read_user_stats_for_public_player_page.sql`
- Appliquer les migrations Supabase (ou exécuter ce fichier sur ton projet) pour que la page joueur fonctionne.

En dev, si Supabase n’est pas configuré (`.env.local` manquant ou invalide), un avertissement s’affiche dans la console du serveur, et les erreurs Supabase sont loguées au format `[getPublicPlayerById] Supabase error: ...`.
