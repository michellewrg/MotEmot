import "./App.css";
import ThemeSwitch from "../components/ThemeSwitch";
import Sidebar from "../components/Sidebar";
import Placeholder from "../components/Placeholder";
import PersonalInformation from "../pages/PersonalInformation";
import Experiences from "../pages/Experiences"
import Skills from "../pages/Skills";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="min-h-screen min-w-screen overscroll-x-none">
        <div className="navbar fixed top-0 text-white bg-accent shadow-sm justify-between">
          <a className="btn btn-ghost text-3xl">EVOKE</a>
          <ThemeSwitch />
        </div>
        <div className="flex flex-row">
          <Sidebar />
          <div className="flex-1">
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Experiences />} />
              <Route path="/personal-information" element={<PersonalInformation />} />
              <Route path="/skills" element={<Skills />} />
            </Routes>
          </div>
          <Placeholder />
        </div>
      </div>
    </>
  );
}

export default App;
