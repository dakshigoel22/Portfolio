import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiFillInstagram, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const featuredProjects = [
  {
    title: "Consumer Complaints Pipeline",
    description:
      "Agentic pipeline that classifies customer complaints using LLMs, routes tickets with structured reasoning and confidence scoring.",
    ghLink:
      "https://github.com/dakshigoel22/Consumer-Complaints-Classification-Agentic-Pipeline",
    tags: ["Agentic AI", "LLM", "Python"],
    scope: "Project",
  },
  {
    title: "Mock Interview Agent",
    description:
      "Multi-agent mock interview bot built with LiveKit. Conducts real-time voice interviews and provides structured LLM-evaluated feedback.",
    ghLink: "https://github.com/dakshigoel22/mock_interview_agent",
    tags: ["LiveKit", "LLM Agents", "Python"],
    scope: "Project",
  },
  {
    title: "Voice Agent for Real Estate",
    description:
      "Voice-powered real estate search with hybrid semantic search across 100+ US properties. Real-time conversational updates and smart rankings.",
    ghLink: "https://github.com/dakshigoel22/real_hackathon25",
    demoLink: "https://real-hackathon25-1.onrender.com/",
    tags: ["LiveKit", "RAG", "FastAPI", "Vector Search"],
    scope: "Hackathon",
  },
];

const STATS = [
  { value: "1+", label: "Years Experience" },
  { value: "4+", label: "Projects Shipped" },
  { value: "2", label: "Papers Published" },
  { value: "4.0", label: "GPA at UMD" },
];

function Home2() {
  return (
    <div className="featured-works-section" id="about">
      <Container>
        {/* Stats bar */}
        <div className="stats-bar">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <p className="featured-label">SOME OF MY LATEST WORK</p>
        <Row style={{ justifyContent: "center" }}>
          {featuredProjects.map((proj, idx) => (
            <Col md={4} key={idx} className="featured-card-col">
              <div className="featured-card">
                <div className="featured-card-header">
                  <span className="featured-scope-badge">{proj.scope}</span>
                </div>
                <h3 className="featured-card-title">{proj.title}</h3>
                <p className="featured-card-desc">{proj.description}</p>
                <div className="featured-card-tags">
                  {proj.tags.map((t, i) => (
                    <span key={i} className="featured-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="featured-card-links">
                  <a
                    href={proj.ghLink}
                    target="_blank"
                    rel="noreferrer"
                    className="featured-link"
                  >
                    ↗ Code
                  </a>
                  {proj.demoLink && (
                    <a
                      href={proj.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="featured-link"
                    >
                      ↗ Live
                    </a>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div className="featured-view-all">
          <a href="/project" className="view-all-link">
            View all projects{" "}
            <HiArrowRight style={{ verticalAlign: "middle" }} />
          </a>
        </div>

        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect</span> with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/dakshigoel22"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/dakshi-iit/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/dakshigoel"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="mailto:dakshi22@umd.edu"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineMail />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home2;
