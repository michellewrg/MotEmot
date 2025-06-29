import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-1/5 h-screen border-r-1 border-base-300 flex justify-center items-center">
      <ul className="steps steps-vertical w-[90%]">
        <li className="step step-accent py-32 font-bold">
          <Link to="/personal-information" className="hover:scale-105">
            Angaben zur Bewerbung
          </Link>
        </li>
        <li className="step step-accent font-bold">
          <Link to="/personal-information" className="hover:scale-105">
            Persönliche Angaben
          </Link>
        </li>
        <li className="step step-accent font-bold">
          <Link to="/skills" className="hover:scale-105">
            Kenntnisse & Fähigkeiten
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
