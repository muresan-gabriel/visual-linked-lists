import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage.tsx";
import ContextMenu from "./components/ContextMenu.tsx";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="App text-white h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
