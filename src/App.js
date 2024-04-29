import "./App.css";
import History from "./components/history/History";
import Home from "./components/home/Home";
import MilkTimer from "./components/milkTimer/MilkTimer";

const App = () => {
  return (
    <div className="App">
      <h1>hello react </h1>
      <History />
      <Home />
      <MilkTimer />
    </div>
  );
};

export default App;
