import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App text-white h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage></Homepage>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
