import React, { useState, useContext } from "react";
import { AppContext, type AppContextType } from "../context/AppProvider";
import updateScore from "../utils/updateScore"

export default function Skills() {
  const [form, setForm] = useState({
    sprachen: [{ sprache: "", niveau: "" }],
    it: [] as string[],
    itWeitere: "",
    beruflich: "",
    fuehrerschein: "",
    fuehrerscheinKlasse: "",
    softskills: [] as string[],
    sonstiges: "",
    anlagen: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);
  const { score, setScore }: AppContextType = useContext(AppContext) as AppContextType;
  const [lastChanges, setLastChanges] = useState<Record<string, string | null>>({});

  // Sprachfelder dynamisch hinzufügen/entfernen
  function handleSprachenChange(idx: number, field: string, value: string) {
    const sprachen = [...form.sprachen];
    sprachen[idx][field as "sprache" | "niveau"] = value;
    setForm({ ...form, sprachen });
    updateScore("sprache", value, 4, score, setScore, lastChanges, setLastChanges);
    updateScore("niveau", value, 4, score, setScore, lastChanges, setLastChanges);
  }
  function addSprache() {
    setForm({ ...form, sprachen: [...form.sprachen, { sprache: "", niveau: "" }] });
  }
  function removeSprache(idx: number) {
    setForm({ ...form, sprachen: form.sprachen.filter((_, i) => i !== idx) });
  }

  function handleCheckboxChange(field: string, value: string) {
    const arr = form[field as "it" | "softskills"];
    setForm({
      ...form,
      [field]: arr.includes(value)
        ? arr.filter((v: string) => v !== value)
        : [...arr, value],
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).files?.[0] || null });
    } else {
      updateScore(name, value, 4, score, setScore, lastChanges, setLastChanges);
      setForm({ ...form, [name]: value });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Beispielhafte Pflichtfeldprüfung: Mind. eine Sprache und ein IT-Kenntnis
    if (
      !form.sprachen[0].sprache ||
      !form.sprachen[0].niveau ||
      form.it.length === 0
    ) {
      setError("Bitte geben Sie mindestens eine Sprache und ein IT-Kenntnis an.");
      return;
    }
    setError(null);
    // ...weitere Verarbeitung...
  }

  return (
    <form className="w-full p-12 space-y-4 2xl:space-y-6 mt-16" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Kenntnisse & Fähigkeiten</h2>
      {error && <div className="text-red-500 font-semibold">{error}</div>}

      {/* Sprachen */}
      <div>
        <label className="block font-semibold mb-1">Fremdsprachen*</label>
        {form.sprachen.map((s, idx) => (
          <div className="flex gap-6 mb-2" key={idx}>
            <input
              type="text"
              className="input input-bordered w-1/3"
              name={`sprache-${idx}`}
              value={s.sprache}
              onChange={e => handleSprachenChange(idx, "sprache", e.target.value)}
              placeholder="z.B. Englisch"
            />
            <select
              className="select select-bordered w-1/3"
              name={`niveau-${idx}`}
              value={s.niveau}
              onChange={e => handleSprachenChange(idx, "niveau", e.target.value)}
            >
              <option value="">Niveau wählen</option>
              <option>Grundkenntnisse</option>
              <option>Gut</option>
              <option>Sehr gut</option>
              <option>Muttersprache</option>
            </select>
            {form.sprachen.length > 1 && (
              <button
                type="button"
                className="btn btn-error btn-xs"
                onClick={() => removeSprache(idx)}
              >
                Entfernen
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-outline btn-sm mt-1" onClick={addSprache}>
          Weitere Sprache hinzufügen
        </button>
      </div>

      {/* IT-Kenntnisse */}
      <div>
        <label className="block font-semibold mb-1">IT-Kenntnisse*</label>
        <div className="flex flex-wrap gap-6">
          {["MS Office", "Excel", "PowerPoint", "Word", "Outlook", "Teams", "SAP", "Photoshop", "Programmieren"].map((it) => (
            <label key={it} className="label cursor-pointer text-base-content">
              <input
                type="checkbox"
                name="it"
                className="checkbox checkbox-accent"
                checked={form.it.includes(it)}
                onChange={() => handleCheckboxChange("it", it)}
              />
              <span>{it}</span>
            </label>
          ))}
        </div>
        <input
          type="text"
          className="input input-bordered w-full mt-2"
          name="itWeitere"
          value={form.itWeitere}
          onChange={handleChange}
          placeholder="Weitere IT-Kenntnisse (optional)"
        />
      </div>

      {/* Berufsspezifische Fähigkeiten */}
      <div>
        <label className="block font-semibold mb-1">Berufsspezifische Fähigkeiten</label>
        <input
          type="text"
          className="input input-bordered w-full"
          name="beruflich"
          value={form.beruflich}
          onChange={handleChange}
          placeholder="z.B. Projektmanagement, Kundenkontakt, Verkauf"
        />
      </div>

      {/* Führerschein */}
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Führerschein</label>
          <div className="flex gap-6 items-center">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="fuehrerschein"
                className="radio radio-accent"
                value="ja"
                checked={form.fuehrerschein === "ja"}
                onChange={handleChange}
              />
              <span className="text-base-content">Ja</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="fuehrerschein"
                className="radio radio-accent"
                value="nein"
                checked={form.fuehrerschein === "nein"}
                onChange={handleChange}
              />
              <span className="text-base-content">Nein</span>
            </label>
            {form.fuehrerschein === "ja" && (
              <select
                className="select select-bordered w-32"
                name="fuehrerscheinKlasse"
                value={form.fuehrerscheinKlasse}
                onChange={handleChange}
              >
                <option value="">Klasse wählen</option>
                <option>B</option>
                <option>BE</option>
                <option>C</option>
                <option>CE</option>
                <option>D</option>
                <option>T</option>
                <option>AM</option>
                <option>A</option>
                <option>Keine Angabe</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <label className="block font-semibold mb-1">Soft Skills</label>
        <div className="flex flex-wrap gap-6">
          {["Teamfähigkeit", "Zuverlässigkeit", "Eigeninitiative", "Kommunikationsfähigkeit", "Belastbarkeit", "Organisationstalent"].map((skill) => (
            <label key={skill} className="label cursor-pointer text-base-content">
              <input
                type="checkbox"
                name="softskills"
                className="checkbox checkbox-accent"
                checked={form.softskills.includes(skill)}
                onChange={() => handleCheckboxChange("softskills", skill)}
              />
              <span>{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sonstige Qualifikationen */}
      <div>
        <label className="block font-semibold mb-1">Sonstige Qualifikationen</label>
        <input
          type="text"
          className="input input-bordered w-full"
          name="sonstiges"
          value={form.sonstiges}
          onChange={handleChange}
          placeholder="z.B. Erste-Hilfe-Kurs, Ausbilderschein, Zertifikate"
        />
      </div>

      {/* Weitere Anlagen */}
      <div>
        <label className="block font-semibold mb-1">Weitere Anlagen (z.B. Zertifikate)</label>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          name="anlagen"
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-accent text-white w-32 mt-4">
        Absenden
      </button>
    </form>
  );
}