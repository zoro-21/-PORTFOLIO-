import React, { useState } from 'react';
import ParticleSystem from './ParticleSystem';
import GeometricArtGenerator from './GeometricArtGenerator';
import MotionGraphicsReel from './MotionGraphicsReel';
import BrandIdentitySystem from './BrandIdentitySystem';
import '../styles/Portfolio.css';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'live';
}

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showParticleSystem, setShowParticleSystem] = useState(false);
  const [showGeometricArt, setShowGeometricArt] = useState(false);
  const [showMotionGraphics, setShowMotionGraphics] = useState(false);
  const [showBrandIdentity, setShowBrandIdentity] = useState(false);

  const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Terrigraphic React Portfolio',
    category: 'web-development',
    image: '/images/terrigraphic-portfolio.png',
    description: 'Modern React portfolio with Three.js 3D graphics and responsive design',
    technologies: ['React', 'TypeScript', 'Three.js', 'CSS3'],
    liveUrl: 'http://localhost:3000',
    githubUrl: '#',
    status: 'live'
  },
  {
    id: 2,
    title: 'Interactive 3D Particle System',
    category: '3d-art',
    image: '/images/particle-system.png',
    description: 'An interactive 3D particle system with dynamic animations',
    technologies: ['Three.js', 'React', 'TypeScript'],
    liveUrl: '#particle-demo',
    githubUrl: '#',
    status: 'live'
  },
  {
    id: 3,
    title: 'Chatbot',
    category: 'interactive',
    image: '/images/chatbot.png',
    description: 'AI-powered chatbot with natural language processing',
    technologies: ['React', 'TypeScript', 'OpenAI API'],
    liveUrl: '#chatbot-demo',
    githubUrl: '#',
    status: 'live'
  },
  {
    id: 4,
    title: 'Geometric Art Generator',
    category: 'digital-design',
    image: '/images/geometric-art.png',
    description: 'Generative art using geometric shapes and colors',
    technologies: ['React', 'TypeScript', 'Canvas API'],
    liveUrl: '#geometric-demo',
    githubUrl: '#',
    status: 'live'
  },
  {
    id: 5,
    title: 'Motion Graphics Reel',
    category: 'digital-design',
    image: '/images/motion-reel.png',
    description: 'Showcase of motion graphics and animation projects',
    technologies: ['React', 'TypeScript', 'CSS3', 'Framer Motion'],
    liveUrl: '#motion-demo',
    githubUrl: '#',
    status: 'live'
  },
  {
    id: 6,
    title: 'Brand Identity System',
    category: 'digital-design',
    image: '/images/brand-identity.png',
    description: 'Comprehensive brand identity design system',
    technologies: ['React', 'TypeScript', 'CSS3', 'Figma'],
    liveUrl: '#brand-demo',
    githubUrl: '#',
    status: 'live'
  }
];


  const categories = [
    { key: 'all', label: 'All Work' },
    { key: 'web-development', label: 'Web Development' },
    { key: '3d-art', label: '3D Art' },
    { key: 'digital-design', label: 'Digital Design' },
    { key: 'interactive', label: 'Interactive' }
  ];

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return '#00ff88';
      case 'completed': return '#00d4ff';
      case 'in-progress': return '#ffaa00';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'Live';
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return status;
    }
  };

  return (
    <section className="portfolio">
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h1 className="portfolio-title">My Portfolio</h1>
          <p className="portfolio-subtitle">
            Explore my creative journey through digital art and design
          </p>
        </div>

        <div className="portfolio-filters">
          {categories.map(category => (
            <button
              key={category.key}
              className={`filter-btn ${activeFilter === category.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="portfolio-item">
              <div className="portfolio-image">
                <img src={item.image} alt={item.title} />
                <div className="portfolio-overlay">
                  <div className="portfolio-content">
                    <div className="portfolio-header-info">
                      <h3 className="portfolio-item-title">{item.title}</h3>
                      <div className="portfolio-meta">
                        <span
                          className="portfolio-status"
                          style={{ color: getStatusColor(item.status) }}
                        >
                          ● {getStatusText(item.status)}
                        </span>
                      </div>
                    </div>
                    <p className="portfolio-item-description">{item.description}</p>
                    <div className="portfolio-technologies">
                      {item.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="portfolio-actions">
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target={item.liveUrl.startsWith('#') ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          className="portfolio-btn primary"
                          onClick={
                            item.liveUrl === '#chatbot-demo' ? (e) => {
                              e.preventDefault();
                              const chatToggle = document.querySelector('.chat-toggle') as HTMLButtonElement;
                              if (chatToggle) chatToggle.click();
                            } : item.liveUrl === '#particle-demo' ? (e) => {
                              e.preventDefault();
                              setShowParticleSystem(true);
                            } : item.liveUrl === '#geometric-demo' ? (e) => {
                              e.preventDefault();
                              setShowGeometricArt(true);
                            } : item.liveUrl === '#motion-demo' ? (e) => {
                              e.preventDefault();
                              setShowMotionGraphics(true);
                            } : item.liveUrl === '#brand-demo' ? (e) => {
                              e.preventDefault();
                              setShowBrandIdentity(true);
                            } : undefined
                          }
                        >
                          {item.liveUrl === '#chatbot-demo' ? 'Try Chatbot' :
                           item.liveUrl === '#particle-demo' ? 'Launch Demo' :
                           item.liveUrl === '#geometric-demo' ? 'Launch Generator' :
                           item.liveUrl === '#motion-demo' ? 'View Reel' :
                           item.liveUrl === '#brand-demo' ? 'View System' : 'View Live'}
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="portfolio-btn secondary"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-stats">
          <div className="stat-item">
            <span className="stat-number">{portfolioItems.length}</span>
            <span className="stat-label">Total Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{portfolioItems.filter(item => item.status === 'live').length}</span>
            <span className="stat-label">Live Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{portfolioItems.filter(item => item.status === 'completed').length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{portfolioItems.filter(item => item.status === 'in-progress').length}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
      </div>

      {/* Demo Overlays */}
      <ParticleSystem isVisible={showParticleSystem} onClose={() => setShowParticleSystem(false)} />
      <GeometricArtGenerator isVisible={showGeometricArt} onClose={() => setShowGeometricArt(false)} />
      <MotionGraphicsReel isVisible={showMotionGraphics} onClose={() => setShowMotionGraphics(false)} />
      <BrandIdentitySystem isVisible={showBrandIdentity} onClose={() => setShowBrandIdentity(false)} />
    </section>
  );
};

export default Portfolio;
