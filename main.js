import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//constants
const SCALE = 1e-9; // 1 meter in real world = 1e-9 units in your scene
const earth_mass = 5.972e24; //10^7
const earth_radius =  6.37e8 * SCALE * 3;
const sun_radius = 6.96e8 * SCALE * 3; // 3x exaggeration for visibility
const G = 6.67430e-11;
const sun_mass = 1.989e30; // Gravitational Constant
const dt = 1/60;

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // black space

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 0, 400); // 400 scene units = 4e11 m real-world distance
//camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the Sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(sun_radius, 64, 64),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(sun);

// Add a light source at the Sun's position
const light = new THREE.PointLight(0xffffff, 1.5, 0);
light.position.copy(sun.position);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // dim ambient light
scene.add(ambientLight);

// Create the Earth
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(earth_radius, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x00aaff })
);
scene.add(earth);

let position = new THREE.Vector3(1.5e11, 0, 0);
let r = position.length();
// Semi-major axis for elliptical orbit
let a = 2.5e11; // for example

// Vis-viva to get speed
let speed = Math.sqrt(G * sun_mass * (2 / r - 1 / a));

// Velocity direction: perpendicular to position (in XY plane)
let velocity = new THREE.Vector3(0, 0, 0);
velocity.x = -position.y;
velocity.y = position.x;
velocity.z = 0;
velocity.normalize().multiplyScalar(speed);

//const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  //console.log(angle);

  // Calculating acceleration for each dimension
  //let unit_vector = position.clone().normalize().multiplyScalar(-1);
  let r = position.length();
  //print(unit_vector);
  let acceleration = position.clone().normalize().multiplyScalar(-G * sun_mass / (r * r));
  acceleration.negate();

  // Earth orbit (circular for now)
  velocity.add(acceleration.clone().multiplyScalar(dt));

  // Update position
  position.add(velocity.clone().multiplyScalar(dt));

  let renderPosition = position.clone().multiplyScalar(SCALE);

  earth.position.copy(renderPosition);

  console.log(earth.position);
  renderer.render(scene, camera);

  camera.lookAt(earth.position);
  //controls.update();
}

animate();

// Responsive canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
