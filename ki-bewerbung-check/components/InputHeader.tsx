import {  useContext } from "react";
import { AppContext, type AppContextType } from "../context/AppProvider";
import InfoTooltip from "../components/InfoTooltip"


function InputHeader({ title, name, lastChanges, infoContent } : { title: string; name: string; lastChanges: Record<string, string | null>; infoContent: string; }) {

  const { isFieldFlagged }: AppContextType = useContext(AppContext) as AppContextType;

  return (
    <div className="w-full flex justify-between ">
        <label className="block font-semibold mb-1">{title}</label>
        <div className={`transition-opacity duration-300 ${isFieldFlagged(name, lastChanges) ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <InfoTooltip content={infoContent} />
        </div>
    </div>
  );
}

export default InputHeader;
