import React from "react";
import HomePage from "./pages/HomePage";
import ChartPage from "./pages/ChartPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/echarts" element={<ChartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
