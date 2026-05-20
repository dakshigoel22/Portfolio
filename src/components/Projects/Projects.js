import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";

import voiceAgent from "../../Assets/Projects/Voice_Agent.png";
import ageGender from "../../Assets/Projects/age_gender.png";
import audio from "../../Assets/Projects/audio.png";
import flipkart from "../../Assets/Projects/flipkart_grid.png";
import research1 from "../../Assets/Projects/research_1.png";
import research2 from "../../Assets/Projects/research_2.png";
import codeEditor from "../../Assets/Projects/codeEditor.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>

        {/* Research Section */}
        <div className="research-section">
          <h1 className="project-heading" style={{ paddingTop: "50px" }}>
            My <strong className="purple">Research</strong>
          </h1>
          <p style={{ color: "#555" }}>
            Research projects and peer-reviewed publications.
          </p>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={6} className="project-card">
              <ProjectCard
                isBlog={false}
                isResearch={true}
                imgPath={research1}
                title="Illumination Aware Multi-scale Attention Fusion for Underwater Image Enhancement"
                subheading="IEEE Transactions on Artificial Intelligence · Indian Patent No. 202411053490"
                description="Illumination-aware, multi-scale attention-based fusion network to enhance underwater images — corrects color distortions, restores textures, preserves structure."
                ghLink="https://github.com/yourusername/underwater-enhancement"
                badge="🏅 Indian Patent · No. 202411053490"
                highlights={[
                  "Outperforms existing methods by 7+ dB PSNR on multiple benchmarks",
                  "Corrects color distortions and restores textures",
                  "IEEE Transactions on Artificial Intelligence",
                ]}
                techStack={["PyTorch", "Attention Nets", "Image Processing", "IEEE"]}
              />
            </Col>

            <Col md={6} className="project-card">
              <ProjectCard
                isBlog={false}
                isResearch={true}
                imgPath={research2}
                title="Remote Sensing + CNNs for Geological Alteration Zone Mapping"
                subheading="Machine Intelligence for GeoAnalytics and Remote Sensing (MIGARS) 2024"
                description="Applies CNNs to Landsat 8/9 and ASTER satellite data for geological mapping in Broken Hill, Australia."
                ghLink="https://github.com/dakshigoel22/deeplearning_alteration_zones"
                demoLink="https://ieeexplore.ieee.org/document/10544529"
                highlights={[
                  "Significantly improves detection of alteration zones",
                  "Landsat 8/9 + ASTER multi-sensor fusion",
                  "Links mineralisation to geological structure",
                ]}
                techStack={["PyTorch", "CNN", "Remote Sensing", "Satellite Data"]}
              />
            </Col>
          </Row>
        </div>

        {/* Recent Works */}
        <div className="works-section">
          <h1 className="project-heading">
            My Recent <strong className="purple">Works</strong>
          </h1>
          <p style={{ color: "#555" }}>
            Applied AI, ML research, and engineering projects.
          </p>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="ML"
                imgPath={codeEditor}
                title="LLM Fingerprinting: Identifying the Author Through Text Analysis"
                subheading="UMD Course Project · Sept 2025 – Dec 2025"
                description="82% classification accuracy across 7 LLMs and a human author using DeepNN on the MGTBench dataset."
                ghLink="https://github.com/dakshigoel22/602_datascience_project"
                highlights={[
                  "82% accuracy across 7 LLMs + human baseline",
                  "Perplexity identified as key discriminating feature",
                  "10+ semantic & stylometric features extracted",
                ]}
                techStack={["Python", "DeepNN", "NLTK", "Scikit-learn"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="Research"
                imgPath={research1}
                title="Underwater 3D Reconstruction"
                subheading="Perception and Robotics Group, UMD · Sept 2025 – Present"
                description="Parallelized training of SOTA 3D reconstruction transformers across 4 GPUs using Distributed Data Parallel."
                ghLink="https://github.com/dakshigoel22/VGGT-Underwater-3D-reconstruction"
                highlights={[
                  "4-GPU DDP parallel training pipeline",
                  "Modified VGGT for metric depth from underwater scenes",
                  "Underwater domain adaptation for 3D vision",
                ]}
                techStack={["PyTorch", "DDP", "Depth Pro", "Vision"]}
              />
            </Col>
            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="GenAI"
                imgPath={voiceAgent}
                title="Voice Agent for Real Estate"
                description="Voice-powered real estate search with hybrid semantic search across 100+ US properties."
                ghLink="https://github.com/dakshigoel22/real_hackathon25"
                demoLink="https://real-hackathon25-1.onrender.com/"
                highlights={[
                  "Hybrid semantic search across 100+ properties",
                  "Real-time conversational updates & ranking",
                  "Smart recommendations engine",
                ]}
                techStack={["LiveKit", "RAG", "FastAPI", "Vector Search"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="GenAI"
                imgPath={codeEditor}
                title="Mock Interview Agent"
                description="Multi-agent mock interview bot built with LiveKit. Conducts real-time voice interviews and provides structured LLM-powered feedback."
                ghLink="https://github.com/dakshigoel22/mock_interview_agent"
                highlights={[
                  "Multi-agent voice interview flow via LiveKit",
                  "Real-time response evaluation",
                  "Structured LLM-powered feedback report",
                ]}
                techStack={["LiveKit", "LangGraph", "LLM", "Python"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="GenAI"
                imgPath={codeEditor}
                title="Consumer Complaints Classification — Agentic Pipeline"
                description="Agentic pipeline that automatically classifies customer complaints using LLMs with structured reasoning."
                ghLink="https://github.com/dakshigoel22/Consumer-Complaints-Classification-Agentic-Pipeline"
                highlights={[
                  "Auto-routes tickets to correct departments",
                  "Confidence scoring with chain-of-thought",
                  "Handles ambiguous multi-category complaints",
                ]}
                techStack={["LangChain", "LLM", "FastAPI", "Python"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="ML"
                imgPath={flipkart}
                title="Flipkart Grid Challenge"
                description="Text-to-SQL LLM to query user metadata in PostgreSQL. Fine-tuned LLaMA-2 for recommendations."
                ghLink="https://github.com/dakshigoel22/FlipkartGrid5"
                highlights={[
                  "Text-to-SQL over PostgreSQL user metadata",
                  "Fine-tuned LLaMA-2 recommendation model",
                  "Redis vector store for low-latency retrieval",
                ]}
                techStack={["LLaMA-2", "PostgreSQL", "Redis", "FastAPI"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="ML"
                imgPath={audio}
                title="Audio Quality Assessment"
                description="Transformer-based deep learning approach to audio quality scoring on standard speech quality benchmarks."
                ghLink="https://github.com/dakshigoel22/audio-quality-assessment"
                highlights={[
                  "Transformer architecture for quality scoring",
                  "Outperforms traditional DSP baselines",
                  "Evaluated on standard speech benchmarks",
                ]}
                techStack={["PyTorch", "Transformer", "Audio DSP", "Python"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="CV"
                imgPath={ageGender}
                title="Age and Gender Prediction"
                description="ESRGAN super-resolution preprocessing of low-quality surveillance feeds with RetinaFace detection."
                ghLink="https://github.com/dakshigoel22/BOSCH-Mid-Prep-IIT-Jammu"
                highlights={[
                  "ESRGAN super-resolution for surveillance feeds",
                  "RetinaFace detection pipeline",
                  "F1 score improved by +0.1 over baseline",
                ]}
                techStack={["ESRGAN", "RetinaFace", "PyTorch", "OpenCV"]}
              />
            </Col>
          </Row>
        </div>

      </Container>
    </Container>
  );
}

export default Projects;
