import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import '../styles/ParticleSystem.css';

interface ParticleSystemProps {
  isVisible: boolean;
  onClose: () => void;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ isVisible, onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isVisible || !mountRef.current) return;

    // Store mount reference to avoid stale closure warning
    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    currentMount.appendChild(renderer.domElement);

    // Particle system setup
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      // Store original positions
      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Gradient colors (cyan to blue)
      const t = Math.random();
      colors[i3] = t * 0.0 + (1 - t) * 1.0;     // R
      colors[i3 + 1] = t * 0.5 + (1 - t) * 1.0; // G
      colors[i3 + 2] = t * 1.0 + (1 - t) * 1.0; // B
    }

    // Geometry and material
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !particlesRef.current) return;

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;

      // Mouse influence
      const mouseInfluence = 10;
      const mouseX = mouseRef.current.x * 50;
      const mouseY = mouseRef.current.y * 50;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Get current position
        const x = positions[i3];
        const y = positions[i3 + 1];
        // const z = positions[i3 + 2]; // Not used in current calculations

        // Calculate distance to mouse
        const dx = x - mouseX;
        const dy = y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse repulsion effect
        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          positions[i3] += (dx / distance) * force * 0.5;
          positions[i3 + 1] += (dy / distance) * force * 0.5;
        }

        // Floating animation
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Boundary wrapping
        if (positions[i3] > 50) positions[i3] = -50;
        if (positions[i3] < -50) positions[i3] = 50;
        if (positions[i3 + 1] > 50) positions[i3 + 1] = -50;
        if (positions[i3 + 1] < -50) positions[i3 + 1] = 50;
        if (positions[i3 + 2] > 50) positions[i3 + 2] = -50;
        if (positions[i3 + 2] < -50) positions[i3 + 2] = 50;

        // Dynamic color based on movement
        const speed = Math.sqrt(velocities[i3] ** 2 + velocities[i3 + 1] ** 2 + velocities[i3 + 2] ** 2);
        const intensity = Math.min(speed * 50 + 0.3, 1);
        
        colors[i3] = intensity * 0.0 + (1 - intensity) * 1.0;     // R
        colors[i3 + 1] = intensity * 0.8 + (1 - intensity) * 1.0; // G
        colors[i3 + 2] = 1.0; // B
      }

      // Update attributes
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;

      // Rotate the entire particle system
      particlesRef.current.rotation.x += 0.001;
      particlesRef.current.rotation.y += 0.002;

      // Render
      rendererRef.current.render(sceneRef.current, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      if (!rendererRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Start animation
    setIsLoading(false);
    animate();

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Use stored references to avoid stale closure
      const currentRenderer = rendererRef.current;
      
      if (currentMount && currentRenderer) {
        currentMount.removeChild(currentRenderer.domElement);
      }
      
      if (currentRenderer) {
        currentRenderer.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="particle-system-overlay">
      <div className="particle-system-container" ref={mountRef}>
        {isLoading && (
          <div className="particle-loading">
            <div className="loading-spinner"></div>
            <p>Loading Interactive 3D Particle System...</p>
          </div>
        )}
        
        <div className="particle-controls">
          <div className="particle-info">
            <h2>Interactive 3D Particle System</h2>
            <p>Move your mouse to interact with 5,000 particles</p>
            <div className="particle-stats">
              <span>• Real-time physics simulation</span>
              <span>• Mouse interaction & repulsion</span>
              <span>• Dynamic color changes</span>
              <span>• WebGL rendering</span>
            </div>
          </div>
          
          <button className="close-particle-btn" onClick={onClose}>
            ✕ Close Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticleSystem;
