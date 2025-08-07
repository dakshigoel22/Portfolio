import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
// import Aboutcard from "./AboutCard";
import myImg from "../../Assets/myImg.png";
import Toolstack from "./Toolstack";
import LeadershipRoles from "./LeadershipRoles";
import Achievements from "./Achievements";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        {/* <Row style={{ justifyContent: "center", padding: "10px" }} className="about-intro-section">
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="purple">I'M</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={3}
            style={{ paddingTop: "1px", paddingBottom: "25px" }}
            className="about-img"
          >
            <img src={myImg} alt="about" className="img-fluid" />
          </Col>
        </Row> */}
        <h1 className="project-heading" id="skillset">
          Professional <strong className="purple">Skillset </strong>
        </h1>

        <Techstack />

        <h1 className="project-heading" id="tools">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack />
  
        <LeadershipRoles />
        <Achievements />

        {/* <Github /> */}
      </Container>
    </Container>
  );
}

export default About;
