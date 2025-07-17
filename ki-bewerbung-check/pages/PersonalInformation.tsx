import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, type AppContextType } from "../context/AppProvider";
import updateScore from "../utils/updateScore"
import InputHeader from "../components/InputHeader"

export default function PersonalInformation() {
  const [form, setForm] = useState({
    gender: "",
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    strasse: "",
    plz: "",
    ort: "",
    familienstand: "",
    sexualitaet: "",
    behinderung: "ja",
    behinderung_details: "",
    kinder: "",
    staatsangehoerigkeit: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { score, setScore, setFileAdded }: AppContextType = useContext(AppContext) as AppContextType;
  const [lastChanges, setLastChanges] = useState<Record<string, string | null>>({});
  const weights = {
    "gender": 12,
    "plz": 3,
    "ort": 3,
    "familienstand": 4,
    "behinderung": 6,
    "kinder": 5
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFileAdded(true)
      setForm({ ...form, [name]: (e.target as HTMLInputElement).files?.[0] || null });
    } else {
      updateScore(name, value, weights[name], score, setScore, lastChanges, setLastChanges);
      setForm({ ...form, [name]: value });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Pflichtfelder prüfen
    if (
      !form.gender ||
      !form.vorname ||
      !form.nachname ||
      !form.email ||
      !form.telefon ||
      !form.strasse ||
      !form.plz ||
      !form.ort ||
      !form.familienstand ||
      !form.sexualitaet ||
      !form.kinder ||
      !form.staatsangehoerigkeit ||
      (form.behinderung === "ja" && !form.behinderung_details)
    ) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    setError(null);
    navigate("/skills");
    // ...weitere Verarbeitung...
  }

  return (
    <form className="w-full p-12 space-y-4 2xl:space-y-6 mt-16" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Persönliche Angaben</h2>
      {error && <div className="text-red-500 font-semibold">{error}</div>}

      {/* Geschlecht */}
      <div>
        <InputHeader title={"Geschlecht*"} name={"gender"} lastChanges={lastChanges} infoContent={"Erfolgreiche Mitarbeitende in unserem Unternehmen weisen häufig ein diverses oder weibliches Geschlechtsprofil auf."} />
        <div className="flex gap-6">
          {["weiblich", "männlich", "divers", "keine Angabe"].map((g) => (
            <label key={g} className="label cursor-pointer text-base-content">
              <input
                type="radio"
                name="gender"
                className="radio radio-accent"
                value={g}
                checked={form.gender === g}
                onChange={handleChange}
              />
              <span className="ml-2">{g.charAt(0).toUpperCase() + g.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Vorname und Nachname */}
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Vorname*</label>
          <input
            type="text"
            className="input input-bordered w-full"
            name="vorname"
            value={form.vorname}
            onChange={handleChange}
            placeholder="z.B. Anna"
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Nachname*</label>
          <input
            type="text"
            className="input input-bordered w-full"
            name="nachname"
            value={form.nachname}
            onChange={handleChange}
            placeholder="z.B. Mustermann"
          />
        </div>
      </div>

      {/* E-Mail und Telefon */}
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block font-semibold mb-1">E-Mail*</label>
          <input
            type="email"
            className="input input-bordered w-full"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="z.B. anna@email.de"
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Telefon*</label>
          <input
            type="tel"
            className="input input-bordered w-full"
            name="telefon"
            value={form.telefon}
            onChange={handleChange}
            placeholder="z.B. 0171 1234567"
          />
        </div>
      </div>

      {/* Straße und Hausnummer, Postleitzahl und Ort */}
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Straße und Hausnummer*</label>
          <input
            type="text"
            className="input input-bordered w-full"
            name="strasse"
            value={form.strasse}
            onChange={handleChange}
            placeholder="z.B. Hauptstraße 1"
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Postleitzahl*</label>
          <input
            type="text"
            className="input input-bordered w-full"
            name="plz"
            value={form.plz}
            onChange={handleChange}
            placeholder="z.B. 12345"
          />
        </div>
        <div className="flex-1">
          <InputHeader title={"Ort*"} name={"ort"} lastChanges={lastChanges} infoContent={"Unsere Daten zeigen: Nur Mitarbeitende aus der eigenen Region bleiben dem Unternehmen oft langfristig verbunden und weisen hohe Zuverlässigkeiten auf."} />
          <input
            type="text"
            className="input input-bordered w-full"
            name="ort"
            value={form.ort}
            onChange={handleChange}
            placeholder="z.B. Berlin"
          />
        </div>
      </div>

      {/* Familienstand, Sexualität, Behinderung */}
      <div className="flex gap-6">
        <div className="flex-1">
          <InputHeader title={"Familienstand*"} name={"familienstand"} lastChanges={lastChanges} infoContent={"Erfolgreiche Mitarbeitende führen oft auch ein stabile und erfolgreiche Partnerschaft."} />
          <select
            className="select select-bordered w-full"
            name="familienstand"
            value={form.familienstand}
            onChange={handleChange}
          >
            <option value="">Bitte wählen</option>
            <option>Ledig</option>
            <option>Verheiratet</option>
            <option>Geschieden</option>
            <option>Verwitwet</option>
            <option>In Partnerschaft</option>
            <option>Keine Angabe</option>
          </select>
        </div>
        <div className="flex-1">
          <InputHeader title={"Behinderung*"} name={"behinderung"} lastChanges={lastChanges} infoContent={"Wir beobachten, dass Mitarbeitende mit unterschiedlichsten Hintergründen zur Diversität und Innovationskraft beitragen."} />
          <div className="flex gap-4 items-center h-10">
            <label className="label cursor-pointer label-oklch">
              <input
                type="radio"
                name="behinderung"
                className="radio radio-accent"
                value="nein"
                checked={form.behinderung === "nein"}
                onChange={handleChange}
              />
              <span className="text-base-content">Nein</span>
            </label>
            <label className="label cursor-pointer flex items-center label-oklch">
              <input
                type="radio"
                name="behinderung"
                className="radio radio-accent"
                value="ja"
                checked={form.behinderung === "ja"}
                onChange={handleChange}
              />
              <span className="text-base-content">Ja</span>
              {form.behinderung === "ja" && (
                <input
                  type="text"
                  className="input input-bordered ml-2 w-40"
                  name="behinderung_details"
                  placeholder="z.B. Blind"
                  value={form.behinderung_details}
                  onChange={handleChange}
                />
              )}
            </label>
          </div>
        </div>
      </div>

      {/* Leben Kinder im Haushalt und Staatsangehörigkeit */}
      <div className="flex gap-6">
        <div className="flex-1">
          <InputHeader title={"Leben Kinder im Haushalt?*"} name={"kinder"} lastChanges={lastChanges} infoContent={"In unserem Unternehmen zeigen Daten, dass Mitarbeitende mit familiären Verpflichtungen häufig besonders resilient und strukturiert agieren."} />
          <div className="flex gap-2 flex-col">
            <label className="label cursor-pointer label-oklch">
              <input
                type="radio"
                name="kinder"
                className="radio radio-accent"
                value="nein"
                checked={form.kinder === "nein"}
                onChange={handleChange}
              />
              <span className="text-base-content">Nein, ich/wir lebe/leben alleine.</span>
            </label>
            <label className="label cursor-pointer label-oklch">
              <input
                type="radio"
                name="kinder"
                className="radio radio-accent"
                value="ja"
                checked={form.kinder === "ja"}
                onChange={handleChange}
              />
              <span className="text-base-content">Ja, Kinder leben mit mir/uns im Haushalt.</span>
            </label>
          </div>
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Staatsangehörigkeit*</label>
          <select
            className="select select-bordered w-full"
            name="staatsangehoerigkeit"
            value={form.staatsangehoerigkeit}
            onChange={handleChange}
          >
            <option value="">Bitte wählen</option>
            <option>Deutschland</option>
            <option>Österreich</option>
            <option>Schweiz</option>
            <option>EU</option>
            <option>Andere</option>
            <option>Keine Angabe</option>
          </select>
        </div>
      </div>

      {/* Motivationsschreiben */}
      <div>
        <label className="block font-semibold mb-1">Motivationsschreiben</label>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          name="motivationsschreiben"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-accent text-white w-32 mt-4">
        Weiter
      </button>
    </form>
  );
}