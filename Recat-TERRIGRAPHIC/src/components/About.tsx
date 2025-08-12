import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <section className="about">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">About Thrishank P</h1>
          <p className="about-subtitle">
            Digital Artist & Creative Developer behind Terrigraphic
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2 className="about-section-title">About Me</h2>
            <p className="about-description">
              Hi, I'm Thrishank P, a passionate digital artist and creative developer 
              specializing in 3D art, interactive media, and futuristic design. With a deep 
              love for technology and creativity, I create immersive digital experiences 
              that push the boundaries of visual storytelling.
            </p>
            <p className="about-description">
              My work combines cutting-edge technology with artistic vision to create 
              unique digital experiences. From 3D modeling and animation to interactive 
              web applications, I strive to bring imagination to life through code and design.
            </p>

            <div className="skills-section">
              <h3 className="skills-title">Skills & Expertise</h3>
              <div className="skills-grid">
                <div className="skill-item">
                  <h4>3D Art & Modeling</h4>
                  <p>Three.js, Blender, Cinema 4D</p>
                </div>
                <div className="skill-item">
                  <h4>Web Development</h4>
                  <p>React, TypeScript, Node.js</p>
                </div>
                <div className="skill-item">
                  <h4>Digital Design</h4>
                  <p>UI/UX, Brand Identity, Motion Graphics</p>
                </div>
                <div className="skill-item">
                  <h4>Interactive Media</h4>
                  <p>WebGL, VR/AR, Game Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
