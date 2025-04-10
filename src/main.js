import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import SceneManager from './SceneManager.js';
import ControllerManager from './ControllerManager.js';
import GhostCatController from './GhostCatController.js';

// Initialize scene manager (which sets up the renderer, camera, and scene)
const sceneManager = new SceneManager();

// Initialize controller manager to handle input/controllers in AR
const controllerManager = new ControllerManager(sceneManager);

// Initialize ghost cat controller (replaces the old cube controller)
const ghostCatController = new GhostCatController(sceneManager);

// Append AR button to start AR session
document.body.appendChild( ARButton.createButton( sceneManager.renderer, { requiredFeatures: [ 'hit-test' ] } ) );

// When an XR session starts, place the ghost cat into the scene
sceneManager.renderer.xr.addEventListener('sessionstart', () => {
  console.log("XR Session started");
  ghostCatController.placeGhostCat();
});

// Start the rendering loop
function animate() {
  sceneManager.renderer.setAnimationLoop(() => {
    sceneManager.renderer.render(sceneManager.scene, sceneManager.camera);
  });
}
animate();