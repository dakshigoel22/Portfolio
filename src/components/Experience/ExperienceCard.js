import React from "react";
import Card from "react-bootstrap/Card";
import { BsCalendar3, BsGeoAlt } from "react-icons/bs";

function ExperienceCard(props) {
  return (
    <Card className="experience-card-view">
      <Card.Body>
        <div className="experience-header">
          <div className="experience-left-section">
            {props.logo && (
              <div className="company-logo-wrapper">
                <img src={props.logo} alt={`${props.company} logo`} className="company-logo" />
              </div>
            )}
            <div className="experience-title-section">
              <Card.Title className="experience-role">
                {props.role}
              </Card.Title>
              <Card.Subtitle className="experience-company">
                {props.company}
              </Card.Subtitle>
              <div className="experience-meta-mobile">
                <span className="experience-duration">
                  <BsCalendar3 className="meta-icon" /> {props.duration}
                </span>
                <span className="experience-location">
                  <BsGeoAlt className="meta-icon" /> {props.location}
                </span>
              </div>
            </div>
          </div>
          <div className="experience-meta-desktop">
            <span className="experience-duration">
              <BsCalendar3 className="meta-icon" /> {props.duration}
            </span>
            <span className="experience-location">
              <BsGeoAlt className="meta-icon" /> {props.location}
            </span>
          </div>
        </div>
        
        <div className="experience-description">
          <ul>
            {props.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        {props.technologies && (
          <div className="experience-technologies">
            <strong>Technologies:</strong>
            <div className="tech-tags">
              {props.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ExperienceCard;