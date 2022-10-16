import React from "react";
import { Game } from "./features/Game/Game";
import "./App.css";
import { GameSettings } from "./features/GameSettings/GameSettings";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameSettings />
        <Game />
      </header>
    </div>
  );
}

export default App;
