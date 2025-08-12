import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <section className="home">
      <div className="home-content">
        <h1 className="home-title">
          Welcome to
          <br />
          <span className="highlight">Terrigraphic</span>
        </h1>
        <p className="home-subtitle">
          Futuristic 3D Art & Digital Design
        </p>
        <div className="home-buttons">
          <Link to="/portfolio" className="btn btn-primary">
            View Portfolio
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
