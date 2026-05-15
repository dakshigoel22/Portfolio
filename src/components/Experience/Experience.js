import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ExperienceCard from "./ExperienceCard";
import Particle from "../Particle";
import "./Experience.css";
import umdLogo from "../../Assets/umd_logo.svg.png";
import companyLogo1 from "../../Assets/real_logo.png";
import companyLogo2 from "../../Assets/mozrest_logo.png";
import companyLogo3 from "../../Assets/Infineon_logo.svg";
import companyLogo4 from "../../Assets/LTIMindtree_logo.svg.png";


function Experience() {
  const experiences = [
    {
      role: "Teaching Assistant",
      company: "University of Maryland",
      duration: "February 2026 – Present",
      location: "College Park, MD",
      logo: umdLogo,
      description: [
        "Assisting and grading 30+ students for Introduction to Data Science in the Computer Science department."
      ],
      technologies: ["Python", "Data Science", "Jupyter"]
    },
    {
      role: "AI Product Associate",
      company: "The Real Brokerage",
      duration: "December 2024 – August 2025",
      location: "Florida (Remote)",
      logo: companyLogo1,
      description: [
        "Optimized a hybrid vector search and reranking strategy, reducing query latency by 11%.",
        "Analyzed 10K+ real-time conversations using LangFuse to diagnose intent routing failures, collaborating with PMs.",
        "Won AI Hackathon (among 200+ employees) by building a data annotation tool to accelerate model training."
      ],
      technologies: ["LangFuse", "GPT-4", "RAG", "Vector Search", "Docker", "Datadog", "Prompt Engineering"]
    },
    {
      role: "AI Developer",
      company: "Mozrest",
      duration: "December 2023 – December 2024",
      location: "London (Remote)",
      logo: companyLogo2,
      description: [
        "Architected an agentic chatbot using GPT-3.5 Turbo and LangGraph for restaurant booking, integrated Stripe payment gateway, deployed on AWS.",
        "Created a restaurant review response generation chatbot using few-shot prompting on GPT-3.5, deployed via AWS Lambda.",
        "Built a restaurant sales forecasting model using ARIMA and LSTM, achieving RMSE 7.2 on 50+ daily bookings."
      ],
      technologies: ["Python", "LangGraph", "AWS Lambda", "AWS SageMaker", "ARIMA", "LSTM", "FastAPI"]
    },
    {
      role: "AI Innovation Intern",
      company: "Infineon",
      duration: "July 2023 – December 2023",
      location: "Bangalore, India",
      logo: companyLogo3,
      description: [
        "Developed RAG pipeline for QnA on semiconductor datasheets using LLaMA-13B + FAISS, achieving 0.65 BLEU score.",
        "Implemented T5 transformer and performed recursive chunking for translation and summarization on semiconductor data."
      ],
      technologies: ["RAG", "FAISS", "LLaMA", "FastAPI", "Transformers"]
    },
    {
      role: "Machine Learning Intern",
      company: "LTIMindtree",
      duration: "May 2023 – July 2023",
      location: "Bangalore, India",
      logo: companyLogo4,
      description: [
        "Implemented LLaMA-2 13B for code generation on scraped Snowpark data, reducing hallucinations by 38%.",
        "Built a Streamlit chatbot interface and integrated it with FastAPI, increasing user engagement by 20%."
      ],
      technologies: ["LLaMA-2", "Streamlit", "FastAPI", "HuggingFace", "BeautifulSoup"]
    }

  ];

  return (
    <Container fluid className="experience-section">
      <Particle />
      <Container>
        <h1 className="experience-heading">
          Professional <strong className="purple">Experience</strong>
        </h1>
        <p style={{ color: "#333333" }}>
          My professional journey and work experience.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {experiences.map((exp, index) => (
            <Col md={12} className="experience-card-wrapper" key={index}>
              <ExperienceCard
                role={exp.role}
                company={exp.company}
                duration={exp.duration}
                location={exp.location}
                logo={exp.logo}
                description={exp.description}
                technologies={exp.technologies}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Experience;