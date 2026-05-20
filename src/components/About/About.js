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
          <span className="about-card-label">📍 LOCATION · MARYLAND, USA</span>
          <div className="about-location-main">MARYLAND</div>
          <div className="about-location-sub">
            38.9897° N, 76.9378° W
          </div>
          <div className="about-location-sub2">College Park, MD · From India</div>
        </div>

        <div className="about-card about-card-bio">
          <span className="about-card-label">/ ABOUT</span>
          <p className="about-bio-text">
            MS Data Science at University of Maryland (4.0 GPA), B.Tech EE &amp; CS from IIT Jammu.
            I'm genuinely curious about AI — I love picking up new tools, exploring new frameworks, and figuring out how things work. Getting better every day is the goal.
          </p>
          <p className="about-bio-quote">"Curiosity is the engine, growth is the destination."</p>
        </div>
      </div>

      <div className="about-cards-bottom">
        <div className="about-card about-card-mini">
          <span className="about-card-mini-title">GROWTH</span>
          <p>Better every day — learning new AI tools, exploring the frontier, and building on what I discover.</p>
        </div>
        <div className="about-card about-card-mini">
          <span className="about-card-mini-title">FOCUS</span>
          <p>Curiosity drives me. I dig into new tools, frameworks, and papers because understanding things deeply is the only way I know how to work.</p>
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
