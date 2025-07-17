import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Dakshi Goel </span>
            from <span className="purple"> Gurgaon, India.</span>
            <br />
            I am currently employed as a Junior AI Developer at Mozrest.
            <br />
            I have completed bachelors in Electrical engineering and 
            minors in Computer Science from IIT Jammu.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Dancing
            </li>
            <li className="about-activity">
              <ImPointRight /> Table
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
           "Today is the opportunity to build the tomorrow you want"  {""}
          </p>
          <footer className="blockquote-footer">Ken Poirot</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
