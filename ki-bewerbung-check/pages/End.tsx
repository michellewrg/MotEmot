import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import interviewImage from "../src/assets/undraw_interview_yz52.svg";
import { AppContext, type AppContextType } from "../context/AppProvider";


export default function End() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { score }: AppContextType = useContext(AppContext) as AppContextType;

  function showDebrief() {
    if (isChecked) {
      navigate("/debrief");
    }
  }

  return (
    <div className="w-full flex flex-col p-12 mt-12 items-center space-y-8">
      <div className="flex w-1/2 items-center flex-col space-y-6 2xl:space-y-12">
        <h1 className="text-4xl font-bold">Geschafft!</h1>
        <img
          src={interviewImage}
          className="w-1/2"
          alt="Interview Illustration"
        />
        <p className="text-lg text-center">
          Ihr Bewerbungsscore liegt bei <span className="font-bold text-2xl">{score} / 100!</span> 
        </p>
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
            Ich möchte meine endgültig Bewerbung einreichen.*
          </span>
        </label>

        <button
          type="button"
          className={`btn btn-accent text-white text-xl h-12 w-full mt-2 ${
            !isChecked ? "btn-disabled" : ""
          }`}
          onClick={showDebrief}
        >
          Bewerbung einreichen
        </button>
      </div>
    </div>
  );
}
