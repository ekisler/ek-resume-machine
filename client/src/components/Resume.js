import React, { useRef } from "react";
import ErrorPage from "./ErrorPage";
import { useReactToPrint } from "react-to-print";

const Resume = ({ result }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${result.fullNme} Resume`,
    onAfterPrint: () => alert("Print Succesfull"),
  });

  if (JSON.stringify(result) === "{}") {
    return <ErrorPage />;
  }

  const replaceWithBr = (string) => {
    return string.replace(/\n/g, "<br />");
  };

  return (
    <>
      <button onClick={handlePrint}>Imprimir Página</button>
      <main className="container" ref={componentRef}>
        <header className="header">
          <div>
            <h1>{result.fullName}</h1>
            <p className="resumeTitle headerTitle">
              {result.currentPosition} ({result.currentTechnologies})
            </p>
            <p className="resumeTitle">
              {result.currentLength} año(s) de Experiencia laboral
            </p>
          </div>
          <div>
            <img
              src={result.image_url}
              alt={result.fullName}
              className="resumeImage"
            />
          </div>
        </header>
        <div className="resumeBody">
          <div>
            <h2 className="resumeBodyTitle">Resumen del perfil</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(result.objective),
              }}
              className="resumeBodyContent"
            />
          </div>
          <div>
            <h2 className="resumeBodyTitle">Historial de Trabajo</h2>
            {result.workHistory.map((work) => (
              <p className="resumeBodyContent" key={work.name}>
                <span style={{ fontWeight: "bold" }}>{work.name}</span> -{" "}
                {work.position}
              </p>
            ))}
          </div>
          <div>
            <h2 className="resumeBodyTitle">Perfil de trabajo</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(result.jobResponsibilities),
              }}
              className="resumeBodyContent"
            />
          </div>
          <div>
            <h2 className="resumeBodyTitle">Responsabilidades laborales</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(result.keypoints),
              }}
              className="resumneBodyContent"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Resume;
