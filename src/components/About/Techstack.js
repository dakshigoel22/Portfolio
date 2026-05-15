import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DiPython } from "react-icons/di";
import {
  SiTensorflow,
  SiPytorch,
  SiFastapi,
  SiOpenai,
  SiDocker,
  SiScikitlearn,
  SiPostgresql,
  SiNumpy,
  SiAmazonaws,
  SiMlflow,
  SiPandas,
} from "react-icons/si";
import { TbBrain } from "react-icons/tb";

const LEFT_SKILLS = [
  { icon: <DiPython />, label: "Python" },
  { icon: <SiTensorflow />, label: "TensorFlow" },
  { icon: <SiDocker />, label: "Docker" },
  { icon: <SiAmazonaws />, label: "AWS" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiNumpy />, label: "NumPy" },
];

const RIGHT_SKILLS = [
  { icon: <SiPytorch />, label: "PyTorch" },
  { icon: <SiFastapi />, label: "FastAPI" },
  { icon: <TbBrain />, label: "LangChain" },
  { icon: <SiOpenai />, label: "OpenAI" },
  { icon: <SiScikitlearn />, label: "Scikit-learn" },
  { icon: <SiMlflow />, label: "MLflow" },
];

const FALLBACK_SKILLS = [
  { icon: <DiPython />, label: "Python" },
  { icon: <SiTensorflow />, label: "TensorFlow" },
  { icon: <SiPytorch />, label: "PyTorch" },
  { icon: <SiFastapi />, label: "FastAPI" },
  { icon: <SiDocker />, label: "Docker" },
  { icon: <SiAmazonaws />, label: "AWS" },
  { icon: <SiOpenai />, label: "OpenAI" },
  { icon: <SiScikitlearn />, label: "Scikit-learn" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiNumpy />, label: "NumPy" },
  { icon: <SiPandas />, label: "Pandas" },
  { icon: <SiMlflow />, label: "MLflow" },
];

function GlobeCanvas() {
  const canvasRef = useRef(null);
  const phiRef = useRef(0);

  useEffect(() => {
    let globe = null;
    let cancelled = false;

    async function init() {
      try {
        const createGlobe = (await import("cobe")).default;
        if (cancelled || !canvasRef.current) return;

        globe = createGlobe(canvasRef.current, {
          devicePixelRatio: 2,
          width: 400 * 2,
          height: 400 * 2,
          phi: 0,
          theta: 0.3,
          dark: 0,
          diffuse: 0.4,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [1, 1, 1],
          markerColor: [0.78, 0.44, 0.94],
          glowColor: [0.9, 0.9, 0.95],
          markers: [
            { location: [37.78, -122.41], size: 0.05 },
            { location: [28.61, 77.21], size: 0.05 },
            { location: [51.51, -0.09], size: 0.04 },
            { location: [35.68, 139.69], size: 0.04 },
            { location: [38.9, -77.04], size: 0.04 },
          ],
          onRender(state) {
            state.phi = phiRef.current;
            phiRef.current += 0.003;
          },
        });
      } catch (e) {
        // silently fail — parent handles fallback via GlobeWithFallback
      }
    }

    init();

    return () => {
      cancelled = true;
      if (globe) globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 400, height: 400, cursor: "grab" }}
    />
  );
}

function SkillPill({ icon, label, animClass }) {
  return (
    <div className={`skill-pill ${animClass}`}>
      <span className="skill-pill-icon">{icon}</span>
      <span className="skill-pill-label">{label}</span>
    </div>
  );
}

function GlobeWithFallback() {
  const [globeFailed, setGlobeFailed] = useState(false);

  useEffect(() => {
    import("cobe").catch(() => setGlobeFailed(true));
  }, []);

  if (globeFailed) {
    return (
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {FALLBACK_SKILLS.map((s, i) => (
          <Col key={i} xs={4} md={2} className="tech-icons">
            {s.icon}
            <span className="tech-label">{s.label}</span>
          </Col>
        ))}
      </Row>
    );
  }

  const animClasses = ["float-a", "float-b", "float-c", "float-b", "float-a", "float-c"];

  return (
    <div className="globe-section">
      <div className="globe-layout">
        <div className="globe-skills-left">
          {LEFT_SKILLS.map((s, i) => (
            <SkillPill key={i} icon={s.icon} label={s.label} animClass={animClasses[i]} />
          ))}
        </div>

        <div className="globe-canvas-wrapper">
          <GlobeCanvas />
        </div>

        <div className="globe-skills-right">
          {RIGHT_SKILLS.map((s, i) => (
            <SkillPill key={i} icon={s.icon} label={s.label} animClass={animClasses[i]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Techstack() {
  return <GlobeWithFallback />;
}

export default Techstack;
