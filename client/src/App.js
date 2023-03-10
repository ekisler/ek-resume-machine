import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Resume from "./components/Resume";

const App = () => {
  const [result, setResult] = useState({});
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setResult={setResult} />} />
          <Route path="/resume" element={<Resume result={result} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
