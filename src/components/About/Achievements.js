import { useState } from "react";
import { Container } from "react-bootstrap";

const credentials = [
  {
    id: 1,
    title: "Smt. Godavari Devi Award",
    issuer: "IIT Jammu",
    category: "Award",
    date: "2024",
    tags: ["Top of Class", "EE Department"],
    description: "Received the prestigious award by IIT Jammu for achieving the highest CGPA in Electrical Engineering — recognizing academic excellence across the full B.Tech program.",
    link: "https://github.com/dakshigoel22/Certifications/blob/main/GodavariDeviAward.pdf",
  },
  {
    id: 2,
    title: "Flipkart Grid Robotics — 2nd Place",
    issuer: "Flipkart",
    category: "Competition",
    date: "2023",
    tags: ["Top 0.1%", "9,000 teams"],
    description: "Secured 2nd position among 9,000+ teams nationwide in this prestigious robotics and AI competition organized by Flipkart.",
    link: "https://github.com/dakshigoel22/Certifications/blob/main/Flipkart_Grid3.0.pdf",
  },
  {
    id: 3,
    title: "Inter-IIT Tech Meet 10.0 — 1st Rank",
    issuer: "IIT System",
    category: "Competition",
    date: "2023",
    tags: ["23 IITs", "Bosch Challenge"],
    description: "Ranked 1st place in the Bosch Age and Gender Detection challenge, competing against teams from all 23 IITs. Deployed ESRGANs and RetinaFace for high-accuracy detection from low-quality surveillance footage.",
  },
  {
    id: 4,
    title: "SEED Pitch Competition — 2nd Prize",
    issuer: "SEED",
    category: "Competition",
    date: "2023",
    tags: ["Regional", "J&K"],
    description: "Won 2nd prize among 20 regional teams in Jammu and Kashmir for an innovative business pitch at the SEED entrepreneurship competition.",
    link: "https://github.com/dakshigoel22/Certifications/blob/main/SEED-Certi.pdf",
  },
  {
    id: 5,
    title: "Google Girls Hackathon — Semi-finalist",
    issuer: "Google",
    category: "Hackathon",
    date: "2023",
    tags: ["Top 2.5%", "Nationwide"],
    description: "Selected as a semi-finalist (top 2.5% nationwide) in Google's Girls Hackathon — a competitive program recognizing women in tech across India.",
  },
  {
    id: 6,
    title: "SERB-INAE Hackathon — Top 5",
    issuer: "SERB-INAE",
    category: "Hackathon",
    date: "2023",
    tags: ["75 teams", "Pan India"],
    description: "Secured a Top 5 position among 75 teams pan India at the SERB-INAE Hackathon held at Jadavpur University.",
  },
  {
    id: 7,
    title: "Student Head Representative, Career Development Services",
    issuer: "IIT Jammu",
    category: "Leadership",
    date: "Oct 2023 – Jun 2024",
    tags: ["Team of 70+", "350+ Opportunities"],
    description: "Led a team of 70+, sourced 350+ job opportunities, organized 30+ workshops, and launched a CEO Leadership Talk series. Automated lead tracking, mass mailing list updates, and report generation — reducing manual processing time by 50%.",
    link: "https://github.com/dakshigoel22/Certifications/blob/main/CDS24_head_coordinator_certificate.jpeg",
  },
  {
    id: 8,
    title: "Dance Club Coordinator",
    issuer: "IIT Jammu",
    category: "Leadership",
    date: "Jul 2021 – Feb 2022",
    tags: ["50+ Members", "11+ Events"],
    description: "Managed a 50+ member team, organized 11+ events, and increased outreach by 80% through collaborations. Led social media promotion and funding initiatives to boost engagement and support event execution.",
    link: "https://github.com/dakshigoel22/Certifications/blob/main/Dance-coordinator%20.pdf",
  },
];

const FILTERS = ["All", "Award", "Competition", "Hackathon", "Leadership"];

function Achievements() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered =
    activeFilter === "All"
      ? credentials
      : credentials.filter((c) => c.category === activeFilter);

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="achievements-section-wrapper" id="achievements">
      <div className="cred-header">
        <h1 className="project-heading" style={{ paddingTop: 0, marginBottom: "6px" }}>
          My <strong className="purple">Credentials</strong>
        </h1>
        <div className="cred-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`cred-filter-pill ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
        <ul className="cred-list">
          {filtered.map((cred) => {
            const isOpen = expandedId === cred.id;
            return (
              <li key={cred.id} className="cred-item">
                <button
                  className="cred-row"
                  onClick={() => toggle(cred.id)}
                  aria-expanded={isOpen}
                >
                  <span className="cred-dot">●</span>

                  <span className="cred-main">
                    <span className="cred-title">{cred.title}</span>
                    <span className="cred-issuer">{cred.issuer}</span>
                    <span className="cred-tags">
                      <span className={`cred-category-tag cat-${cred.category.toLowerCase()}`}>
                        {cred.category}
                      </span>
                      {cred.tags?.map((t, i) => (
                        <span key={i} className="cred-tag">{t}</span>
                      ))}
                    </span>
                  </span>

                  <span className="cred-meta">
                    <span className="cred-date">{cred.date}</span>
                    <span className={`cred-chevron ${isOpen ? "open" : ""}`}>▼</span>
                  </span>
                </button>

                <div className={`cred-expand ${isOpen ? "open" : ""}`}>
                  <div className="cred-expand-inner">
                    {cred.description && (
                      <p className="cred-description">{cred.description}</p>
                    )}
                    {cred.link && (
                      <a
                        href={cred.link}
                        target="_blank"
                        rel="noreferrer"
                        className="cred-cert-link"
                      >
                        View Certificate →
                      </a>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}

export default Achievements;
