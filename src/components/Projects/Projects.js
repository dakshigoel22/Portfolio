import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import voice_agent from "../../Assets/Projects/Voice_Agent.png";
import flipkart_grid from "../../Assets/Projects/flipkart_grid.png";
import research_2 from "../../Assets/Projects/research_2.png";
import age_gender from "../../Assets/Projects/age_gender.png";
import research_1 from "../../Assets/Projects/research_1.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>

        {/* Research Section */}
        <div className="research-section">
          <h1 className="project-heading" style={{ paddingTop: "50px" }}>
            My <strong className="purple">Research </strong>
          </h1>
        <p style={{ color: "#333333" }}>
          Here are some of my research projects and publications.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={6} className="project-card">
            <ProjectCard
              imgPath={research_1}
              isBlog={false}
              isResearch={true}
              title="Illumination Aware Multi-scale Attention Fusion Model for Underwater Image Enhancement"
              subheading="IEEE Transactions on Artificial Intelligence | Indian patent (No.202411053490)"
              description="The paper introduces an illumination-aware, multi-scale attention-based fusion network to enhance underwater images by correcting color distortions, restoring textures, and preserving structural details. Achieved state-of-the-art performance on multiple benchmarks, outperforming existing methods by over 7 dB in PSNR."
              ghLink="https://github.com/yourusername/underwater-enhancement"
              // demoLink=""
            />
          </Col>

          <Col md={6} className="project-card">
            <ProjectCard
              imgPath={research_2}
              isBlog={false}
              isResearch={true}
              title="Remote sensing data processing using convolutional neural networks for mapping alteration zones"
              subheading="Machine Intelligence for GeoAnalytics and Remote Sensing (MIGARS) 2024"
              description="The paper applies CNNs to satellite data (Landsat 8/9, ASTER) for geological mapping in Broken Hill, Australia. CNNs significantly improve the detection of alteration zones linked to mineralisation, outperforming traditional methods and enhancing mapping accuracy."
              ghLink="https://github.com/dakshigoel22/deeplearning_alteration_zones"
              demoLink="https://ieeexplore.ieee.org/document/10544529"
            />
          </Col>
          
        </Row>
        </div>

        {/* Recent Works Section */}
        <div className="works-section">
          <h1 className="project-heading">
            My Recent <strong className="purple">Works </strong>
          </h1>
        <p style={{ color: "#333333" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={voice_agent}
              isBlog={false}
              title="Voice Agent for Real Estate"
              description="Built a voice-powered real estate search assistant, with hybrid semantic search across 100+ US properties. Provides Ranking system with real-time conversational updates and smart recommendations."
              ghLink="https://github.com/dakshigoel22/real_hackathon25"
              demoLink="https://real-hackathon25-1.onrender.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={flipkart_grid}
              isBlog={false}
              title="Flipkart Grid Challenge"
              description="Developed text-to-SQL LLM to interact with user metadata in Postgres DB. Fine-tuned LLaMA-2 on custom-generated data for recommendations and utilized Redis vector for low latency."
              ghLink="https://github.com/dakshigoel22/FlipkartGrid5"
              // demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={age_gender}
              isBlog={false}
              title="Age and Gender Prediction"
              description=" Deployed ESRGANs to detect age and gender from low-quality surveillance video feed.Used RetinaFace, and a weighted regression cum classification model for face detection, increasing the F1 score by 0.1."
              ghLink="https://github.com/dakshigoel22/BOSCH-Mid-Prep-IIT-Jammu"
              // demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>

        </Row>
        </div>

      </Container>
    </Container>
  );
}

export default Projects;
