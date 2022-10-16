import React from "react";
import logo from "./logo.svg";
import { Game } from "./features/counter/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
      </header>
    </div>
  );
}

export default App;
