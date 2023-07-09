import './App.css';

// Routes
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Pages
import Home from "./Pages/Home/Home";


import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;