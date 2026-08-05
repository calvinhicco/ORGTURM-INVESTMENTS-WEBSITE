# ORGTURM INVESTMENTS Website — Hosting & Domain Handoff

Give this file to the person setting up **domain + hosting**.  
Project name: **ORGTURM INVESTMENTS** website (organic turmeric export).

---

## 1. What this project is

| Item | Detail |
|------|--------|
| Type | **Next.js** (React) website |
| Framework | Next.js 16 + React 19 |
| Package manager | **npm** (use `package-lock.json`) |
| Current live demo | https://orgturm-investments-website.vercel.app |
| Source on GitHub (preferred) | https://github.com/calvinhicco/ORGTURM-INVESTMENTS-WEBSITE |

This is **not** a plain HTML folder. It must be built and hosted on a platform that supports Node.js (recommended: **Vercel**).

---

## 2. How to get the files

### Option A — GitHub (recommended)

```bash
git clone https://github.com/calvinhicco/ORGTURM-INVESTMENTS-WEBSITE.git
cd ORGTURM-INVESTMENTS-WEBSITE
```

### Option B — Google Drive zip

1. Download the zip from the Drive link provided by the site owner.
2. Unzip to a folder on your computer.
3. **Do not** expect `node_modules` inside the zip (it is large and should be installed fresh).

#### What the Drive upload should include

**Include**

- `app/`, `components/`, `lib/`, `public/`, `docs/`
- `package.json`, `package-lock.json`
- `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`
- `.env.example`
- This instructions file

**Exclude** (do not upload / do not need)

- `node_modules/`
- `.next/`
- `.vercel/`
- `tools/` (local ffmpeg only)
- `.env.local` (secrets — share separately, never put in a public Drive link)

---

## 3. Requirements on the hosting machine / CI

- **Node.js 20+** (22 LTS is fine)
- **npm**
- Internet access for `npm install` and deploy

---

## 4. Run locally (to verify before going live)

```bash
cd turmeric-export-website
npm install
cp .env.example .env.local
# Edit .env.local — set a strong ADMIN_PASSWORD and ADMIN_SESSION_SECRET
npm run build
npm run start
```

Open http://localhost:3000

Dev mode (optional):

```bash
npm run dev
```

---

## 5. Recommended hosting: Vercel (easiest for Next.js)

### 5.1 Deploy

1. Create/login at https://vercel.com  
2. **Add New Project** → Import the GitHub repo  
   **or** use Vercel CLI from the unzipped folder:
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```
3. Framework preset: **Next.js** (auto-detected)  
4. Build command: `npm run build`  
5. Output: handled by Next.js (do not set static export)

### 5.2 Environment variables (Production)

Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | Notes |
|----------|----------|--------|
| `ADMIN_PASSWORD` | Yes | Password for the site admin lock icon (after Contact in the nav) |
| `ADMIN_SESSION_SECRET` | Yes | Long random string (e.g. 32+ characters) |
| `BLOB_READ_WRITE_TOKEN` | Strongly recommended | From **Vercel Blob** store — needed so admin text/media saves persist on Vercel |

Without `BLOB_READ_WRITE_TOKEN`, the public site still works, but **admin “Save changes” may not persist** after redeploys (serverless filesystem is read-only).

### 5.3 After first deploy

1. Open the `*.vercel.app` URL and check Home, Gallery (videos), Contact, Directors.  
2. Test admin: lock icon after **Contact** → password → edit → Save.  
3. Confirm videos under `/videos/` load (folder is large; deploy may take longer).

---

## 6. Connecting a custom domain

1. In Vercel: **Project → Settings → Domains** → add the domain (e.g. `www.orgturm.com` and apex `orgturm.com`).  
2. At the domain registrar (where the domain was bought), set DNS as Vercel shows, typically:

   **Apex (example.com)**  
   - Type: `A`  
   - Name: `@`  
   - Value: Vercel IP shown in dashboard (often `76.76.21.21`)

   **www**  
   - Type: `CNAME`  
   - Name: `www`  
   - Value: `cname.vercel-dns.com`  
   (use the exact values Vercel displays)

3. Wait for DNS propagation (minutes to 48 hours).  
4. Enable HTTPS (Vercel issues certificates automatically).

---

## 7. Other hosts (if not Vercel)

Any host must support **Node.js server** or **Next.js** (not “static HTML only”).

Examples: Netlify (with Next runtime), Railway, Render, a VPS with Node + PM2 + Nginx reverse proxy.

Typical VPS flow:

```bash
npm install
npm run build
npm run start   # serves on port 3000 — put Nginx/Caddy in front with SSL
```

Set the same environment variables as in section 5.2.  
For admin persistence on a VPS, either:

- use a writable disk and keep `data/site-data.json`, or  
- configure Vercel Blob / similar object storage (`BLOB_READ_WRITE_TOKEN`).

---

## 8. Important site features the host should know

1. **Gallery videos** live in `public/videos/` (~77 MP4s). Keep them when packaging the Drive zip — the site will look broken without them.  
2. **Admin portal** is behind a lock icon next to Contact (password from `ADMIN_PASSWORD`).  
3. **PDF manual** is **not** on the live site anymore. A local copy for the owner is in `docs/Organic-Turmeric-Manual.pdf` (optional to deploy).  
4. Content defaults are in `lib/site-content.ts` / admin defaults; live CMS data needs Blob or writable storage.

---

## 9. Checklist for “website is live”

- [ ] `npm install` + `npm run build` succeeds  
- [ ] Production URL loads on phone and desktop  
- [ ] Custom domain resolves with HTTPS  
- [ ] Env vars set (`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`)  
- [ ] `BLOB_READ_WRITE_TOKEN` set if admin editing is required  
- [ ] Gallery videos play  
- [ ] Contact details and directors photos visible  

---

## 10. Contact for this project

- Site owner / content: ORGTURM INVESTMENTS / Jacob Chazireni  
- Phone: +263 773 355 153  
- Email: jackychaz3@gmail.com  

If something fails during deploy, send the host: the build log error, Node version, and whether they used GitHub or Drive zip.

---

## Quick packaging tip (for the site owner — Google Drive)

From the project folder, zip **without** `node_modules` and `.next`:

**Windows PowerShell example:**

```powershell
Compress-Archive -Path app,components,lib,public,docs,scripts,package.json,package-lock.json,next.config.mjs,tsconfig.json,postcss.config.mjs,components.json,.env.example,.gitignore,HOSTING-AND-DOMAIN-INSTRUCTIONS.md -DestinationPath "$env:USERPROFILE\Desktop\ORGTURM-website-for-host.zip" -Force
```

Then upload `ORGTURM-website-for-host.zip` to Google Drive and share with the hosting person **plus this instructions file**.

Share admin secrets (`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`) by private message — **not** inside a public Drive folder.
