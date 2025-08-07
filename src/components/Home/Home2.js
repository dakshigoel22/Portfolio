import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/myImg.png";
import umdLogo from "../../Assets/umd_logo.svg.png";
import iitLogo from "../../Assets/iit_logo.ong.png";

import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Dakshi Goel </span>
            from <span className="purple"> India, </span> currently navigating the world of AI as a Master’s student in Data Science at the <span className="purple"> University of Maryland </span> .


            <br />
            <br />

            I fell in love with machine learning during my first year and I have learnt something, I think… 🤷‍♂️ . 
            I’ve grown increasingly passionate about building data-driven solutions that are both intelligent and impactful.
            
            <br />
            <br />
            
            
            When I’m not decoding the mysteries of neural networks or experimenting with data, you’ll probably find me dancing to my favorite beats, smashing the ping pong table 🏓, or planning my next spontaneous travel escape ✈️.
            I’m all about blending logic with imagination — whether it's in AI models or the way I live life. Let’s explore, build, and maybe even groove to some algorithms along the way!

            <br />
            
        
            <br />
            
          </p>
           
            {/* <p className="home-about-body">
              I fell in love with programming and I have learnt
              something, I think… 🤷‍♂️
              <br />
              <br />I am fluent in classics like
              <i>
                <b className="purple"> Python, C++, ML, DL </b>
              </i>
              <br />
              <br />
              My field of Interest's are building real-life &nbsp;
              <i>
                <b className="purple">AI Technologies and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                  Data Science.
                </b>
              </i>
              <br />
              <br />
              I am passionate transforming data into actional insights by building   
              <i><b className="purple"> forecasting models </b></i>and also 
              <i>
                <b className="purple">
                  {" "}
                  LLM applications
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> chatbots and automation tools </b>
              </i>
            </p> */}
           <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img 
                  src={umdLogo} 
                  alt="UMD Logo" 
                  style={{ 
                    height: "50px", 
                    marginRight: "15px",
                    filter: "brightness(0.9)"
                  }} 
                />
                <span style={{ fontSize: "1.1em", color: "#c770f0" }}>
                  MS DS @ University of Maryland
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img 
                  src={iitLogo} 
                  alt="IIT Jammu Logo" 
                  style={{ 
                    height: "50px", 
                    marginRight: "15px",
                    filter: "brightness(0.9)"
                  }} 
                />
                <span style={{ fontSize: "1.1em", color: "#c770f0" }}>
                  B.Tech EE & CS @ IIT Jammu
                </span>
              </div>
            </div>
          </Col>
          {/* <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col> */}
          <Col md={4} style={{ paddingBottom: 10, paddingTop: 80}}>
              <img
                src={myImg}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "400px", borderRadius: "20px" }}
              />
            </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/dakshigoel22"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/dakshi-iit/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/dakshigoel"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
