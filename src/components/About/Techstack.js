import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import { DiPython } from "react-icons/di";
import {
  SiMysql,
  SiTensorflow,
  SiPytorch,
  SiNumpy,
  SiFastapi,
  SiPandas,
  SiOpenai,
  SiDocker,
  SiScikitlearn,
  SiPostgresql,
} from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <DiPython />
        <span className="tech-label">Python</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <CgCPlusPlus />
        <span className="tech-label">C++</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMysql />
        <span className="tech-label">MySQL</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostgresql />
        <span className="tech-label">PostgreSQL</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPandas />
        <span className="tech-label">Pandas</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNumpy />
        <span className="tech-label">NumPy</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTensorflow />
        <span className="tech-label">TensorFlow</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPytorch />
        <span className="tech-label">PyTorch</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiScikitlearn />
        <span className="tech-label">Scikit-learn</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFastapi />
        <span className="tech-label">FastAPI</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiOpenai />
        <span className="tech-label">OpenAI</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker />
        <span className="tech-label">Docker</span>
      </Col>
    </Row>
  );
}

export default Techstack;
