import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";

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
                title="Illumination Aware Multi-scale Attention Fusion for Underwater Image Enhancement"
                subheading="IEEE Transactions on Artificial Intelligence · Indian Patent No. 202411053490"
                description="Illumination-aware, multi-scale attention-based fusion network to enhance underwater images — corrects color distortions, restores textures, preserves structure. Outperforms existing methods by 7+ dB PSNR on multiple benchmarks."
                ghLink="https://github.com/yourusername/underwater-enhancement"
                badge="🏅 Indian Patent · No. 202411053490"
                techStack={["PyTorch", "Attention Nets", "Image Processing", "IEEE"]}
              />
            </Col>

            <Col md={6} className="project-card">
              <ProjectCard
                isBlog={false}
                isResearch={true}
                title="Remote Sensing + CNNs for Geological Alteration Zone Mapping"
                subheading="Machine Intelligence for GeoAnalytics and Remote Sensing (MIGARS) 2024"
                description="Applies CNNs to Landsat 8/9 and ASTER satellite data for geological mapping in Broken Hill, Australia. Significantly improves detection of alteration zones linked to mineralisation over traditional methods."
                ghLink="https://github.com/dakshigoel22/deeplearning_alteration_zones"
                demoLink="https://ieeexplore.ieee.org/document/10544529"
                techStack={["PyTorch", "CNN", "Remote Sensing", "Satellite Data"]}
              />
            </Col>
          </Row>
        </div>

        {/* UMD Projects */}
        <div className="works-section">
          <h1 className="project-heading">
            UMD <strong className="purple">Projects</strong>
          </h1>
          <p style={{ color: "#555" }}>
            Projects from my MS in Data Science at the University of Maryland.
          </p>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={6} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="ML"
                title="LLM Fingerprinting: Identifying the Author Through Text Analysis"
                subheading="UMD Course Project · Sept 2025 – Dec 2025"
                description="82% classification accuracy across 7 LLMs and a human author using DeepNN on the MGTBench dataset. Extracted 10+ semantic and stylometric features; identified perplexity as the key discriminating feature."
                ghLink="https://github.com/dakshigoel22/602_datascience_project"
                techStack={["Python", "DeepNN", "NLTK", "Scikit-learn"]}
              />
            </Col>

            <Col md={6} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="Research"
                title="Underwater 3D Reconstruction"
                subheading="Perception and Robotics Group, UMD · Sept 2025 – Present"
                description="Parallelized training of SOTA 3D reconstruction transformers across 4 GPUs using Distributed Data Parallel. Modified model architectures to generate metric depth maps from underwater images."
                ghLink="https://github.com/dakshigoel22/VGGT-Underwater-3D-reconstruction"
                techStack={["PyTorch", "DDP", "Depth Pro", "Vision"]}
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
            Applied AI and engineering projects.
          </p>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="GenAI"
                title="Voice Agent for Real Estate"
                description="Voice-powered real estate search with hybrid semantic search across 100+ US properties. Real-time conversational updates, smart recommendations, and ranking system."
                ghLink="https://github.com/dakshigoel22/real_hackathon25"
                demoLink="https://real-hackathon25-1.onrender.com/"
                techStack={["LiveKit", "RAG", "FastAPI", "Vector Search"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="GenAI"
                title="Mock Interview Agent"
                description="Multi-agent mock interview bot built with LiveKit. Conducts real-time voice interviews, evaluates responses, and provides structured LLM-powered feedback."
                ghLink="https://github.com/dakshigoel22/mock_interview_agent"
                techStack={["LiveKit", "LangGraph", "LLM", "Python"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="GenAI"
                title="Consumer Complaints Classification — Agentic Pipeline"
                description="Agentic pipeline that automatically classifies customer complaints using LLMs. Routes tickets to appropriate departments with structured reasoning and confidence scoring."
                ghLink="https://github.com/dakshigoel22/Consumer-Complaints-Classification-Agentic-Pipeline"
                techStack={["LangChain", "LLM", "FastAPI", "Python"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="ML"
                title="Flipkart Grid Challenge"
                description="Text-to-SQL LLM to query user metadata in PostgreSQL. Fine-tuned LLaMA-2 for recommendations; used Redis vector store for low-latency retrieval."
                ghLink="https://github.com/dakshigoel22/FlipkartGrid5"
                techStack={["LLaMA-2", "PostgreSQL", "Redis", "FastAPI"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="ML"
                title="Audio Quality Assessment"
                description="Transformer-based deep learning approach to audio quality scoring. Outperforms traditional signal processing methods on standard speech quality benchmarks."
                ghLink="https://github.com/dakshigoel22/audio-quality-assessment"
                techStack={["PyTorch", "Transformer", "Audio DSP", "Python"]}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                isBlog={false}
                scope="CV"
                title="Age and Gender Prediction"
                description="Deployed ESRGANs for super-resolution of low-quality surveillance feeds. Used RetinaFace detection + weighted regression-classification model — F1 score +0.1."
                ghLink="https://github.com/dakshigoel22/BOSCH-Mid-Prep-IIT-Jammu"
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
