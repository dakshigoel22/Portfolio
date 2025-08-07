import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import pdf from "../../Assets/Resume_DakshiGoel.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [numPages, setNumPages] = useState(null);

  const DownloadButton = () => (
    <Row style={{ justifyContent: "center", position: "relative" }}>
      <Button
        variant="primary"
        href={pdf}
        target="_blank"
        style={{ maxWidth: "250px" }}
      >
        <AiOutlineDownload />
        &nbsp;Download Resume
      </Button>
    </Row>
  );

  return (
    <Container fluid className="resume-section">
      <Particle />
      
      <div style={{ marginBottom: "20px" }}>
        <DownloadButton />
      </div>

      <Row className="resume">
        <Col className="d-flex justify-content-center">
          <Document
            file={pdf}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="d-flex justify-content-center"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={1.5}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </Col>
      </Row>

      <div style={{ marginTop: "20px" }}>
        <DownloadButton />
      </div>
    </Container>
  );
}

export default ResumeNew;
