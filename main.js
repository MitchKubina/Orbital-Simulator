// Set up scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // black space

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the Sun
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // yellow
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create the Earth
const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff }); // blue
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Animation loop
let angle = 0;
function animate() {
  requestAnimationFrame(animate);

  // Earth orbit (circular for now)
  angle += 0.01;
  const radius = 8;
  earth.position.z = Math.cos(angle) * radius;
  earth.position.x = Math.sin(angle) * radius;

  renderer.render(scene, camera);
}

animate();

// Responsive canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
