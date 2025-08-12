import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import '../styles/MotionGraphicsReel.css';

interface MotionGraphicsReelProps {
  isVisible: boolean;
  onClose: () => void;
}

const MotionGraphicsReel: React.FC<MotionGraphicsReelProps> = ({ isVisible, onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const scenes = [
    { name: 'Morphing Shapes', description: 'Fluid geometric transformations' },
    { name: 'Particle Explosion', description: 'Dynamic particle systems' },
    { name: 'Wave Distortion', description: 'Sine wave animations' },
    { name: 'Color Transitions', description: 'Smooth color morphing' },
    { name: 'Logo Animation', description: 'Brand identity motion' }
  ];

  useEffect(() => {
    if (!isVisible || !mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    let animationObjects: THREE.Object3D[] = [];
    let time = 0;

    const createScene = (sceneIndex: number) => {
      // Clear existing objects
      animationObjects.forEach(obj => {
        scene.remove(obj);
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(material => material.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      animationObjects = [];

      switch (sceneIndex) {
        case 0: // Morphing Shapes
          for (let i = 0; i < 5; i++) {
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const material = new THREE.MeshPhongMaterial({
              color: new THREE.Color().setHSL(i * 0.2, 0.8, 0.6),
              transparent: true,
              opacity: 0.8
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (i - 2) * 2;
            scene.add(mesh);
            animationObjects.push(mesh);
          }
          break;

        case 1: // Particle Explosion
          const particleGeometry = new THREE.BufferGeometry();
          const particleCount = 1000;
          const positions = new Float32Array(particleCount * 3);
          const colors = new Float32Array(particleCount * 3);

          for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.6);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
          }

          particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

          const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
          });

          const particles = new THREE.Points(particleGeometry, particleMaterial);
          scene.add(particles);
          animationObjects.push(particles);
          break;

        case 2: // Wave Distortion
          const waveGeometry = new THREE.PlaneGeometry(8, 8, 32, 32);
          const waveMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            wireframe: true,
            transparent: true,
            opacity: 0.7
          });
          const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
          waveMesh.rotation.x = -Math.PI / 4;
          scene.add(waveMesh);
          animationObjects.push(waveMesh);
          break;

        case 3: // Color Transitions
          const colorGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
          const colorMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.8
          });
          const colorMesh = new THREE.Mesh(colorGeometry, colorMaterial);
          scene.add(colorMesh);
          animationObjects.push(colorMesh);
          break;

        case 4: // Logo Animation
          const logoGroup = new THREE.Group();
          
          // Create "T" shape
          const tGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
          const tMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });
          const tMesh = new THREE.Mesh(tGeometry, tMaterial);
          
          const tTopGeometry = new THREE.BoxGeometry(1.5, 0.2, 0.2);
          const tTopMesh = new THREE.Mesh(tTopGeometry, tMaterial);
          tTopMesh.position.y = 0.9;
          
          logoGroup.add(tMesh);
          logoGroup.add(tTopMesh);
          logoGroup.position.x = -1.5;
          
          // Create circle
          const circleGeometry = new THREE.TorusGeometry(0.8, 0.1, 8, 32);
          const circleMesh = new THREE.Mesh(circleGeometry, tMaterial);
          circleMesh.position.x = 1.5;
          
          scene.add(logoGroup);
          scene.add(circleMesh);
          animationObjects.push(logoGroup, circleMesh);
          break;
      }
    };

    createScene(currentScene);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !isPlaying) return;

      time += 0.016; // ~60fps

      // Scene-specific animations
      switch (currentScene) {
        case 0: // Morphing Shapes
          animationObjects.forEach((obj, index) => {
            if (obj instanceof THREE.Mesh) {
              obj.rotation.y = time + index;
              obj.scale.setScalar(1 + Math.sin(time * 2 + index) * 0.3);
              
              // Morph between sphere and cube
              // const morphFactor = (Math.sin(time + index) + 1) / 2;
              if (obj.geometry instanceof THREE.SphereGeometry) {
                obj.material.color.setHSL((time * 0.1 + index * 0.2) % 1, 0.8, 0.6);
              }
            }
          });
          break;

        case 1: // Particle Explosion
          animationObjects.forEach(obj => {
            if (obj instanceof THREE.Points) {
              obj.rotation.y = time * 0.5;
              const positions = obj.geometry.attributes.position.array as Float32Array;
              
              for (let i = 0; i < positions.length; i += 3) {
                // const radius = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2);
                const explosionFactor = Math.sin(time * 2) * 0.5 + 0.5;
                
                positions[i] *= 1 + explosionFactor * 0.1;
                positions[i + 1] *= 1 + explosionFactor * 0.1;
                positions[i + 2] *= 1 + explosionFactor * 0.1;
              }
              
              obj.geometry.attributes.position.needsUpdate = true;
            }
          });
          break;

        case 2: // Wave Distortion
          animationObjects.forEach(obj => {
            if (obj instanceof THREE.Mesh && obj.geometry instanceof THREE.PlaneGeometry) {
              const positions = obj.geometry.attributes.position.array as Float32Array;
              
              for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i + 1];
                positions[i + 2] = Math.sin(x * 0.5 + time * 2) * Math.cos(y * 0.5 + time * 2) * 0.5;
              }
              
              obj.geometry.attributes.position.needsUpdate = true;
            }
          });
          break;

        case 3: // Color Transitions
          animationObjects.forEach(obj => {
            if (obj instanceof THREE.Mesh) {
              obj.rotation.x = time;
              obj.rotation.y = time * 0.7;
              
              const hue = (time * 0.1) % 1;
              obj.material.color.setHSL(hue, 0.8, 0.6);
            }
          });
          break;

        case 4: // Logo Animation
          animationObjects.forEach((obj, index) => {
            obj.rotation.y = Math.sin(time + index) * 0.3;
            obj.position.y = Math.sin(time * 2 + index) * 0.2;
            
            if (obj instanceof THREE.Mesh) {
              const pulse = Math.sin(time * 3) * 0.1 + 1;
              obj.scale.setScalar(pulse);
            }
          });
          break;
      }

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animate();
    }

    // Handle window resize
    const handleResize = () => {
      if (!rendererRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

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
      
      animationObjects.forEach(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(material => material.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, [isVisible, currentScene, isPlaying]);

  const nextScene = () => {
    setCurrentScene((prev) => (prev + 1) % scenes.length);
  };

  const prevScene = () => {
    setCurrentScene((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isVisible) return null;

  return (
    <div className="motion-graphics-overlay">
      <div className="motion-graphics-container" ref={mountRef}>
        <div className="motion-controls">
          <div className="reel-info">
            <h2>Motion Graphics Reel</h2>
            <div className="scene-info">
              <h3>{scenes[currentScene].name}</h3>
              <p>{scenes[currentScene].description}</p>
            </div>
            
            <div className="scene-counter">
              {currentScene + 1} / {scenes.length}
            </div>
          </div>

          <div className="playback-controls">
            <button className="control-btn" onClick={prevScene}>
              ⏮ Previous
            </button>
            <button className="control-btn play-btn" onClick={togglePlayback}>
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button className="control-btn" onClick={nextScene}>
              Next ⏭
            </button>
          </div>

          <div className="scene-indicators">
            {scenes.map((_, index) => (
              <button
                key={index}
                className={`scene-dot ${index === currentScene ? 'active' : ''}`}
                onClick={() => setCurrentScene(index)}
              />
            ))}
          </div>

          <button className="close-reel-btn" onClick={onClose}>
            ✕ Close Reel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotionGraphicsReel;
