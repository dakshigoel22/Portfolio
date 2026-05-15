# Portfolio — CLAUDE.md

## Project Overview
Personal portfolio website for Dakshi Goel — MS Data Science at UMD, AI/GenAI engineer background.
Built with **React 17**, **Bootstrap 5**, **React Bootstrap**, deployed via **Vercel** (also supports gh-pages).

## Tech Stack
- React 17.0.2 + React Router DOM 6
- Bootstrap 5 + react-bootstrap
- react-tsparticles (particle background)
- typewriter-effect (hero typing animation)
- react-parallax-tilt (tilt card effect)
- react-icons (all icons — Di, Si, Ai, Fa, Tb, Bi, Im prefixes)
- react-pdf / @react-pdf/renderer (resume page)
- react-github-calendar (currently commented out)

## Project Structure
```
src/
  App.js                        # Router, page layout
  style.css                     # All custom styles (primary CSS file)
  App.css                       # Minimal base styles
  components/
    Home/
      Home.js                   # Hero section (dark bg + typewriter)
      Home2.js                  # Intro section (bio, education logos, socials)
      Type.js                   # Typewriter role strings
    About/
      About.js                  # Page shell — assembles sub-sections
      Techstack.js              # Skill icons grid
      Toolstack.js              # Tool icons grid
      LeadershipRoles.js        # Leadership bullet list
      Achievements.js           # Achievement bullet list
      AboutCard.js              # (unused/commented out)
      Github.js                 # (commented out)
    Experience/
      Experience.js             # Experience data + card layout
      ExperienceCard.js         # Individual card component
      Experience.css            # Experience-specific styles
    Projects/
      Projects.js               # Research + recent works layout
      ProjectCards.js           # Individual project card component
    Resume/
      ResumeNew.js              # PDF embed + download button
    Navbar.js                   # Responsive sticky navbar with dropdowns
    Footer.js
    Particle.js                 # tsparticles config
    Pre.js                      # Preloader spinner
    ScrollToTop.js
  Assets/
    Projects/                   # Project thumbnail images
    myImg.png                   # Profile photo (used in Home2 + About)
    home-bg.jpg                 # Hero background
    *_logo.*                    # Company logos for Experience cards
```

## Key Design Tokens (style.css)
- Primary accent: `#c770f0` (purple), variable `--imp-text-color`
- Text on light bg: `#333333`
- Hero: dark overlay on `home-bg.jpg`, white text, gold (#ffd700) typewriter
- Light sections: near-white gradient background
- `.purple` class for accent text throughout

## Conventions
- All content data lives directly in component files (no external data files)
- Icons come from `react-icons` — use `Si*` for brand logos, `Ai*` for general AI/GitHub
- Company logos stored in `src/Assets/` as `.png` or `.svg.png`
- Project images in `src/Assets/Projects/`
- Resume PDF in both `src/Assets/` and `public/` (the public one is used by the embed)

## Commands
```bash
npm start        # Dev server (localhost:3000)
npm run build    # Production build
npm run deploy   # Build + deploy to gh-pages
```

## Do Not Change
- `vercel.json` — routing config for Vercel SPA
- `.gitignore` — already excludes node_modules and build
