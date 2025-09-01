import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ExperienceCard from "./ExperienceCard";
import Particle from "../Particle";
import "./Experience.css";
// Import company logos here once you add them to Assets folder
import companyLogo1 from "../../Assets/real_logo.png";
import companyLogo2 from "../../Assets/mozrest_logo.png";
import companyLogo3 from "../../Assets/Infineon_logo.svg";
import companyLogo4 from "../../Assets/LTIMindtree_logo.svg.png";


function Experience() {
  const experiences = [
    {
      role: "AI Product Associate",
      company: "The Real Brokerage",
      duration: "December 2024 - August 2025",
      location: "Florida (Remote)",
      logo: companyLogo1, // Uncomment and add your company logo
      description: [
        "Analyzed 10,000+ chatbot conversations through Langfuse to resolve intent routing failures, using pattern matching (regex) and vector search .",
        "Implemented structured Q-tags to enrich chunks. Increased retrieval and routing accuracy by 20% " , 
        "Enhanced LLM generation by designing few-shot, table-structured prompts and refining API trigger logic with context aware reranking, reducing null/incorrect responses by 25% while improving end-to-end chatbot reliability.",
        "Won AI hackathon, recieved a cash award as the top 10 by building a platform to automate data annotation."
      ],
      technologies: ["Metabase", "GPT-4.0", "Prompt Engineering", "Langfuse", "Docker", "Datadog", "RAG"]
    },
    {
      role: "Junior AI Developer",
      company: "Mozrest",
      duration: "December 2023 - December 2024",
      location: "London (Remote)",
      logo: companyLogo2, // Uncomment and add your university/lab logo
      description: [
        "Designed and deployed a GPT-3.5 Turbo for a task-oriented dialogue system with LangGraph on WhatsApp, integrating Stripe",
        "Built a review response generation tool using few-shot prompting with sentiment control using GPT",
        "Trained and deployed forecasting models (ARIMA + LSTM) for restaurant sales and slot availability, achieving RMSE 7.2 and 93% accuracy while reducing latency by 125 ms through optimized 3,000-feature pipelines on AWS Lambda."
      ],
      technologies: ["Python", "TensorFlow", "AWS Sagemaker", "AWS Lambda", "Time Series Forecasting", "Data Engineering"]
    },
    {
      role: "AI Engineer Intern",
      company: "Infineon",
      duration: "July 2023 - December 2023 ",
      location: "Banglore, India",
      logo: companyLogo3, // Uncomment and add your university/lab logo
      description: [
        "Fine-tuned the T5 transformer model for translation, summarization, and QnA tasks on semiconductor datasheets.",
        "Achieved a BLEU score of 0.65. Deployed using FastAPI, integrating it into Infineon’s no-code/low-code platform."
      ],
      technologies: ["RAG", "FAIS Vector Store", "FASTAPI", "Transformers"]
    },
    {
      role: "Project Intern",
      company: "LTIMindtree",
      duration: "May 2023- July 2023",
      location: "Banglore, India",
      logo: companyLogo4, // Uncomment and add your university/lab logo
      description: [
        "Implemented RAG pipeline and fine-tuned Llama2 13B model for code generation for Snowpark.",
        "Reduced hallucination rates by 40% using chain-of-thought prompting. Developed UI using Streamlit and FastAPI."
      ],
      technologies: ["BeautifulSoup","Streamlit","LLama","HuggingFace"]
    },
    {
      role: "Intern",
      company: "Univ.AI",
      duration: "March 2021 - May 2021",
      location: "Remote",
      // logo: companyLogo5, // Uncomment and add your university/lab logo
      description: [
        "Composed 10+ detailed and interactive jupyter notebooks for the coursework targeting Data Science enthusiasts on Statistics, Data manipulation, and Exploratory Data Analysis.",
        "Worked on multiple datasets, performed EDA, calculated the statistical data, and implemented Python libraries like Numpy, Pandas, Matplotlib, Scikit-learn, Seaborn, and PyTorch"
      ],
      technologies: ["Matplotlib","Numpy", "Pandas" , "EDA"]
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