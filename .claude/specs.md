# Portfolio Update — Specs & Plan of Execution

Last updated: May 2026
Source of truth: Resume (May 2026) + GitHub profile (dakshigoel22)
Status: Ready to execute

---

## Brand Positioning
Dakshi is a **2nd-semester MS Data Science student at UMD (GPA 4.0)** and active **Teaching Assistant**.
Not job-seeking — building an AI engineer/researcher brand.
Tone: confident, technical, personality-forward.

---

## Phase 1 — Experience Section (High Priority)

### Correct Role Titles (current portfolio has wrong titles)
| Current (wrong) | Correct (from resume) |
|---|---|
| "Junior AI Developer" @ Mozrest | "AI Developer" |
| "AI Engineer Intern" @ Infineon | "AI Innovation Intern" |
| "Project Intern" @ LTIMindtree | "Machine Learning Intern" |
| "Intern" @ Univ.AI | **REMOVE** — not on resume, too old (2021) |

### Add New Role: Teaching Assistant (MOST RECENT)
Must be first card in the experience list.
- **Role:** Teaching Assistant
- **Company:** University of Maryland
- **Duration:** February 2026 – Present
- **Location:** College Park, MD
- **Logo:** `src/Assets/umd_logo.svg.png` (already in Assets)
- **Description:**
  - Assisting and grading 30+ students for Introduction to Data Science in the Computer Science department.
- **Technologies:** ["Python", "Data Science", "Jupyter"]

### Updated Bullets (match resume exactly)

**Real Brokerage (AI Product Associate, Dec 2024 – Aug 2025):**
- Optimized a hybrid vector search and reranking strategy, reducing query latency by 11%.
- Analyzed 10K+ real-time conversations using LangFuse to diagnose intent routing failures, collaborating with PMs.
- Won AI Hackathon (among 200+ employees) by building a data annotation tool to accelerate model training.
- Technologies: ["LangFuse", "GPT-4", "RAG", "Vector Search", "Docker", "Datadog", "Prompt Engineering"]

**Mozrest (AI Developer, Dec 2023 – Dec 2024):**
- Architected an agentic chatbot using GPT-3.5 Turbo and LangGraph for restaurant booking, integrated Stripe payment gateway, deployed on AWS.
- Created a restaurant review response generation chatbot using few-shot prompting on GPT-3.5, deployed via AWS Lambda.
- Built a restaurant sales forecasting model using ARIMA and LSTM, achieving RMSE 7.2 on 50+ daily bookings.
- Technologies: ["Python", "LangGraph", "AWS Lambda", "AWS SageMaker", "ARIMA", "LSTM", "FastAPI"]

**Infineon (AI Innovation Intern, July 2023 – Dec 2023):**
- Developed RAG pipeline for QnA on semiconductor datasheets using LLaMA-13B + FAISS, achieving 0.65 BLEU score.
- Implemented T5 transformer and performed recursive chunking for translation and summarization on semiconductor data.
- Technologies: ["RAG", "FAISS", "LLaMA", "FastAPI", "Transformers"]

**LTIMindtree (Machine Learning Intern, May 2023 – July 2023):**
- Implemented LLaMA-2 13B for code generation on scraped Snowpark data, reducing hallucinations by 38%.
- Built a Streamlit chatbot interface and integrated it with FastAPI, increasing user engagement by 20%.
- Technologies: ["LLaMA-2", "Streamlit", "FastAPI", "HuggingFace", "BeautifulSoup"]

---

## Phase 2 — Projects Section (High Priority)

### Remove from "Recent Works"
- **Audio Quality Assessment** → move to keep or remove — it's now a formal resume project, not a "recent work". Keep but update description.
- **Flipkart Grid** → keep (strong achievement, still relevant)
- **Age and Gender Prediction** → keep (Inter-IIT 1st place, keep as is)

### Add New UMD Research Projects (new section or add to research)

**LLM Fingerprinting: Identifying the Author Through Text Analysis**
- Context: UMD course project, Sept 2025 – Dec 2025
- Description: Achieved 82% classification accuracy across 7 LLMs and a human author using DeepNN for the MGTBench dataset. Extracted 10+ semantic and stylometric features (Langdetect, NER, NLTK), identifying perplexity as key discriminating feature.
- GitHub: https://github.com/dakshigoel22/602_datascience_project (likely — confirm)
- Image: `codeEditor.png`

**Underwater 3D Reconstruction** (Perception and Robotics Group, UMD)
- Context: Research project, Sept 2025 – Present
- Description: Parallelized training of SOTA 3D reconstruction transformers across 4 GPUs using Distributed Data Parallel. Modified model architectures to generate metric depth maps from underwater images using the depth-pro model.
- GitHub: https://github.com/dakshigoel22/VGGT-Underwater-3D-reconstruction
- Image: `research_1.png` (underwater theme)

### Add New Projects from GitHub Pinned

**Mock Interview Agent**
- GitHub: https://github.com/dakshigoel22/mock_interview_agent
- Description: Multi-agent mock interview bot built using LiveKit. Conducts real-time voice interviews, evaluates candidate responses, and provides structured feedback using LLM-based agents.
- Image: `voice_agent.png`

**Consumer Complaints Classification — Agentic Pipeline**
- GitHub: https://github.com/dakshigoel22/Consumer-Complaints-Classification-Agentic-Pipeline
- Description: Agentic pipeline that automatically classifies customer complaints using LLMs. Routes tickets to appropriate departments with structured reasoning and confidence scoring.
- Image: `emotion.png`

### Final Project Layout Target
```
Research Section (2 cards, full width):
  - Underwater Image Enhancement (IEEE + Indian Patent) ← existing
  - Remote Sensing / Alteration Zones (MIGARS 2024)   ← existing

UMD Projects (new subsection, 2 cards):
  - LLM Fingerprinting                                  ← NEW (github: 602_datascience_project)
  - Underwater 3D Reconstruction                        ← NEW (github: VGGT-Underwater-3D-reconstruction)

Recent Works (newer first, older below):
  - Voice Agent for Real Estate                         ← existing (keep top)
  - Mock Interview Agent                                ← NEW (GitHub)
  - Consumer Complaints Pipeline                        ← NEW (GitHub)
  - Flipkart Grid Challenge                             ← existing
  - Audio Quality Assessment                            ← keep, below newer projects
  - Age and Gender Prediction                           ← keep, below newer projects
```

---

## Phase 3 — Home / Bio Section

### Type.js — Typewriter Strings
Replace current strings:
```js
strings: [
  "AI Engineer",
  "GenAI Developer",
  "ML Researcher",
  "Teaching Assistant @ UMD",
]
```

### Home2.js — Bio Rewrite
**Target text:**

> Hi, I'm **Dakshi Goel** from India — currently in my second year of an MS in Data Science at the **University of Maryland**, where I also serve as a **Teaching Assistant** for Introduction to Data Science. I maintain a 4.0 GPA and spend most of my time building AI systems that actually work in the real world.
>
> I've been building with machine learning since my first year of undergrad and haven't stopped since — from LLM pipelines and agentic systems to deep learning research and forecasting models.
>
> When I'm not training models or debugging pipelines, you'll find me on the ping pong table 🏓, dancing, or planning my next trip ✈️.

Keep the education logo section (UMD + IIT Jammu) — update UMD line to show GPA 4.0.

---

## Phase 4 — Skills & Tools Section

### Techstack.js — Replace/Add
**Keep:** Python, C++, MySQL, PyTorch, TensorFlow, NumPy, Pandas, FastAPI, OpenAI
**Add:**
- Docker (`SiDocker`)
- LangChain (`SiLangchain`) — check if icon available in react-icons
- HuggingFace (`SiHuggingface`)
- Scikit-learn (`SiScikitlearn`)
- PostgreSQL (`SiPostgresql`) — replace MySQL or add alongside
**Remove:** Keras (subsumed by TensorFlow/PyTorch in resume)

### Toolstack.js — Replace/Add
**Remove:** Slack, macOS (irrelevant to AI brand)
**Keep:** VS Code, Jupyter, Google Colab, Postman, AWS Lambda, GitHub, Metabase, AWS
**Add:**
- MLflow (`SiMlflow`) — on resume under Programming & Deployment
- Docker (`SiDocker`) — key deployment tool
- Linux (`SiLinux`) — on resume

---

## Phase 5 — Cosmetic / UX Improvements

### 5.1 Hero CTA Buttons (Home.js)
Add below typewriter:
```jsx
<Button variant="outline-light" href="/project" className="hero-cta-btn">
  View My Work
</Button>
<Button variant="light" href="/resume" className="hero-cta-btn ms-3">
  Resume
</Button>
```

### 5.2 Skill Icon Labels — Always Visible
`style.css`: make `.tech-label` always visible (opacity: 1, static position, display: block below icon).
Don't hide the icon SVG on hover — just highlight the card.

### 5.3 Indian Patent Badge on Research Card
`Projects.js`: Add a styled badge chip on the underwater enhancement card:
```jsx
<span className="patent-badge">🏅 Indian Patent · No. 202411053490</span>
```

### 5.4 Contact Info in Footer or Home2
Add email link `dakshi22@umd.edu` to the social icons row in Home2.js.
Use `AiOutlineMail` from react-icons/ai.

---

## Phase 6 — SEO / Meta (Low Priority, do last)

- Update `public/index.html` title: `Dakshi Goel | AI Engineer & MS Data Science @ UMD`
- Add meta description: MS Data Science student at UMD (4.0 GPA), AI engineer, IEEE author, Indian patent holder. Building LLM systems, agentic AI, and deep learning models.
- Add Open Graph tags (og:title, og:description, og:image)

---

## Execution Order

```
Phase 1 (Experience)  →  Phase 3 (Bio/Home)  →  Phase 4 (Skills)
→  Phase 2 (Projects)  →  Phase 5 (UX polish)  →  Phase 6 (SEO)
```

---

## Files to Touch

| Phase | Files |
|-------|-------|
| 1 | `src/components/Experience/Experience.js` |
| 2 | `src/components/Projects/Projects.js` |
| 3 | `src/components/Home/Type.js`, `src/components/Home/Home2.js` |
| 4 | `src/components/About/Techstack.js`, `src/components/About/Toolstack.js` |
| 5 | `src/components/Home/Home.js`, `src/style.css`, `src/components/Projects/Projects.js`, `src/components/Home/Home2.js` |
| 6 | `public/index.html` |

---

## Resume PDF
- Source: `build/Resume_DakshiGoel.pdf` (already updated)
- Must copy to: `public/Resume_DakshiGoel.pdf` (used by the embed in ResumeNew.js)
- Must copy to: `src/Assets/Resume_DakshiGoel.pdf` (imported in some components)
- Run: `cp build/Resume_DakshiGoel.pdf public/Resume_DakshiGoel.pdf`

---

## Open Questions (resolved)
- ✅ Current status: 2nd semester MS DS at UMD, Teaching Assistant, GPA 4.0 — NOT job-seeking
- ✅ Resume PDF: already in build/ — needs copying to public/ and src/Assets/
- ✅ Branding: AI Engineer / ML Researcher, not "Product Associate"
- ✅ GitHub projects: mock_interview_agent, VGGT-Underwater-3D, Consumer-Complaints-Pipeline, LLM Fingerprinting

## Open Questions (still pending)
- Exact GitHub URL for LLM Fingerprinting project (likely 602_datascience_project — confirm)
- Remove or keep Audio Quality Assessment in Recent Works?
- Remove or keep Age/Gender Prediction in Recent Works? (strong achievement but 2021)
