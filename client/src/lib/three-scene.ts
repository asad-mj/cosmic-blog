import * as THREE from 'three';

// Base class for three.js scene creations
export class ThreeScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  animationId: number | null = null;
  
  constructor(container: HTMLElement, transparent: boolean = true) {
    // Create scene
    this.scene = new THREE.Scene();
    
    // Setup camera
    this.camera = new THREE.PerspectiveCamera(
      75, 
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    
    // Setup renderer
    this.renderer = new THREE.WebGLRenderer({ 
      alpha: transparent,
      antialias: true 
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);
    
    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize(container));
  }
  
  onWindowResize(container: HTMLElement) {
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  animate() {
    // This should be overridden by child classes
  }
  
  start() {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.animate();
      this.renderer.render(this.scene, this.camera);
    };
    
    animate();
  }
  
  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  dispose() {
    this.stop();
    this.renderer.dispose();
    
    // Clean up scene objects
    this.scene.traverse(object => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) object.geometry.dispose();
        
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
    });
  }
}

// Planet scene with planet and atmosphere
export class PlanetScene extends ThreeScene {
  planet: THREE.Mesh;
  atmosphere: THREE.Mesh;
  
  constructor(container: HTMLElement) {
    super(container);
    
    // Create planet
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x452b6a,
      wireframe: true 
    });
    this.planet = new THREE.Mesh(geometry, material);
    this.scene.add(this.planet);
    
    // Add atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(2.1, 32, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    this.atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    this.scene.add(this.atmosphere);
  }
  
  animate() {
    this.planet.rotation.y += 0.005;
    this.atmosphere.rotation.y += 0.003;
  }
}

// Spaceship scene with a simple spaceship model
export class SpaceshipScene extends ThreeScene {
  spaceship: THREE.Group;
  
  constructor(container: HTMLElement) {
    super(container);
    
    // Create a simple spaceship using basic shapes
    this.spaceship = new THREE.Group();
    
    // Spaceship body
    const bodyGeometry = new THREE.ConeGeometry(1, 2.5, 4);
    bodyGeometry.rotateX(Math.PI / 2);
    const bodyMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x333350,
      wireframe: true 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.spaceship.add(body);
    
    // Spaceship wings
    const wingGeometry = new THREE.BoxGeometry(3, 0.1, 1);
    const wingMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00f0ff,
      wireframe: true
    });
    const wings = new THREE.Mesh(wingGeometry, wingMaterial);
    wings.position.y = -0.2;
    this.spaceship.add(wings);
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff00e6 
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = -1.5;
    this.spaceship.add(glow);
    
    this.scene.add(this.spaceship);
    this.spaceship.rotation.y = Math.PI;
  }
  
  animate() {
    this.spaceship.rotation.y += 0.01;
    this.spaceship.position.y = Math.sin(Date.now() * 0.001) * 0.2;
  }
}

// Rover scene with a simple rover model
export class RoverScene extends ThreeScene {
  rover: THREE.Group;
  
  constructor(container: HTMLElement) {
    super(container);
    
    // Create a simple rover using basic shapes
    this.rover = new THREE.Group();
    
    // Rover body
    const bodyGeometry = new THREE.BoxGeometry(2, 0.5, 1.5);
    const bodyMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x333350,
      wireframe: true 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    this.rover.add(body);
    
    // Rover wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
    wheelGeometry.rotateZ(Math.PI / 2);
    const wheelMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x222233,
      wireframe: true 
    });
    
    // Add six wheels, three on each side
    const wheelPositions = [
      [-0.8, 0, 0.6], [-0.8, 0, -0.6],
      [0, 0, 0.6], [0, 0, -0.6],
      [0.8, 0, 0.6], [0.8, 0, -0.6]
    ];
    
    wheelPositions.forEach(position => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.position.set(position[0], position[1], position[2]);
      this.rover.add(wheel);
    });
    
    // Rover antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 8);
    const antennaMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00f0ff 
    });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(0.7, 1.3, 0);
    this.rover.add(antenna);
    
    // Rover camera/sensor
    const cameraGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const cameraMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff00e6,
      wireframe: true 
    });
    const roverCamera = new THREE.Mesh(cameraGeometry, cameraMaterial);
    roverCamera.position.set(0.7, 1, 0);
    this.rover.add(roverCamera);
    
    this.rover.rotation.y = Math.PI / 4;
    this.scene.add(this.rover);
  }
  
  animate() {
    this.rover.rotation.y += 0.005;
  }
}
