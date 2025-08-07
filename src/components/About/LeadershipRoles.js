import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ImPointRight } from "react-icons/im";
import leadership1 from "../../Assets/avatar.svg";
import leadership2 from "../../Assets/avatar.svg";

function LeadershipRoles() {
  return (
    <div className="leadership-section-wrapper" id="leadership">
      <h1 className="project-heading" style={{ paddingTop: "0px", marginBottom: "30px" }}>
        <strong className="purple">Leadership</strong> Roles
      </h1>
      <Container>
        <div className="leadership-list">
          <Row className="leadership-item" style={{ marginBottom: "40px", alignItems: "center" }}>
            <Col md={12} style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <ImPointRight className="purple" style={{ marginRight: "10px", marginTop: "3px" }} />
                <div style={{ flex: 1 }}>
                  <strong>Student Head Representative, Career Development Services, IIT Jammu</strong>
                  <span style={{ marginLeft: "10px", fontSize: "0.9em", color: "#666" }}>Oct 2023 - June 2024</span>
                  <p style={{ marginTop: "10px", marginBottom: "5px" }}>
                    • Led a team of 70+, sourced 350+ job opportunities, organized 30+ workshops, launched a CEO Leadership Talk series.
                  </p>
                  <p style={{ marginBottom: "10px" }}>
                    • Automated lead tracking, mass mailing list updates, and report generation, reducing manual processing time by 50%.
                  </p>
                  <a 
                    href="https://github.com/dakshigoel22/Certifications/blob/main/CDS24_head_coordinator_certificate.jpeg" 
                    target="_blank" 
                    rel="noreferrer"
                    className="certificate-link"
                  >
                    View Certificate →
                  </a>
                </div>
              </div>
            </Col>
            {/* <Col md={4} style={{ textAlign: "center" }}>
              <img 
                src={leadership1} 
                alt="Career Development Services" 
                className="leadership-img"
                style={{ 
                  width: "100%", 
                  maxWidth: "250px", 
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }} 
              />
            </Col> */}
          </Row>
          
          <Row className="leadership-item" style={{ marginBottom: "40px", alignItems: "center" }}>
            <Col md={12} style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <ImPointRight className="purple" style={{ marginRight: "10px", marginTop: "3px" }} />
                <div style={{ flex: 1 }}>
                  <strong>Dance Club Coordinator, IIT Jammu</strong>
                  <span style={{ marginLeft: "10px", fontSize: "0.9em", color: "#666" }}>July 2021 - Feb 2022</span>
                  <p style={{ marginTop: "10px", marginBottom: "5px" }}>
                    • Managed a 50+ member team, organized 11+ events, and increased outreach by 80% through collaborations.
                  </p>
                  <p style={{ marginBottom: "10px" }}>
                    • Managed social media promotion, and took funding initiatives to increase engagement and support event execution.
                  </p>
                  <a 
                    href="https://github.com/dakshigoel22/Certifications/blob/main/Dance-coordinator%20.pdf" 
                    target="_blank" 
                    rel="noreferrer"
                    className="certificate-link"
                  >
                    View Certificate →
                  </a>
                </div>
              </div>
            </Col>
            {/* <Col md={4} style={{ textAlign: "center" }}>
              <img 
                src={leadership2} 
                alt="Dance Club" 
                className="leadership-img"
                style={{ 
                  width: "100%", 
                  maxWidth: "250px", 
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }} 
              />
            </Col> */}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default LeadershipRoles;
