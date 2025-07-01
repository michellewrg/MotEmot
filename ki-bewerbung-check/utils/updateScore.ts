export default function updateScore (input: string, value: string, weight: number = 2, score: number, setScore: React.Dispatch<React.SetStateAction<number>>, 
    lastChanges: Record<string, string | null>, setLastChanges: React.Dispatch<React.SetStateAction<Record<string, string | null>>>) {
    const acceptableValues = [
        "6-9 Jahre", "mehr als 10 Jahre", "", // Berufserfahrung
        "health", "construction", "finance", "environment", // Branchen
        "haupt", "real", "ausbildung" // Highest Ed
    ]
    const lastChange = lastChanges[input] || null;
    console.log(lastChange)

  if (acceptableValues.includes(value)) {
    if (lastChange !== "increased" && score < 100) {
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