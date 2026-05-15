import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { HiOutlineExternalLink } from "react-icons/hi";

function ProjectCards(props) {
  return (
    <div className="dark-project-card">
      <div className="dark-card-top">
        {props.scope && (
          <span className="dark-scope-badge">{props.scope}</span>
        )}
        {props.isResearch && (
          <span className="dark-scope-badge dark-research-badge">Research</span>
        )}
      </div>

      <h3 className="dark-card-title">{props.title}</h3>

      {props.subheading && (
        <p className="dark-card-subheading">{props.subheading}</p>
      )}

      <p className="dark-card-desc">{props.description}</p>

      {props.badge && (
        <span className="dark-patent-badge">{props.badge}</span>
      )}

      {props.techStack && props.techStack.length > 0 && (
        <div className="dark-chip-row">
          {props.techStack.map((t, i) => (
            <span key={i} className="dark-chip">{t}</span>
          ))}
        </div>
      )}

      <div className="dark-card-links">
        {props.ghLink && (
          <a
            href={props.ghLink}
            target="_blank"
            rel="noreferrer"
            className="dark-card-link"
          >
            <BsGithub /> {props.isBlog ? "Blog" : "Code"}
          </a>
        )}
        {!props.isBlog && props.demoLink && (
          <a
            href={props.demoLink}
            target="_blank"
            rel="noreferrer"
            className="dark-card-link"
          >
            {props.isResearch ? (
              <><HiOutlineExternalLink /> Paper</>
            ) : (
              <><CgWebsite /> Live</>
            )}
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCards;
