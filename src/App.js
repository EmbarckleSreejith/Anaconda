import "./App.css";
import { Game } from "./game";
import { Home } from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/game" element={<Game />}></Route>         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
