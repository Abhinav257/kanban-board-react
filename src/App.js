import React from "react";
import { GlobalStateProvider } from "./GlobalState";
import Component from "./Component";

function App() {
  return (
    <GlobalStateProvider>
      <Component />
    </GlobalStateProvider>
  );
}

export default App;
