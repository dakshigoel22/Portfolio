import { useEffect, useRef } from "react";

const skills = [
  // Core ML/DL
  { name: "Python",      angle: 0,    elevation:  0.3,  color: "#3776AB", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "PyTorch",     angle: 1.05, elevation:  0.7,  color: "#EE4C2C", icon: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
  { name: "TensorFlow",  angle: 2.09, elevation:  0.0,  color: "#FF6F00", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
  { name: "Scikit",      angle: 1.57, elevation: -0.2,  color: "#F7931E", icon: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
  { name: "NumPy",       angle: 3.67, elevation:  0.9,  color: "#4DABCF", icon: "https://cdn.simpleicons.org/numpy/4DABCF" },
  { name: "Pandas",      angle: 4.71, elevation:  0.2,  color: "#150458", icon: "https://cdn.simpleicons.org/pandas/150458" },
  // GenAI / LLM
  { name: "OpenAI",      angle: 0.52, elevation: -0.6,  color: "#412991", icon: "https://cdn.simpleicons.org/openai/412991" },
  { name: "HuggingFace", angle: 3.14, elevation: -0.5,  color: "#FFD21E", icon: "https://cdn.simpleicons.org/huggingface/FFD21E" },
  { name: "LangChain",   angle: 1.05, elevation: -0.9,  color: "#1C3C3C", icon: "https://cdn.simpleicons.org/langchain/1C3C3C" },
  { name: "Ollama",      angle: 5.0,  elevation: -0.3,  color: "#ffffff", icon: "https://cdn.simpleicons.org/ollama/ffffff" },
  // MLOps / Experiment tracking
  { name: "MLflow",      angle: 5.76, elevation: -0.1,  color: "#0194E2", icon: "https://cdn.simpleicons.org/mlflow/0194E2" },
  { name: "WandB",       angle: 3.93, elevation:  0.7,  color: "#FFBE00", icon: "https://cdn.simpleicons.org/weightsandbiases/FFBE00" },
  { name: "Airflow",     angle: 1.31, elevation: -0.3,  color: "#017CEE", icon: "https://cdn.simpleicons.org/apacheairflow/017CEE" },
  // Cloud / Infra
  { name: "AWS",         angle: 5.24, elevation:  0.8,  color: "#FF9900", icon: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { name: "Azure",       angle: 0.26, elevation: -0.4,  color: "#0078D4", icon: "https://cdn.simpleicons.org/microsoftazure/0078D4" },
  { name: "GCP",         angle: 5.50, elevation: -0.8,  color: "#4285F4", icon: "https://cdn.simpleicons.org/googlecloud/4285F4" },
  { name: "Docker",      angle: 4.19, elevation: -0.4,  color: "#2496ED", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Kubernetes",  angle: 0.78, elevation:  0.5,  color: "#326CE5", icon: "https://cdn.simpleicons.org/kubernetes/326CE5" },
  // Data / Serving
  { name: "FastAPI",     angle: 3.14, elevation:  0.5,  color: "#009688", icon: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "Spark",       angle: 1.83, elevation:  0.4,  color: "#E25A1C", icon: "https://cdn.simpleicons.org/apachespark/E25A1C" },
  { name: "PostgreSQL",  angle: 2.62, elevation: -0.8,  color: "#4169E1", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB",     angle: 2.88, elevation:  0.6,  color: "#47A248", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Redis",       angle: 2.35, elevation: -0.7,  color: "#DC382D", icon: "https://cdn.simpleicons.org/redis/DC382D" },
  // Dev / UI
  { name: "Streamlit",   angle: 3.40, elevation: -0.2,  color: "#FF4B4B", icon: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
  { name: "Jupyter",     angle: 4.45, elevation: -0.5,  color: "#F37626", icon: "https://cdn.simpleicons.org/jupyter/F37626" },
  { name: "Databricks",  angle: 4.97, elevation:  0.3,  color: "#FF3621", icon: "https://cdn.simpleicons.org/databricks/FF3621" },
];

function buildGlobeLines() {
  const lines = [];
  for (let i = 0; i <= 12; i++) {
    const phi = (i / 12) * Math.PI;
    const ring = [];
    for (let j = 0; j <= 64; j++) {
      const theta = (j / 64) * Math.PI * 2;
      ring.push({ x: Math.sin(phi) * Math.cos(theta), y: Math.cos(phi), z: Math.sin(phi) * Math.sin(theta) });
    }
    for (let j = 0; j < ring.length - 1; j++) lines.push([ring[j], ring[j + 1]]);
  }
  for (let i = 0; i < 16; i++) {
    const theta = (i / 16) * Math.PI * 2;
    const meridian = [];
    for (let j = 0; j <= 48; j++) {
      const phi = (j / 48) * Math.PI;
      meridian.push({ x: Math.sin(phi) * Math.cos(theta), y: Math.cos(phi), z: Math.sin(phi) * Math.sin(theta) });
    }
    for (let j = 0; j < meridian.length - 1; j++) lines.push([meridian[j], meridian[j + 1]]);
  }
  return lines;
}

const globeLines = buildGlobeLines();

function rotateY(p, angle) {
  return { x: p.x * Math.cos(angle) + p.z * Math.sin(angle), y: p.y, z: -p.x * Math.sin(angle) + p.z * Math.cos(angle) };
}
function rotateX(p, angle) {
  return { x: p.x, y: p.y * Math.cos(angle) - p.z * Math.sin(angle), z: p.y * Math.sin(angle) + p.z * Math.cos(angle) };
}
function project(p, cx, cy, focalLen) {
  const depth = p.z + focalLen;
  const scale = focalLen / depth;
  return { x: cx + p.x * scale, y: cy + p.y * scale, scale };
}
function parseColor(hex) {
  const h = hex.replace("#", "").padEnd(6, "f");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function drawCircle(ctx, color, x, y, size) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size * 0.35, 0, Math.PI * 2);
  ctx.fill();
}

function GlobeTechCloud() {
  const canvasRef = useRef(null);
  const phiRef    = useRef(0);
  const thetaRef  = useRef(0.18);
  const dragRef   = useRef({ active: false, lastX: 0, lastY: 0 });
  const velPhiRef = useRef(0.004);
  const velThtRef = useRef(0);
  const rafRef    = useRef(0);
  const imgCache  = useRef(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    skills.forEach(skill => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = skill.icon;
      imgCache.current.set(skill.name, img);
    });

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const W = canvas.getBoundingClientRect().width;
      const H = canvas.getBoundingClientRect().height;
      const cx = W / 2, cy = H / 2;
      const small    = W < 600;
      const radius   = Math.min(W, H) * (small ? 0.30 : 0.36);
      const focal    = 2.3 * radius;
      const iconSz   = small ? 14 : 22;
      const fontSize = small ? 7 : 9;
      const padding  = small ? 3 : 5;

      ctx.clearRect(0, 0, W, H);

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 1.2 * radius);
      glow.addColorStop(0,   "rgba(0,217,255,0.06)");
      glow.addColorStop(0.7, "rgba(0,80,160,0.03)");
      glow.addColorStop(1,   "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, 1.5 * radius, 0, Math.PI * 2);
      ctx.fill();

      const phi   = phiRef.current;
      const theta = thetaRef.current;

      for (const [a, b] of globeLines) {
        const p3a = rotateX(rotateY({ x: a.x * radius, y: a.y * radius, z: a.z * radius }, phi), theta);
        const p3b = rotateX(rotateY({ x: b.x * radius, y: b.y * radius, z: b.z * radius }, phi), theta);
        const p2a = project(p3a, cx, cy, focal);
        const p2b = project(p3b, cx, cy, focal);
        const depth = ((p3a.z + p3b.z) / 2 + radius) / (2 * radius);
        ctx.beginPath();
        ctx.moveTo(p2a.x, p2a.y);
        ctx.lineTo(p2b.x, p2b.y);
        ctx.strokeStyle = `rgba(0,180,220,${0.06 + 0.5 * depth})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      }

      const skillOrbRadius = 1.28 * radius;
      const visible = [];

      for (const skill of skills) {
        const raw = {
          x: skillOrbRadius * Math.cos(skill.angle) * Math.cos(skill.elevation),
          y: skillOrbRadius * Math.sin(skill.elevation),
          z: skillOrbRadius * Math.sin(skill.angle) * Math.cos(skill.elevation),
        };
        const rot = rotateX(rotateY(raw, phi), theta);
        const { x: px, y: py, scale } = project(rot, cx, cy, focal);
        const depthFactor = (rot.z + 1.3 * radius) / (2.6 * radius);
        if (depthFactor < 0.08) continue;
        visible.push({ skill, px, py, alpha: Math.min(1, 1.4 * depthFactor), scale, z: rot.z, rot3d: rot });
      }

      visible.sort((a, b) => a.z - b.z);

      const connectRadius = radius * (small ? 0.88 : 1.15);
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const A = visible[i], B = visible[j];
          const dx = A.rot3d.x - B.rot3d.x;
          const dy = A.rot3d.y - B.rot3d.y;
          const dz = A.rot3d.z - B.rot3d.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist > connectRadius) continue;
          const strength  = 1 - dist / connectRadius;
          const lineAlpha = Math.min(A.alpha, B.alpha) * strength * 0.38;
          if (lineAlpha < 0.04) continue;
          const [r1, g1, b1] = parseColor(A.skill.color);
          const [r2, g2, b2] = parseColor(B.skill.color);
          const grad = ctx.createLinearGradient(A.px, A.py, B.px, B.py);
          grad.addColorStop(0, `rgba(${r1},${g1},${b1},${lineAlpha})`);
          grad.addColorStop(1, `rgba(${r2},${g2},${b2},${lineAlpha})`);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(A.px, A.py);
          ctx.lineTo(B.px, B.py);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.65;
          ctx.stroke();
          ctx.restore();
        }
      }

      for (const { skill, px, py, alpha, scale } of visible) {
        const badgeIconSz = Math.max(iconSz, (small ? 20 : 28) * Math.min(1.1 * scale, 1.35));
        const badgeFontSz = Math.max(fontSize, (small ? 8 : 10) * Math.min(scale, 1.25));
        ctx.font = `600 ${badgeFontSz}px monospace`;
        const badgeW = badgeIconSz + 2 * padding + ctx.measureText(skill.name).width + 8;
        const badgeH = badgeIconSz + padding;
        const bx = px - badgeW / 2;
        const by = py - badgeH / 2;
        const r  = badgeH / 2;

        if (bx < 0 || bx + badgeW > W || by < 0 || by + badgeH > H) continue;

        const icon = imgCache.current.get(skill.name);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = "rgba(4,16,30,0.82)";
        ctx.strokeStyle = skill.color + "55";
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(bx + r, by);
        ctx.lineTo(bx + badgeW - r, by);
        ctx.quadraticCurveTo(bx + badgeW, by, bx + badgeW, by + r);
        ctx.lineTo(bx + badgeW, by + badgeH - r);
        ctx.quadraticCurveTo(bx + badgeW, by + badgeH, bx + badgeW - r, by + badgeH);
        ctx.lineTo(bx + r, by + badgeH);
        ctx.quadraticCurveTo(bx, by + badgeH, bx, by + badgeH - r);
        ctx.lineTo(bx, by + r);
        ctx.quadraticCurveTo(bx, by, bx + r, by);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        const iconX = bx + padding;
        const iconY = py - badgeIconSz / 2;
        if (icon && icon.complete && icon.naturalWidth > 0) {
          try { ctx.drawImage(icon, iconX, iconY, badgeIconSz, badgeIconSz); }
          catch { drawCircle(ctx, skill.color, iconX, iconY, badgeIconSz); }
        } else {
          drawCircle(ctx, skill.color, iconX, iconY, badgeIconSz);
        }

        ctx.font         = `600 ${badgeFontSz}px monospace`;
        ctx.fillStyle    = skill.color;
        ctx.textAlign    = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(skill.name, iconX + badgeIconSz + 4, py);
        ctx.restore();
      }

      if (!dragRef.current.active) {
        phiRef.current   += velPhiRef.current;
        thetaRef.current += velThtRef.current;
        velPhiRef.current *= 0.96;
        velThtRef.current *= 0.94;
        if (Math.abs(velPhiRef.current) < 0.0005) velPhiRef.current = 0.004;
        thetaRef.current = Math.max(-1.1, Math.min(1.1, thetaRef.current));
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    const onMouseDown = e => {
      dragRef.current = { active: true, lastX: e.clientX, lastY: e.clientY };
      velPhiRef.current = 0; velThtRef.current = 0;
    };
    const onMouseMove = e => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      phiRef.current   += 0.007 * dx;
      thetaRef.current  = Math.max(-1.1, Math.min(1.1, thetaRef.current + 0.007 * dy));
      velPhiRef.current = 0.007 * dx;
      velThtRef.current = 0.007 * dy;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
    };
    const onMouseUp = () => {
      dragRef.current.active = false;
      if (Math.abs(velPhiRef.current) < 0.001) velPhiRef.current = 0.004;
    };
    const onTouchStart = e => {
      dragRef.current = { active: true, lastX: e.touches[0].clientX, lastY: e.touches[0].clientY };
      velPhiRef.current = 0; velThtRef.current = 0;
    };
    const onTouchMove = e => {
      if (!dragRef.current.active) return;
      const dx = e.touches[0].clientX - dragRef.current.lastX;
      const dy = e.touches[0].clientY - dragRef.current.lastY;
      phiRef.current   += 0.007 * dx;
      thetaRef.current  = Math.max(-1.1, Math.min(1.1, thetaRef.current + 0.007 * dy));
      velPhiRef.current = 0.007 * dx;
      velThtRef.current = 0.007 * dy;
      dragRef.current.lastX = e.touches[0].clientX;
      dragRef.current.lastY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      dragRef.current.active = false;
      if (Math.abs(velPhiRef.current) < 0.001) velPhiRef.current = 0.004;
    };

    canvas.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseup",    onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: true });
    canvas.addEventListener("touchend",   onTouchEnd);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      canvas.removeEventListener("mousedown",  onMouseDown);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", userSelect: "none" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", cursor: "grab", touchAction: "none" }}
      />
      <div style={{
        position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
        color: "rgba(255,255,255,0.3)", fontSize: 10, pointerEvents: "none",
      }}>
        ⊕ Drag to rotate
      </div>
    </div>
  );
}

function Techstack() {
  return (
    <div className="globe-section">
      <div className="globe-canvas-wrapper" style={{ height: 480 }}>
        <GlobeTechCloud />
      </div>
    </div>
  );
}

export default Techstack;
