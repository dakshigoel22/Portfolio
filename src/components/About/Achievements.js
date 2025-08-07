import React from "react";
import { Container } from "react-bootstrap";
import { ImPointRight } from "react-icons/im";

function Achievements() {
  return (
    <div className="achievements-section-wrapper" id="achievements">
      <h1 className="project-heading" style={{ paddingTop: "0px", marginBottom: "30px" }}>
        <strong className="purple">Achievements</strong>
      </h1>
      <Container style={{ textAlign: "left" }}>
        <div className="achievement-list">
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li className="achievement-item">
              <ImPointRight className="purple" style={{ marginRight: "10px" }} />
              <strong>Smt. Godavari Devi Award</strong>
              <p style={{ marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}>
                Received prestigious award by IIT Jammu for achieving the highest CGPA in Electrical Engineering.
              </p>
              <a 
                href="https://github.com/dakshigoel22/Certifications/blob/main/GodavariDeviAward.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="certificate-link"
                style={{ marginLeft: "30px" }}
              >
                View Certificate →
              </a>
            </li>
            
            <li className="achievement-item" style={{ marginTop: "20px" }}>
              <ImPointRight className="purple" style={{ marginRight: "10px" }} />
              <strong>Flipkart Grid Robotics Challenge -<span className="purple"> 2nd Place </span> </strong>
              <p style={{ marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}>
                Secured 2nd position among 9,000 teams nationally (Top 0.1%) in this prestigious robotics competition.
              </p>
              <a 
                href="https://github.com/dakshigoel22/Certifications/blob/main/Flipkart_Grid3.0.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="certificate-link"
                style={{ marginLeft: "30px" }}
              >
                View Certificate →
              </a>
            </li>
            
            <li className="achievement-item" style={{ marginTop: "20px" }}>
              <ImPointRight className="purple" style={{ marginRight: "10px" }} />
              <strong>SEED Pitch Competition - <span className="purple"> 2nd Prize</span> </strong>
              <p style={{ marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}>
                Won 2nd prize among 20 regional teams in Jammu and Kashmir for innovative business pitch.
              </p>
              <a 
                href="https://github.com/dakshigoel22/Certifications/blob/main/SEED-Certi.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="certificate-link"
                style={{ marginLeft: "30px" }}
              >
                View Certificate →
              </a>
            </li>
            
            <li className="achievement-item" style={{ marginTop: "20px" }}>
              <ImPointRight className="purple" style={{ marginRight: "10px" }} />
              <strong>Inter-IIT Tech Meet 10.0 - <span className="purple">1st Rank </span></strong>
              <p style={{ marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}>
                Ranked first in Bosch Age and Gender Detection challenge among 23 top IITs.
              </p>
              {/* <a 
                href="#" 
                target="_blank" 
                rel="noreferrer"
                className="certificate-link"
                style={{ marginLeft: "30px" }}
              >
                View Certificate →
              </a> */}
            </li>
            
            <li className="achievement-item" style={{ marginTop: "20px" }}>
              <ImPointRight className="purple" style={{ marginRight: "10px" }} />
              <strong>Google Girls Hackathon 2023 - <span className="purple">Semi-finalist </span></strong>
              <p style={{ marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}>
                Selected as semi-finalist (Top 2.5% nationwide) in this competitive hackathon.
              </p>
              {/* <a 
                href="#" 
                target="_blank" 
                rel="noreferrer"
                className="certificate-link"
                style={{ marginLeft: "30px" }}
              >
                View Certificate →
              </a> */}
            </li>
            
            <li className="achievement-item" style={{ marginTop: "20px" }}>
              <ImPointRight className="purple" style={{ marginRight: "10px" }} />
              <strong>SERB-INAE Hackathon -<span className="purple"> Top 5</span> </strong>
              <p style={{ marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}>
                Secured position in Top 5 among 75 teams pan India at Jadavpur University.
              </p>
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer"
                className="certificate-link"
                style={{ marginLeft: "30px" }}
              >
                View Certificate →
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Achievements;
