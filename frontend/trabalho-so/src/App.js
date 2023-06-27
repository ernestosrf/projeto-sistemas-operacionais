import './App.css';

// Routes
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Pages
import Home from "./Pages/Home/Home";
import Result from "./Pages/Result/Result";


import Footer from './components/Footer';
import Navbar from './components/Navbar';
// import {useState} from 'react';
// import fifo from './data/functions/fifo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Result" element={<Result />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      {/* <Navbar />
        <div className="container">
          <Processos/>
        </div>
      <Footer /> */}
    </div>
  );
}

export default App;