import "./App.scss";
import { Game } from "./game";
import { Home } from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Form } from "./home/form";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path='/form' element={<Form/>}></Route>        
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

