import { Routes, Route, Navigate } from "react-router-dom";
import "./helpers/helper_classes.scss";
import "./App.scss";
import History from "./components/history/History";
import Home from "./components/home/Home";
import MilkTimer from "./components/milkTimer/MilkTimer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
      <Route path="/milking" element={<MilkTimer />} />
      <Route path="*" element={<Navigate to={`/`} replace />} />
    </Routes>
  );
};

export default App;
