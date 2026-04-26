# kysira.github.io

Marketing site for [Kysira](https://github.com/kysira) — AI-powered SQL injection detection that kills attacks in under 100ms.

Hosted on GitHub Pages from this repository.

## Local preview

It's a single static `index.html` with no build step. Just open it:

```bash
open index.html
# or, with a tiny local server:
python3 -m http.server 8000
```

## Deployment

This repo is named `kysira.github.io`, so GitHub Pages serves it at the root domain `https://kysira.github.io/` automatically once pushed under the `kysira` GitHub org/user.

1. Create the empty repo on GitHub: `kysira/kysira.github.io`
2. Push:
   ```bash
   git remote add origin git@github.com:kysira/kysira.github.io.git
   git add .
   git commit -m "Initial marketing site"
   git push -u origin main
   ```
3. In repo Settings → Pages, confirm source is `Branch: main / (root)`.
4. Wait ~1 minute, visit https://kysira.github.io/

The `.nojekyll` file disables Jekyll processing so files are served as-is.

## Custom domain

To serve at `kysira.com` (or similar):

1. Add a `CNAME` file at the repo root containing the bare domain:
   ```
   kysira.com
   ```
2. At your DNS provider, add `A` records for the apex pointing to GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a `CNAME` record for `www` pointing to `kysira.github.io`.
3. In repo Settings → Pages, set the custom domain and tick **Enforce HTTPS**.

## Editing

Everything is in `index.html` — HTML, CSS, JS in one file. Edit, push, deploy.

Sections, in order: nav, hero (with simulated kill feed), stats strip, problem, how-it-works, why-now, FAQ, CTA band, footer.
