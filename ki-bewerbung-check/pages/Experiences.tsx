import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, type AppContextType } from "../context/AppProvider";
import updateScore from "../utils/updateScore"
import InputHeader from "../components/InputHeader"

export default function Experiences() {
  const [form, setForm] = useState({
    jobExp: "",
    companyNum: "",
    branches: [] as string[],
    highestEd: ""
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { score, setScore }: AppContextType = useContext(AppContext) as AppContextType;
  const [lastChanges, setLastChanges] = useState<Record<string, string | null>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).files?.[0] || null });
    } else if (type === "checkbox" && name === "branches") {
      const checked = (e.target as HTMLInputElement).checked;
      updateScore(name, value, 4, score, setScore, lastChanges, setLastChanges);
      setForm((prevForm) => {
        const branches = prevForm.branches as string[];
        return { ...prevForm, branches: checked ? [...branches, value] : branches.filter((v) => v !== value) };
      }); 
    }
    else {
      updateScore(name, value, 4, score, setScore, lastChanges, setLastChanges);
      setForm({ ...form, [name]: value });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    console.log(score)
    e.preventDefault();
    // Pflichtfelder prüfen
    if (!form.jobExp || !form.companyNum || form.branches.length === 0 || !form.highestEd
    ) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    setError(null);
    navigate("/personal-information");
    // ...weitere Verarbeitung...
  }

  return (
    <form className="w-full p-12 space-y-4 2xl:space-y-6 mt-16" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Erfahrungen</h2>
      {error && <div className="text-red-500 font-semibold">{error}</div>}

        {/* Berufserfahrung */}
        <div className="flex-1">
          <InputHeader title={"Berufserfahrung*"} name={"jobExp"} lastChanges={lastChanges} infoContent={"Mitarbeitende in dieser Position besitzen meist mehr als 5 Jahre an Erfahrung."} />
          <select className="select select-bordered w-full" name="jobExp" value={form.jobExp} onChange={handleChange}>
            <option value="">Bitte wählen</option>
            <option>weniger als 1 Jahr</option>
            <option>1-2 Jahre</option>
            <option>3-5 Jahre</option>
            <option>6-9 Jahre</option>
            <option>mehr als 10 Jahre</option>
            <option>Keine Angabe</option>
          </select>
        </div>

      {/* Anzahl Unternehmen */}
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block font-semibold mb-1">In wie vielen Unternehmen haben Sie bereits gearbeitet?*</label>
          <input type="number" className="input input-bordered w-full" name="companyNum" value={form.companyNum} onChange={handleChange} placeholder="z.B. 2"/>
        </div>
      </div>

      {/* Branchen */}
      <div className="flex flex-col gap-6">
        <div>
          <InputHeader title={"In welchen Branchen haben Sie gearbeitet?*"} name={"branches"} lastChanges={lastChanges} infoContent={"Mitarbeitende in dieser Position kommen meist aus anderen Branchen."} />    
          <p className="block italic">Markieren Sie alle Branchen die zutreffend sind. </p>          
        </div>
        <div className="flex-1 flex gap-x-6 gap-y-2">
          <div className="flex gap-2 flex-col">
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="health" checked={form.branches.includes("health")} onChange={handleChange} />
              <span className="text-base-content">Gesundheitswesen</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="social" checked={form.branches.includes("social")} onChange={handleChange}/>
              <span className="text-base-content">Gesellschaft und Soziales</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="construction" checked={form.branches.includes("construction")} onChange={handleChange}/>
              <span className="text-base-content">Baugewerbe</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="services" checked={form.branches.includes("services")} onChange={handleChange}/>
              <span className="text-base-content">Dienstleistungen und Handwerk</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="finance" checked={form.branches.includes("finance")} onChange={handleChange}/>
              <span className="text-base-content">E-Commerce und Finanzen</span>
            </label>
          </div>
          <div className="flex gap-2 flex-col gap-x-6 gap-y-2">
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="environment" checked={form.branches.includes("environment")} onChange={handleChange}/>
              <span className="text-base-content">Energie und Umwelt</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="media" checked={form.branches.includes("media")} onChange={handleChange}/>
              <span className="text-base-content">Medien und Design</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="it" checked={form.branches.includes("it")} onChange={handleChange}/>
              <span className="text-base-content">Telekommunikation und IT</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="marketing" checked={form.branches.includes("marketing")} onChange={handleChange}/>
              <span className="text-base-content">Werbung und Marketing</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="economy" checked={form.branches.includes("economy")} onChange={handleChange}/>
              <span className="text-base-content">Wirtschaft und Politik</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="checkbox" name="branches" className="checkbox checkbox-accent" value="other" checked={form.branches.includes("other")} onChange={handleChange}/>
              <span className="text-base-content">Sonstige</span>
            </label>
          </div>
        </div>
      </div>

      {/* Bildung */}
      <div className="flex flex-col gap-6">
        <div>
          <InputHeader title={"Bitte geben Sie Ihren höchsten Bildungsabschluss an.*"} name={"highestEd"} lastChanges={lastChanges} infoContent={"Mitarbeitende in dieser Position besitzen meist andere Qualifizierungen."} />    
        </div>
        <div className="flex-1 flex gap-x-6 gap-y-2">
          <div className="flex gap-2 flex-col">
            <label className="label cursor-pointer label-oklch">
              <input type="radio" name="highestEd" className="radio radio-accent" value="haupt" checked={form.highestEd === "haupt"} onChange={handleChange} />
              <span className="text-base-content">Hauptschulabschluss</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="radio" name="highestEd" className="radio radio-accent" value="real" checked={form.highestEd === "real"} onChange={handleChange}/>
              <span className="text-base-content">Realschulabschluss</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="radio" name="highestEd" className="radio radio-accent" value="fach-abi" checked={form.highestEd === "fach-abi"} onChange={handleChange}/>
              <span className="text-base-content">Fachhochschulreife</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="radio" name="highestEd" className="radio radio-accent" value="abi" checked={form.highestEd === "abi"} onChange={handleChange}/>
              <span className="text-base-content">Allgemeine Hochschulreife</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="radio" name="highestEd" className="radio radio-accent" value="ausbildung" checked={form.highestEd === "ausbildung"} onChange={handleChange}/>
              <span className="text-base-content">Berufsausbildung</span>
            </label>
          </div>
          <div className="flex gap-2 flex-col gap-x-6 gap-y-2">
            <label className="label cursor-pointer label-oklch">
              <input type="radio" name="highestEd" className="radio radio-accent" value="bsc" checked={form.highestEd === "bsc"} onChange={handleChange}/>
              <span className="text-base-content">Bachelor</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="radio" name="highestEd" className="radio radio-accent" value="msc" checked={form.highestEd === "msc"} onChange={handleChange}/>
              <span className="text-base-content">Master</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="radio" name="highestEd" className="radio radio-accent" value="dr" checked={form.highestEd === "dr"} onChange={handleChange}/>
              <span className="text-base-content">Promotion</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input type="radio" name="highestEd" className="radio radio-accent" value="other" checked={form.highestEd === "other"} onChange={handleChange}/>
              <span className="text-base-content">Sonstige</span>
            </label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-accent text-white w-32 mt-4">
        Weiter
      </button>
    </form>
  );
}