import React from "react";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <header>
        <h1>Futsal booking</h1>
      </header>
      <Toaster />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
