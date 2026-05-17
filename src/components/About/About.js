import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import Achievements from "./Achievements";

function AboutHero() {
  return (
    <section className="about-hero">
      <p className="about-hero-eyebrow">WHO I AM</p>
      <h1 className="about-hero-heading">About Me.</h1>

      <div className="about-cards-top">
        <div className="about-card about-card-location">
          <span className="about-card-label">📍 LOCATION · INDIA</span>
          <div className="about-location-main">INDIA</div>
          <div className="about-location-sub">
            28.6139° N, 77.2090° E
          </div>
          <div className="about-location-sub2">College Park, MD</div>
        </div>

        <div className="about-card about-card-bio">
          <span className="about-card-label">/ ABOUT</span>
          <p className="about-bio-text">
            MS Data Science at University of Maryland (4.0 GPA). B.Tech in EE &amp; CS from IIT Jammu.
            Building AI at the intersection of research and production — LLMs, RAG pipelines, voice agents, forecasting.
          </p>
          <p className="about-bio-quote">"Where precision meets creativity."</p>
        </div>
      </div>

      <div className="about-cards-bottom">
        <div className="about-card about-card-mini">
          <span className="about-card-mini-title">GROWTH</span>
          <p>Explorer of AI systems, driven by curiosity and a relentless drive to understand.</p>
        </div>
        <div className="about-card about-card-mini">
          <span className="about-card-mini-title">FOCUS</span>
          <p>Depth over breadth — ship things that matter, build for impact.</p>
        </div>
        <div className="about-card about-card-mini">
          <span className="about-card-mini-title">CRAFT</span>
          <p>Precision in every model, every line of code.</p>
        </div>
      </div>

      <div className="about-hero-cta">
        <Button
          as={Link}
          to="/resume"
          className="about-resume-btn"
        >
          View Resume →
        </Button>
      </div>
    </section>
  );
}

function About() {
  return (
    <Container fluid className="about-section">
      <Container>
        <AboutHero />

        <h1 className="project-heading" id="skillset">
          Professional <strong className="purple">Skillset</strong>
        </h1>
        <Techstack />

        <h1 className="project-heading" id="tools">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack />

        <Achievements />
      </Container>
    </Container>
  );
}

export default About;
