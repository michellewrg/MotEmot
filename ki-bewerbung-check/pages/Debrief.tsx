import interviewImage from "../src/assets/undraw_interview_yz52.svg";

export default function End() {
  return (
    <div className="w-full flex flex-col p-12 mt-12 items-center space-y-8">
      <div className="flex w-1/2 items-center flex-col space-y-6 2xl:space-y-12">
        <h1 className="text-4xl font-bold">Erfolgreich eingesendet!</h1>
        <img
          src={interviewImage}
          className="w-1/2"
          alt="Interview Illustration"
        />
        <p className="text-lg text-left">
            <strong>Vielen Dank für Ihre Teilnahme.</strong>
            <br/><br/>
            Das von Ihnen genutzte System ist kein echtes Bewerbungs-Tool, sondern Teil einer konzeptionellen Simulation, 
            die zeigen soll, wie Künstliche Intelligenz in Bewerbungsprozessen nicht nur unterstützen, sondern auch diskriminieren kann.
            <br/><br/>
            Die Bewertungen, die Sie während der Eingabe erhalten haben, basierten nicht ausschließlich auf objektiven Kriterien, 
            sondern wurden gezielt mit verzerrten Gewichtungen und Stereotypen versehen. Grundlage war ein fiktives Profil „idealer“ Mitarbeitender, das bewusst gesellschaftliche Vorannahmen 
            umkehrt und reproduziert – um Ihnen zu verdeutlichen, wie subtil Vorurteile in algorithmischen Entscheidungen wirken können.
            <br/><br/>
            Ziel dieses Tools war es, für algorithmische Fairness, Vorurteilsfreiheit und Transparenz im Einsatz von KI in der Arbeitswelt zu sensibilisieren.
            Die Ergebnisse, Bewertungen und Rückmeldungen im System haben keinerlei Aussagekraft über Ihre tatsächliche Eignung oder Qualifikation.
        </p>
      </div>
    </div>
  );
}
