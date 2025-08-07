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
            from <span className="purple"> India, </span> currently navigating the world of AI as a Master’s student in Data Science at the <span className="purple"> University of Maryland </span> .


            <br />
            <br />

            With a B.Tech in Electrical Engineering and a minor in Computer Science from IIT Jammu, I’ve grown increasingly passionate about building data-driven solutions that are both intelligent and impactful. When I’m not decoding the mysteries of neural networks or experimenting with data, you’ll probably find me dancing to my favorite beats, smashing the ping pong table 🏓, or planning my next spontaneous travel escape ✈️.
            I’m all about blending logic with imagination — whether it's in AI models or the way I live life. Let’s explore, build, and maybe even groove to some algorithms along the way!

            <br />
            
        
            <br />
            
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
