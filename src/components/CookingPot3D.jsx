import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './CookingPot3D.css';

export default function CookingPot3D() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    
    // Transparent scene so it blends with the dark background
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Create the 3D Cooking Pot Group
    const potGroup = new THREE.Group();
    scene.add(potGroup);

    // Dark Premium Metallic Material
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x111113,
      metalness: 0.9,
      roughness: 0.15,
    });

    // Radiant Gold Trim Material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffb800,
      metalness: 0.95,
      roughness: 0.1,
    });

    // Pot Body: A truncated cylinder
    const bodyGeom = new THREE.CylinderGeometry(1.6, 1.2, 1.4, 32, 1);
    const bodyMesh = new THREE.Mesh(bodyGeom, metalMaterial);
    bodyMesh.position.y = -0.2;
    potGroup.add(bodyMesh);

    // Pot Rim: Torus at the top
    const rimGeom = new THREE.TorusGeometry(1.6, 0.1, 16, 100);
    const rimMesh = new THREE.Mesh(rimGeom, goldMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.5;
    potGroup.add(rimMesh);

    // Pot Bottom stand: Small thin cylinder at bottom
    const standGeom = new THREE.CylinderGeometry(1.25, 1.25, 0.1, 32);
    const standMesh = new THREE.Mesh(standGeom, goldMaterial);
    standMesh.position.y = -0.9;
    potGroup.add(standMesh);

    // Handles: Left and Right Torus
    const handleGeom = new THREE.TorusGeometry(0.35, 0.08, 16, 32, Math.PI);
    
    const leftHandle = new THREE.Mesh(handleGeom, goldMaterial);
    leftHandle.position.set(-1.7, 0.1, 0);
    leftHandle.rotation.z = Math.PI / 2;
    potGroup.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeom, goldMaterial);
    rightHandle.position.set(1.7, 0.1, 0);
    rightHandle.rotation.z = -Math.PI / 2;
    potGroup.add(rightHandle);

    // 3. Create Steam/Fire Particle System
    const particleCount = 65;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const lifetimes = [];

    for (let i = 0; i < particleCount; i++) {
      // Spawn inside the bowl
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.3;
      
      const px = Math.cos(angle) * radius;
      const py = 0.6 + Math.random() * 0.2; // just above rim
      const pz = Math.sin(angle) * radius;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      // Slow drift velocity
      velocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: Math.random() * 0.02 + 0.015,
        z: (Math.random() - 0.5) * 0.015,
      });

      lifetimes.push({
        age: 0,
        maxAge: Math.random() * 80 + 40,
      });
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle styling (Gold-Red sparks glowing)
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffb800,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMaterial);
    potGroup.add(particles);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    // Dynamic fire glow inside the pot
    const firePointLight = new THREE.PointLight(0xff3300, 4, 8);
    firePointLight.position.set(0, 0.8, 0);
    scene.add(firePointLight);

    const goldPointLight = new THREE.PointLight(0xffb800, 2, 5);
    goldPointLight.position.set(0, -1.2, 0);
    scene.add(goldPointLight);

    // 5. Scroll and Mouse Parallax Listener
    const handleMouseMove = (e) => {
      // Normalize mouse between -0.5 and 0.5
      targetMouseRef.current.x = (e.clientX / window.innerWidth) - 0.5;
      targetMouseRef.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Slow floating float animation
      potGroup.position.y = Math.sin(elapsed * 1.5) * 0.25;
      potGroup.rotation.y = elapsed * 0.3;
      potGroup.rotation.x = Math.sin(elapsed * 0.8) * 0.15;

      // Mouse Parallax Lerping
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      
      const tmx = targetMouseRef.current.x;
      const tmy = targetMouseRef.current.y;

      mouseRef.current.x += (tmx - mx) * 0.08;
      mouseRef.current.y += (tmy - my) * 0.08;

      camera.position.x = mouseRef.current.x * 2.5;
      camera.position.y = -mouseRef.current.y * 2.5;
      camera.lookAt(0, 0, 0);

      // Animate steam/fire particles
      const positionsArr = particles.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        positionsArr[i * 3] += velocities[i].x + (tmx * 0.02); // React slightly to mouse coordinates!
        positionsArr[i * 3 + 1] += velocities[i].y;
        positionsArr[i * 3 + 2] += velocities[i].z + (tmy * 0.02);

        lifetimes[i].age++;

        // Reset particle if it dies or climbs too high
        if (lifetimes[i].age >= lifetimes[i].maxAge || positionsArr[i * 3 + 1] > 3.0) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 1.2;
          positionsArr[i * 3] = Math.cos(angle) * radius;
          positionsArr[i * 3 + 1] = 0.6; // Base height
          positionsArr[i * 3 + 2] = Math.sin(angle) * radius;
          
          lifetimes[i].age = 0;
          lifetimes[i].maxAge = Math.random() * 80 + 40;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;

      // Pulse fire light slightly
      firePointLight.intensity = 4.0 + Math.sin(elapsed * 15) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 8. Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement) {
        renderer.domElement.remove();
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="cooking-pot-container">
      <div className="cooking-pot-canvas" ref={containerRef} />
      <div className="cooking-pot-ambient-glow" />
    </div>
  );
}
