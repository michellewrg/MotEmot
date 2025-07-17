import { useState } from "react";
import { useNavigate } from "react-router-dom";
import interviewImage from "../src/assets/undraw_interview_yz52.svg";

export default function Welcome() {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const navigate = useNavigate();

  function handleStartApplication() {
    if (isChecked && selectedPosition) {
      // Du könntest die Auswahl auch im Context oder in den URL-Params speichern
      navigate("/experiences");
    }
  }

  return (
    <div className="w-full flex flex-col p-12 mt-12 items-center space-y-8">
      <div className="flex w-1/2 items-center flex-col space-y-6 2xl:space-y-12">
        <h1 className="text-4xl font-bold">Willkommen bei Evoke</h1>
        <img
          src={interviewImage}
          className="w-1/2"
          alt="Interview Illustration"
        />
        <p className="text-lg text-center">
          Evoke ist ein innovatives Bewerbungsportal, das mithilfe künstlicher
          Intelligenz den passenden Bewerber analysiert und unterstützt. Geben
          Sie Ihre Daten ein und lassen Sie sich von unserer KI helfen, Ihre
          Bewerbung optimal zu gestalten.
        </p>
      </div>

      <label className="flex flex-col w-1/2">
        <span className="mb-2 text-base font-semibold">
          Auf welche Stelle möchten Sie sich bewerben?*
        </span>
        <select
          className="select select-bordered w-full"
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          <option value="">Bitte auswählen</option>
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Developer</option>
          <option value="uiux">UI/UX Designer</option>
          <option value="project">Projektmanager</option>
        </select>
      </label>

      <div className="w-1/2 space-y-2">
        <p className="text-base font-semibold">Bitte laden Sie sich die folgende Aufgabensbeschreibung herunter.</p>
        <p>Die Aufgabenbeschreibung enthält wichtige Hinweise zur Durchführung und Nutzung des Bewerbungsportals. Halten Sie diese während bereit, z. B. in einem zweiten Tab oder Fenster.</p>
        <a href="/downloads/aufgabe.pdf" download className="btn btn-outline btn-sm mt-2 p-4">
          📄 Aufgabenbeschreibung herunterladen
        </a>        
      </div>


      {/* Positionsauswahl */}
      <div className="w-1/2 space-y-4">
        {/* Bestätigung + Button */}
        <label className="flex items-center">
          <input
            type="checkbox"
            className="checkbox checkbox-accent"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span className="ml-2 text-base">
            Ich bestätige, dass alle folgenden Angaben der Wahrheit entsprechen.*
          </span>
        </label>


        <button
          type="button"
          className={`btn btn-accent text-white text-xl h-12 w-full mt-2 ${
            !isChecked || !selectedPosition ? "btn-disabled" : ""
          }`}
          onClick={handleStartApplication}
        >
          Bewerbung starten
        </button>
      </div>
    </div>
  );
}
