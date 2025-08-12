import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import ThreeBackground from './components/ThreeBackground';
import Chatbot from './components/Chatbot';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <ThreeBackground />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
