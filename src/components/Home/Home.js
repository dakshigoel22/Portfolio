import React, { useRef, useEffect } from "react";
import Home2 from "./Home2";
import myImgAI from "../../Assets/myImgAI.png";
import myImg    from "../../Assets/myImg.png";

// Both images are 1024×1536 = 2:3 ratio — face centered at ~50% horizontal
const IMG_ASPECT = 2 / 3;

function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const leftPanel  = hero.querySelector(".face-left-panel");
    const rightPanel = hero.querySelector(".face-right-panel");
    const leftLabel  = hero.querySelector(".face-label-left");
    const rightLabel = hero.querySelector(".face-label-right");

    let w      = hero.offsetWidth;
    let h      = hero.offsetHeight;
    let xp     = w / 2;
    let relX   = w / 2;

    // Panel width = half the image's displayed width so face center sits at inner edge
    // Image displayed width when scaled to fill panel height = h * IMG_ASPECT
    const calcBase = () => h * IMG_ASPECT / 2;
    // Margin from each edge so the pair is centered
    const calcPos  = () => Math.max(8, (w - h * IMG_ASPECT) / 2);

    const applyBase = () => {
      const base = calcBase();
      const pos  = calcPos();
      leftPanel.style.width  = base + "px";
      leftPanel.style.left   = pos  + "px";
      rightPanel.style.width = base + "px";
      rightPanel.style.right = pos  + "px";
      xp   = w / 2;
      relX = w / 2;
    };

    const sync = () => {
      w = hero.offsetWidth;
      h = hero.offsetHeight;
      applyBase();
    };

    applyBase();

    const onMove  = (e) => {
      relX = e.clientX - hero.getBoundingClientRect().left;
    };
    const onLeave = () => { relX = w / 2; };

    hero.addEventListener("mousemove",  onMove);
    hero.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize",   sync);

    // ~30fps Zeno's paradox smoothing
    const interval = setInterval(() => {
      xp += (relX - xp) / 12;

      const center = w / 2;
      const offset = center - xp;   // positive = mouse left of center
      const base   = calcBase();
      const pos    = calcPos();

      const newLW = Math.max(0, base + offset * 0.55);
      const newRW = Math.max(0, base - offset * 0.55);

      leftPanel.style.width  = newLW + "px";
      leftPanel.style.left   = (pos  + offset * 0.04) + "px";
      leftPanel.style.zIndex = offset > 0 ? 2 : 1;

      rightPanel.style.width = newRW + "px";
      rightPanel.style.right = (pos  - offset * 0.04) + "px";
      rightPanel.style.zIndex = offset < 0 ? 2 : 1;

      // Labels fade: hovered side → 1.0, opposite → 0.25
      const t = Math.min(1, Math.max(-1, offset / center));
      leftLabel.style.opacity  = (0.625 + t * 0.375).toFixed(3);
      rightLabel.style.opacity = (0.625 - t * 0.375).toFixed(3);
    }, 33);

    return () => {
      clearInterval(interval);
      hero.removeEventListener("mousemove",  onMove);
      hero.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize",   sync);
    };
  }, []);

  return (
    <section>
      <div className="hero-face-section" id="home" ref={heroRef}>

        {/* Left label — AI Engineer */}
        <div className="face-label face-label-left">
          <div className="hero-title">
            <span className="hero-title-ai">AI</span>
            <span className="hero-title-eng">Engineer</span>
          </div>
          <p className="hero-subtext">GenAI · LLMs · Research</p>
          <div className="hero-cta-row">
            <a href="/project" className="hero-btn-primary">View My Work</a>
            <a href="/resume"  className="hero-btn-outline">Resume</a>
          </div>
        </div>

        {/* Left image — illustrated, object-position LEFT so face LEFT half is visible */}
        <div className="face-img-panel face-left-panel">
          <img src={myImgAI} alt="AI" className="face-img face-img-ai" />
        </div>

        {/* Right image — real photo, object-position RIGHT so face RIGHT half is visible */}
        <div className="face-img-panel face-right-panel">
          <img src={myImg} alt="Researcher" className="face-img face-img-real" />
        </div>

        {/* Right label — ML Researcher (same typographic style as left) */}
        <div className="face-label face-label-right">
          <div className="hero-title">
            <span className="hero-title-ai">ML</span>
            <span className="hero-title-eng">Researcher</span>
          </div>
          <p className="hero-subtext">UMD · GPA 4.0 · TA</p>
        </div>

      </div>
      <Home2 />
    </section>
  );
}

export default Home;
