import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class GhostCatController {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.loader = new GLTFLoader();
    this.ghostCat = null;
  }

  placeGhostCat() {
    // Only place the ghost cat once
    if (this.ghostCat) return;

    // Load the ghost cat model from the assets folder
    this.loader.load('assets/ghost_cat.glb', (gltf) => {
      this.ghostCat = gltf.scene;
      // Adjust scale and default placement as needed
      this.ghostCat.scale.set(0.5, 0.5, 0.5);
      this.ghostCat.position.set(0, 0, -1); // Place 1 meter in front of the camera initially
      this.sceneManager.scene.add(this.ghostCat);

      // Add spatialized purring audio to the ghost cat
      this.addPurringAudio(this.ghostCat);
    }, undefined, (error) => {
      console.error('An error occurred while loading the ghost cat model:', error);
    });
  }

  addPurringAudio(object3D) {
    // Create a new audio listener and attach it to the camera (if not already added)
    let listener = null;
    if (!this.sceneManager.camera.children.find(child => child.type === 'AudioListener')) {
      listener = new THREE.AudioListener();
      this.sceneManager.camera.add(listener);
    } else {
      listener = this.sceneManager.camera.children.find(child => child.type === 'AudioListener');
    }

    // Create positional audio and load the purring sound effect
    const sound = new THREE.PositionalAudio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('assets/cat_purring.mp3', (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setRefDistance(1);
      sound.play();
    }, undefined, (error) => {
      console.error('An error occurred while loading the purring sound:', error);
    });

    // Attach the sound to the ghost cat model so the purring audio follows it spatially
    object3D.add(sound);
  }
}