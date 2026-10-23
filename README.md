# tomnguyenrs.github.io

Personal academic website of Nguyen Quoc Nhan (Tom), built with [al-folio](https://github.com/alshedivat/al-folio) (Jekyll) and deployed to GitHub Pages by `.github/workflows/deploy.yml` (builds into the `gh-pages` branch).

- Profile and bio: `_pages/about.md`, `_config.yml`, `_data/socials.yml`
- Papers: `_bibliography/papers.bib` (`selected = {true}` shows on the home page)
- Presentations: `_pages/publications.md`
- CV: `assets/pdf/CV.pdf`
- Scroll effects: `assets/motion/`, loaded via the `_includes/scripts.liquid` override (copied from `al_folio_core` 1.0.15 — re-sync if that gem pin changes)
