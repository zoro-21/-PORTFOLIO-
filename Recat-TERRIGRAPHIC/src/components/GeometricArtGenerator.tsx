import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import '../styles/GeometricArtGenerator.css';

interface GeometricArtGeneratorProps {
  isVisible: boolean;
  onClose: () => void;
}

const GeometricArtGenerator: React.FC<GeometricArtGeneratorProps> = ({ isVisible, onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const geometryGroupRef = useRef<THREE.Group | null>(null);
  
  const [settings, setSettings] = useState({
    shapeCount: 50,
    rotationSpeed: 0.01,
    colorHue: 180,
    complexity: 3,
    size: 1,
    pattern: 'spiral'
  });

  useEffect(() => {
    if (!isVisible || !mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    currentMount.appendChild(renderer.domElement);

    // Create geometry group
    const geometryGroup = new THREE.Group();
    scene.add(geometryGroup);
    geometryGroupRef.current = geometryGroup;

    // Generate geometric art
    const generateArt = () => {
      // Clear existing geometry
      while (geometryGroup.children.length > 0) {
        const child = geometryGroup.children[0];
        geometryGroup.remove(child);
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      }

      // Create new geometric shapes
      for (let i = 0; i < settings.shapeCount; i++) {
        let geometry: THREE.BufferGeometry;
        
        // Different geometric shapes based on complexity
        switch (settings.complexity) {
          case 1:
            geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            break;
          case 2:
            geometry = new THREE.ConeGeometry(0.3, 0.8, 6);
            break;
          case 3:
            geometry = new THREE.OctahedronGeometry(0.4);
            break;
          case 4:
            geometry = new THREE.IcosahedronGeometry(0.4, 1);
            break;
          default:
            geometry = new THREE.TetrahedronGeometry(0.5);
        }

        // Dynamic color based on position and settings
        const hue = (settings.colorHue + (i * 10)) % 360;
        const color = new THREE.Color().setHSL(hue / 360, 0.8, 0.6);

        const material = new THREE.MeshBasicMaterial({
          color: color,
          wireframe: true,
          transparent: true,
          opacity: 0.7
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Position based on pattern
        let x, y, z;
        const angle = (i / settings.shapeCount) * Math.PI * 2;
        const radius = 3 + (i * 0.1);

        switch (settings.pattern) {
          case 'spiral':
            x = Math.cos(angle * 3) * radius * 0.3;
            y = Math.sin(angle * 3) * radius * 0.3;
            z = (i - settings.shapeCount / 2) * 0.2;
            break;
          case 'helix':
            x = Math.cos(angle) * 2;
            y = (i - settings.shapeCount / 2) * 0.3;
            z = Math.sin(angle) * 2;
            break;
          case 'sphere':
            const phi = Math.acos(-1 + (2 * i) / settings.shapeCount);
            const theta = Math.sqrt(settings.shapeCount * Math.PI) * phi;
            x = Math.cos(theta) * Math.sin(phi) * 3;
            y = Math.sin(theta) * Math.sin(phi) * 3;
            z = Math.cos(phi) * 3;
            break;
          default:
            x = (Math.random() - 0.5) * 8;
            y = (Math.random() - 0.5) * 8;
            z = (Math.random() - 0.5) * 8;
        }

        mesh.position.set(x, y, z);
        mesh.scale.setScalar(settings.size);
        
        // Random rotation
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        geometryGroup.add(mesh);
      }
    };

    generateArt();

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !geometryGroupRef.current) return;

      // Rotate the entire group
      geometryGroupRef.current.rotation.x += settings.rotationSpeed;
      geometryGroupRef.current.rotation.y += settings.rotationSpeed * 0.7;

      // Individual shape rotations
      geometryGroupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.x += settings.rotationSpeed * (1 + index * 0.01);
          child.rotation.y += settings.rotationSpeed * (1 + index * 0.01);
        }
      });

      rendererRef.current.render(sceneRef.current, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!rendererRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Regenerate art when settings change
    // const regenerateArt = () => generateArt();
    
    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (currentMount && rendererRef.current) {
        currentMount.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (geometryGroupRef.current) {
        geometryGroupRef.current.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, [isVisible, settings]);

  const handleSettingChange = (key: string, value: number | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const exportArt = () => {
    if (!rendererRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'geometric-art.png';
    link.href = rendererRef.current.domElement.toDataURL();
    link.click();
  };

  if (!isVisible) return null;

  return (
    <div className="geometric-art-overlay">
      <div className="geometric-art-container" ref={mountRef}>
        <div className="geometric-controls">
          <div className="control-panel">
            <h2>Geometric Art Generator</h2>
            <p>Create unique procedural geometric art</p>
            
            <div className="control-group">
              <label>Shape Count: {settings.shapeCount}</label>
              <input
                type="range"
                min="10"
                max="100"
                value={settings.shapeCount}
                onChange={(e) => handleSettingChange('shapeCount', parseInt(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>Rotation Speed: {settings.rotationSpeed.toFixed(3)}</label>
              <input
                type="range"
                min="0"
                max="0.05"
                step="0.001"
                value={settings.rotationSpeed}
                onChange={(e) => handleSettingChange('rotationSpeed', parseFloat(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>Color Hue: {settings.colorHue}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={settings.colorHue}
                onChange={(e) => handleSettingChange('colorHue', parseInt(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>Complexity: {settings.complexity}</label>
              <input
                type="range"
                min="1"
                max="4"
                value={settings.complexity}
                onChange={(e) => handleSettingChange('complexity', parseInt(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>Size: {settings.size.toFixed(1)}</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.size}
                onChange={(e) => handleSettingChange('size', parseFloat(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>Pattern:</label>
              <select
                value={settings.pattern}
                onChange={(e) => handleSettingChange('pattern', e.target.value)}
              >
                <option value="spiral">Spiral</option>
                <option value="helix">Helix</option>
                <option value="sphere">Sphere</option>
                <option value="random">Random</option>
              </select>
            </div>

            <div className="control-actions">
              <button className="export-btn" onClick={exportArt}>
                📸 Export PNG
              </button>
              <button className="close-btn" onClick={onClose}>
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeometricArtGenerator;
