import "./App.css";
import ThemeSwitch from "../components/ThemeSwitch";
import PersonalInformation from "../pages/PersonalInformation";
import Skills from "../pages/Skills";

function App() {
  return (
    <>
      <div className="navbar text-white bg-accent shadow-sm justify-between">
        <a className="btn btn-ghost text-3xl">EVOKE</a>
        <ThemeSwitch/>
      </div>
      <PersonalInformation />
      <Skills />
    </>
  );
}

export default App;
