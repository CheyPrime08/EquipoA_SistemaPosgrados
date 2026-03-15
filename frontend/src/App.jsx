import Login from "./pages/preregistro/login/login";
import Preregistro from "./pages/preregistro/preregistro";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/preregistro" element={<Preregistro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
