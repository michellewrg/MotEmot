export default function updateScore (input: string, value: string, weight: number = 2, score: number, setScore: React.Dispatch<React.SetStateAction<number>>, 
  lastChanges: Record<string, string | null>, setLastChanges: React.Dispatch<React.SetStateAction<Record<string, string | null>>>) {
  
  const notEvaluatedInputs = ["companyNum", "vorname", "nachname", "email", "telefon", "fuehrerscheinKlasse", "beruflich", "itWeitere",
    "strasse", "behinderung_details", "staatsangehoerigkeit", "sonstiges"]
  if (notEvaluatedInputs.includes(input)){
    return
  }
  
  const acceptableValues = [
    // Erfahrungen
        "weniger als 1 Jahr", "1-2 Jahre", "3-5 Jahre", "", // Berufserfahrung
        "health", "construction", "finance", "environment", // Branchen
    // Pers. Angaben
        "haupt", "real", "ausbildung", // Highest Ed
        "weiblich", "divers", // Geschlecht
        "23564", "23562", "23560", "23558", "23556", "23554", "23552", // PLZ
        "Lübeck", // Ort
        "Verheiratet", "In Partnerschaft", // Familienstand
        "ja", // Behinderung, Kinder
    // Skills
        "SAP", "Programmieren", "Excel", "nicht vorhanden"
  ]
  const lastChange = lastChanges[input] || null;
  console.log(lastChange)

  if (acceptableValues.includes(value)) {
    if (lastChange !== "increased" && lastChange !== null && score < 100) {
      setScore(score + weight);
      setLastChanges({...lastChanges, [input]: "increased"});
    }
  } else {
    if (lastChange !== "decreased") {
      setScore(score - weight);
      setLastChanges({...lastChanges, [input]: "decreased"});
    }
  }
}