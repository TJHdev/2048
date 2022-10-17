import React from "react";
import { Grid } from "./Game/Grid/Grid";
import "./App.css";
import { GameSettings } from "./Game/GameSettings/GameSettings";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameSettings />
        <Grid />
      </header>
    </div>
  );
}

export default App;
