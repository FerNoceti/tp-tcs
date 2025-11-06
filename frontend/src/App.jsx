import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import NavBar from "./components/NavBar";
import "./styles/base.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="app-container">
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;
