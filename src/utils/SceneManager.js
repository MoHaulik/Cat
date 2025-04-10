import * as THREE from 'three';

export default class SceneManager {
  constructor() {
    // Create a new scene
    this.scene = new THREE.Scene();

    // Setup camera with a typical AR field of view and start position
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    this.camera.position.set(0, 1.6, 0); // typical height for AR

    // Set up renderer with transparency (for passthrough AR) and enable XR
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.xr.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    // Handle window resizing
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}