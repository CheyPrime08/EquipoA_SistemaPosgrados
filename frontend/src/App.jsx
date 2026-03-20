import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import HomeCoord from "./pages/coordinacion/agenda/HomeCoord";

function App() {
  return (
    <BrowserRouter>
      <HomeCoord />
    </BrowserRouter>
  );
}

export default App;
