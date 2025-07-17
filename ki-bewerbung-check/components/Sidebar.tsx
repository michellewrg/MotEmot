import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-1/5 h-screen border-r-1 border-base-300 flex justify-center 2xl:items-start mt-28 items-start">
      <ul className="steps steps-vertical w-[90%]">
        <li className={`step step-accent font-medium ${location.pathname !== "/experiences" ? "text-zinc-500 font-normal text-base" : "text-lg"}`}>
          <Link to="/experiences" className="hover:scale-105">
            Angaben zur Bewerbung
          </Link>
        </li>
        <li className={`step step-accent font-medium ${location.pathname !== "/personal-information" ? "text-zinc-500 font-normal text-base" : "text-lg"}`}>
          <Link to="/personal-information" className="hover:scale-105">
            Persönliche Angaben
          </Link>
        </li>
        <li className={`step step-accent font-medium ${location.pathname !== "/skills" ? "text-zinc-500 font-normal text-base" : "text-lg"}`}>
          <Link to="/skills" className="hover:scale-105">
            Kenntnisse & Fähigkeiten
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
