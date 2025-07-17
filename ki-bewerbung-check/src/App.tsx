import "./App.css";
import ThemeSwitch from "../components/ThemeSwitch";
import Sidebar from "../components/Sidebar";
import Welcome from "../pages/Welcome";
import Experiences from "../pages/Experiences";
import PersonalInformation from "../pages/PersonalInformation";
import Skills from "../pages/Skills";
import Evaluation from "../components/Evaluation"; // Importiere Evaluation-Komponente
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFaceSmile, faFaceMeh, faFaceFrown, faExclamation } from "@fortawesome/free-solid-svg-icons";
import AppProvider from "../context/AppProvider";
import { Routes, Route, Link, useLocation } from "react-router-dom";

function App() {
  library.add(faFaceSmile, faFaceMeh, faFaceFrown, faExclamation);

  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return (
    <AppProvider>
      <div className="min-h-screen min-w-screen overscroll-x-none">
        <div className="navbar fixed top-0 text-white bg-accent shadow-sm justify-between z-999">
          <Link to="/" className="btn btn-ghost text-3xl">EVOKE</Link>
          <ThemeSwitch />
        </div>
        <div className="flex flex-row">
          {!isRootPath && <Sidebar />}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route
                path="/experiences"
                element={<Experiences />}
              />
              <Route path="/personal-information" element={<PersonalInformation />} />
              <Route path="/skills" element={<Skills />} />
            </Routes>
          </div>
          {!isRootPath && <Evaluation />}
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
