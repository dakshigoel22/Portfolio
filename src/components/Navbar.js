import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CgGitFork } from "react-icons/cg";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";

import { CgFileDocument } from "react-icons/cg";
import { BsBriefcase } from "react-icons/bs";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const navigate = useNavigate();

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  const handleNavigation = (section) => {
    navigate('/about');
    updateExpanded(false);
    
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky navbar" : "navbar"}
    >
      <Container>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="about-dropdown-wrapper">
              <Nav.Link 
                as={Link} 
                to="/about"
                onClick={() => updateExpanded(false)}
                className="about-nav-link"
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
              <div className="custom-dropdown-menu">
                <div className="dropdown-item" onClick={() => handleNavigation('skillset')}>
                  Skillset
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation('tools')}>
                  Tools
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation('achievements')}>
                  Credentials
                </div>
              </div>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/experience"
                onClick={() => updateExpanded(false)}
              >
                <BsBriefcase style={{ marginBottom: "2px" }} /> Experience
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="projects-dropdown-wrapper">
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
                className="projects-nav-link"
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Projects
              </Nav.Link>
              <div className="custom-dropdown-menu">
                <div className="dropdown-item" onClick={() => { navigate('/project'); updateExpanded(false); setTimeout(() => {
                  const element = document.querySelector('.research-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100); }}>
                  My Research
                </div>
                <div className="dropdown-item" onClick={() => { navigate('/project'); updateExpanded(false); setTimeout(() => {
                  const element = document.querySelector('.works-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100); }}>
                  Recent Works
                </div>
              </div>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/resume"
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Resume
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="fork-btn">
              <Button
                href="https://github.com/dakshigoel22/Portfolio"
                target="_blank"
                className="fork-btn-inner"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} />{" "}
                <AiFillStar style={{ fontSize: "1.1em" }} />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
