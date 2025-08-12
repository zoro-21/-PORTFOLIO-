import React, { useState } from 'react';
import '../styles/BrandIdentitySystem.css';

interface BrandIdentitySystemProps {
  isVisible: boolean;
  onClose: () => void;
}

const BrandIdentitySystem: React.FC<BrandIdentitySystemProps> = ({ isVisible, onClose }) => {
  const [activeSection, setActiveSection] = useState('logo');

  const brandColors = [
    { name: 'Primary Cyan', hex: '#00FFFF', rgb: 'rgb(0, 255, 255)', usage: 'Main brand color, CTAs, highlights' },
    { name: 'Deep Blue', hex: '#0080FF', rgb: 'rgb(0, 128, 255)', usage: 'Secondary actions, gradients' },
    { name: 'Dark Background', hex: '#0A0A0A', rgb: 'rgb(10, 10, 10)', usage: 'Primary background' },
    { name: 'Light Gray', hex: '#CCCCCC', rgb: 'rgb(204, 204, 204)', usage: 'Secondary text' },
    { name: 'Pure White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', usage: 'Primary text, contrast' },
    { name: 'Accent Green', hex: '#00FF88', rgb: 'rgb(0, 255, 136)', usage: 'Success states, live indicators' }
  ];

  const typography = [
    { name: 'Primary Heading', font: 'Arial, sans-serif', size: '2.5rem', weight: '700', usage: 'Main titles, hero text' },
    { name: 'Secondary Heading', font: 'Arial, sans-serif', size: '1.8rem', weight: '600', usage: 'Section headers' },
    { name: 'Body Text', font: 'Arial, sans-serif', size: '1rem', weight: '400', usage: 'Paragraphs, descriptions' },
    { name: 'Caption', font: 'Arial, sans-serif', size: '0.8rem', weight: '400', usage: 'Small text, metadata' },
    { name: 'Code', font: 'Monaco, monospace', size: '0.9rem', weight: '400', usage: 'Technical content' }
  ];

  const logoVariations = [
    { name: 'Primary Logo', description: 'Main logo with full wordmark', bg: 'dark' },
    { name: 'Logo Mark', description: 'Icon only version', bg: 'dark' },
    { name: 'Horizontal', description: 'Wide format layout', bg: 'dark' },
    { name: 'Monochrome', description: 'Single color version', bg: 'light' },
    { name: 'Reversed', description: 'Light version for dark backgrounds', bg: 'dark' }
  ];

  const brandElements = [
    { name: 'Geometric Patterns', description: 'Wireframe 3D shapes and particle systems' },
    { name: 'Gradient Overlays', description: 'Cyan to blue gradients for depth' },
    { name: 'Glow Effects', description: 'Subtle neon glows for interactive elements' },
    { name: 'Grid Systems', description: 'Structured layouts with consistent spacing' },
    { name: 'Animation Principles', description: 'Smooth transitions and micro-interactions' }
  ];

  const applications = [
    { name: 'Website Header', preview: 'header-preview' },
    { name: 'Business Card', preview: 'card-preview' },
    { name: 'Social Media', preview: 'social-preview' },
    { name: 'Presentation', preview: 'presentation-preview' },
    { name: 'Mobile App', preview: 'mobile-preview' }
  ];

  if (!isVisible) return null;

  return (
    <div className="brand-identity-overlay">
      <div className="brand-identity-container">
        <div className="brand-header">
          <h1>Terrigraphic Brand Identity System</h1>
          <p>Complete visual identity guidelines and design system</p>
          <button className="close-brand-btn" onClick={onClose}>✕</button>
        </div>

        <div className="brand-navigation">
          {['logo', 'colors', 'typography', 'elements', 'applications'].map(section => (
            <button
              key={section}
              className={`nav-btn ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        <div className="brand-content">
          {activeSection === 'logo' && (
            <div className="logo-section">
              <h2>Logo Variations</h2>
              <div className="logo-grid">
                {logoVariations.map((logo, index) => (
                  <div key={index} className={`logo-item ${logo.bg}`}>
                    <div className="logo-preview">
                      <div className="terrigraphic-logo">
                        {logo.name === 'Logo Mark' ? (
                          <div className="logo-icon">T</div>
                        ) : logo.name === 'Horizontal' ? (
                          <div className="logo-horizontal">
                            <span className="logo-icon">T</span>
                            <span className="logo-text">Terrigraphic</span>
                          </div>
                        ) : (
                          <div className="logo-full">
                            <div className="logo-icon">T</div>
                            <div className="logo-text">Terrigraphic</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="logo-info">
                      <h3>{logo.name}</h3>
                      <p>{logo.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'colors' && (
            <div className="colors-section">
              <h2>Brand Colors</h2>
              <div className="color-palette">
                {brandColors.map((color, index) => (
                  <div key={index} className="color-item">
                    <div 
                      className="color-swatch" 
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className="color-info">
                      <h3>{color.name}</h3>
                      <div className="color-codes">
                        <span className="hex">{color.hex}</span>
                        <span className="rgb">{color.rgb}</span>
                      </div>
                      <p className="color-usage">{color.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'typography' && (
            <div className="typography-section">
              <h2>Typography System</h2>
              <div className="typography-samples">
                {typography.map((type, index) => (
                  <div key={index} className="type-sample">
                    <div 
                      className="sample-text"
                      style={{
                        fontFamily: type.font,
                        fontSize: type.size,
                        fontWeight: type.weight
                      }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="type-info">
                      <h3>{type.name}</h3>
                      <div className="type-specs">
                        <span>Font: {type.font}</span>
                        <span>Size: {type.size}</span>
                        <span>Weight: {type.weight}</span>
                      </div>
                      <p>{type.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'elements' && (
            <div className="elements-section">
              <h2>Brand Elements</h2>
              <div className="elements-grid">
                {brandElements.map((element, index) => (
                  <div key={index} className="element-item">
                    <div className="element-preview">
                      {element.name === 'Geometric Patterns' && (
                        <div className="geometric-preview">
                          <div className="wireframe-shape"></div>
                        </div>
                      )}
                      {element.name === 'Gradient Overlays' && (
                        <div className="gradient-preview"></div>
                      )}
                      {element.name === 'Glow Effects' && (
                        <div className="glow-preview">
                          <div className="glow-element"></div>
                        </div>
                      )}
                      {element.name === 'Grid Systems' && (
                        <div className="grid-preview">
                          <div className="grid-lines"></div>
                        </div>
                      )}
                      {element.name === 'Animation Principles' && (
                        <div className="animation-preview">
                          <div className="animated-dot"></div>
                        </div>
                      )}
                    </div>
                    <div className="element-info">
                      <h3>{element.name}</h3>
                      <p>{element.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'applications' && (
            <div className="applications-section">
              <h2>Brand Applications</h2>
              <div className="applications-grid">
                {applications.map((app, index) => (
                  <div key={index} className="application-item">
                    <div className={`application-preview ${app.preview}`}>
                      {app.name === 'Website Header' && (
                        <div className="header-mockup">
                          <div className="nav-brand">Terrigraphic</div>
                          <div className="nav-items">
                            <span>Home</span>
                            <span>Portfolio</span>
                            <span>About</span>
                            <span>Contact</span>
                          </div>
                        </div>
                      )}
                      {app.name === 'Business Card' && (
                        <div className="card-mockup">
                          <div className="card-logo">T</div>
                          <div className="card-text">
                            <div>Terrigraphic</div>
                            <div>Digital Design</div>
                          </div>
                        </div>
                      )}
                      {app.name === 'Social Media' && (
                        <div className="social-mockup">
                          <div className="social-header">
                            <div className="social-logo">T</div>
                            <span>Terrigraphic</span>
                          </div>
                          <div className="social-content"></div>
                        </div>
                      )}
                      {app.name === 'Presentation' && (
                        <div className="presentation-mockup">
                          <div className="slide-header">Terrigraphic</div>
                          <div className="slide-content">
                            <div className="slide-title">Project Title</div>
                            <div className="slide-bullets">
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      )}
                      {app.name === 'Mobile App' && (
                        <div className="mobile-mockup">
                          <div className="mobile-header">
                            <span>Terrigraphic</span>
                          </div>
                          <div className="mobile-content">
                            <div className="mobile-card"></div>
                            <div className="mobile-card"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <h3>{app.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="brand-footer">
          <p>© 2024 Terrigraphic Brand Identity System - All rights reserved</p>
          <button className="download-guidelines">📋 Download Guidelines</button>
        </div>
      </div>
    </div>
  );
};

export default BrandIdentitySystem;
