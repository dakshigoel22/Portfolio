import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";

import {
  DiPython,
} from "react-icons/di";
import {
  SiMysql,
  SiTensorflow,
  SiPytorch,
  SiKeras,
  SiNumpy,
  // SiLangchain,
  SiFastapi,
  SiPandas
} from "react-icons/si";
import { TbBrandGolang } from "react-icons/tb";

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
        <SiPandas />
        <span className="tech-label">Pandas</span>
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
        <SiNumpy />
        <span className="tech-label">NumPy</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiKeras />
        <span className="tech-label">Keras</span>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFastapi />
        <span className="tech-label">FastAPI</span>
      </Col>
    </Row>
  );
}

export default Techstack;
