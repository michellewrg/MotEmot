import React, { useState } from "react";

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
    behinderung: "nein",
    behinderung_details: "",
    kinder: "",
    staatsangehoerigkeit: "",
  });
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).files?.[0] || null });
    } else {
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
    // ...weitere Verarbeitung...
  }

  return (
    <form className="max-w-3/5 mx-auto p-6 space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Persönliche Angaben</h2>
      {error && <div className="text-red-500 font-semibold">{error}</div>}

      {/* Geschlecht */}
      <div>
        <label className="block font-semibold mb-1">Geschlecht*</label>
        <div className="flex gap-6">
          {["weiblich", "männlich", "divers", "keine Angabe"].map((g) => (
            <label key={g} className="label cursor-pointer label-oklch">
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
          <label className="block font-semibold mb-1">Ort*</label>
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
          <label className="block font-semibold mb-1">Familienstand*</label>
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
          <label className="block font-semibold mb-1">Sexualität*</label>
          <select
            className="select select-bordered w-full"
            name="sexualitaet"
            value={form.sexualitaet}
            onChange={handleChange}
          >
            <option value="">Bitte wählen</option>
            <option>Heterosexuell</option>
            <option>Homosexuell</option>
            <option>Bisexuell</option>
            <option>Asexuell</option>
            <option>Pansexuell</option>
            <option>Keine Angabe</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Behinderung*</label>
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
              <span>Nein</span>
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
              <span>Ja</span>
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
          <label className="block font-semibold mb-1">Leben Kinder im Haushalt?*</label>
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
              <span>Nein, ich/wir lebe/leben alleine.</span>
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
              <span>Ja, Kinder leben mit mir/uns im Haushalt.</span>
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