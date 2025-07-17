import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext, type AppContextType } from "../context/AppProvider";
import ScoreBar from "../components/ScoreBar"
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

function Evaluation() {

  ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler, annotationPlugin);
  const { score, fileAdded }: AppContextType = useContext(AppContext) as AppContextType;
  const data = {
    labels: [0,10,20,30,40,50,60,70,80,90,100],
    datasets: [
      {
        data: [9,16,23,28,49,74,80,68,34,20,10],
        fill: true,
        pointRadius: 0.25,
        backgroundColor: "oklch(61.26% 0.2 18.34 / 25%)",
        borderColor: "oklch(61.26% 0.2 18.34)"
      }
    ]
  };
  
  return (
    <div className="flex flex-col w-1/5 h-screen border-l-1 border-base-300 mt-16 p-12">
      <h2 className="text-2xl font-bold mb-4">Analyseergebnisse</h2>
      <p>Lange Wartezeiten für Rückmeldungen waren gestern! In diesem Bereich erhalten Sie direkt Feedback darüber, wie gut ihre Chancen bei uns stehen.</p>

      <h3 className="text-lg font-bold my-6">Persönliche Angaben</h3>
      <FontAwesomeIcon icon={`${score >= 80 ? "face-smile" : score <= 79 && score >= 45 ? "face-meh" : "face-frown"}`} size='7x' className={`${score >= 80 ? "text-teal-500" : score <= 79 && score >= 45 ? "text-amber-500" : "text-red-500"} mb-4`} />
      <ScoreBar score={score} />

      <h3 className="text-lg font-bold mt-8">Persönlichkeitsanalyse</h3>
      {fileAdded && (
        <p>Placeholder für Persönlichkeitsanalyse.</p>
      )}
      {!fileAdded && (
        <p className="text-zinc-500">Keine Daten verfügbar. Bitte laden Sie das Motivationsschreiben hoch.</p>
      )}

      <h3 className="text-lg font-bold mt-8 mb-4">Vergleich zu anderen Bewerbern</h3>
      <Line data={data}  
      options={{
          scales: {
            x: {
              type: 'linear',
              min: 0, max: 100,
              grid: { display: false },
              title: {
                display: true, text: 'Score',
                font: { size: 14, weight: 'bolder' },
                color: '#444'
              },
              ticks: { font: { size: 14 } }
            },
            y: {
              grid: { display: false },
              ticks: { font: { size: 14 } }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            annotation: {
              annotations: {
                vertLine1: {
                  type: 'line',
                  xMin: score, xMax: score,
                  borderColor: 'black', borderWidth: 3
                },
                vertLine2: {
                  type: 'line',
                  xMin: 75, xMax: 75,
                  borderColor: '#e23e53', borderWidth: 3,
                  label: {
                    display: true,
                    content: 'EVOKE AI', position: 'start',
                    color: 'white', backgroundColor: "#e23e53",
                    font: { weight: 'semibold', size: '6px' }
                  }
                }
              }
            }
          }
        }}
      />
    </div>
  );
}

export default Evaluation;