Love Site
=========

A tiny static site for celebrating graduation.

How to use
- Put the landing background image at `img/landing.jpg` and it will be used via CSS variable (see below).
- Put your header video in `video/hero.mp4` (optionally add `video/hero.webm`).
- Add gallery images in `img/` and list filenames inside the `galleryFiles` array in `main.html`.

Local preview
- Open `index.html` directly in your browser (no build needed).

Customize
- Passcode is set in `index.html` via `window.__PASSCODE__` (default `6969`).
- To set the landing background, open `css/styles.css` and set:
  `body.landing { --bg-url: url('../img/landing.jpg'); }`

Deploy
- Host the `site/` folder on GitHub Pages, Netlify, or any static host.


