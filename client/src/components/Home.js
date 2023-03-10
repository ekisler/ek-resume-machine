import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

const Home = ({ setResult }) => {
  const [fullName, setFullName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);

  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };
  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("headshotImage", headshot, headshot.name);
    formData.append("fullName", fullName);
    formData.append("currentPosition", currentPosition);
    formData.append("currentLength", currentLength);
    formData.append("currentTechnologies", currentTechnologies);
    formData.append("workHistory", JSON.stringify(companyInfo));
    axios
      .post("http://localhost:4000/resume/create", formData, {})
      .then((res) => {
        if (res.data.message) {
          setResult(res.data.data);
          navigate("/resume");
        }
      })
      .catch((err) => console.error(err));
    setLoading(true);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      <h1>Maquina de Curriculums</h1>
      <p><h6>Genere un currículum con ChatGPT en unos segundos</h6></p>
      <form
        onSubmit={handleFormSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <label htmlFor="fullName"><h6>Escriba su nombre completo</h6></label>
        <input className="firstName" 
          type="text"
          required
          name="fullName"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <div className="nestedContainer">
          <div>
            <label htmlFor="currentPosition"><h6>Posición actual</h6></label>
            <input
              type="text"
              required
              name="currentPosition"
              className="currentInput"
              value={currentPosition}
              onChange={(e) => setCurrentPosition(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentLength"><h6>¿Por cuántos año(s)?</h6></label>
            <input
              type="number"
              required
              name="currentLength"
              className="currentInput"
              value={currentLength}
              onChange={(e) => setCurrentLength(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentTechnologies"><h6>Tecnologías utilizadas</h6></label>
            <input
              type="text"
              required
              name="currentTechnologies"
              className="currentInput"
              value={currentTechnologies}
              onChange={(e) => setCurrentTechnologies(e.target.value)}
            />
          </div>
        </div>
        <label className="uploadPhoto" htmlFor="photo"><h5>Sube tu foto tipo carnet</h5></label>
        <input
          type="file"
          name="photo"
          required
          id="photo"
          accept="image/x-png,image/jpeg"
          onChange={(e) => setHeadshot(e.target.files[0])}
        />

        <h3 className="titule">Empresas para las que has trabajado</h3>

        {companyInfo.map((company, index) => (
          <div className="nestedContainer" key={index}>
            <div className="companies">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className="companies">
              <label htmlFor="position">Cargo</label>
              <input
                type="text"
                name="position"
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>

            <div className="btn__group" >
              {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                <button class="btn" id="addBtn" onClick={handleAddCompany}>
                  Agregar
                </button>
              )}
              {companyInfo.length > 1 && (
                <button class="btn"
                  id="deleteBtn"
                  onClick={() => handleRemoveCompany(index)}
                >
                  Borrar
                </button>
              )}
            </div>
          </div>
        ))}

        <button className="btn__group">Crear Curriculum</button>
      </form>
    </div>
  );
};

export default Home;
