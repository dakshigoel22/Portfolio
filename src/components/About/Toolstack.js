import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  // SiVercel,
  SiMacos,
  SiJupyter,
  SiGooglecolab,
  SiAwslambda
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        <Col xs={4} md={2} className="tech-icons">
          <SiGooglecolab />
          <span className="tech-label">Google Colab</span>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiJupyter />
          <span className="tech-label">Jupyter</span>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiVisualstudiocode />
          <span className="tech-label">VS Code</span>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiPostman />
          <span className="tech-label">Postman</span>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiAwslambda />
          <span className="tech-label">AWS Lambda</span>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiSlack />
          <span className="tech-label">Slack</span>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiMacos />
          <span className="tech-label">macOS</span>
        </Col>
      </Row>

  );
}

export default Toolstack;
