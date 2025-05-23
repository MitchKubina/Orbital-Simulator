// Set up scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // black space

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 600;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const earth_radius = 200;
const venus_radius = 150;
const mars_radius = 500;
const mercury_radius = 115;

// Create the Sun
const sunGeometry = new THREE.SphereGeometry(109, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // yellow
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create the Earth
const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff }); // blue
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Venus
const venusGeometry = new THREE.SphereGeometry(2, 32, 32);
const venusMaterial = new THREE.MeshBasicMaterial({ color: 0xf8e2b0 }); 
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venus);

// Mercury
const mercuryGeometry = new THREE.SphereGeometry(0.66, 32, 32);
const mercuryMaterial = new THREE.MeshBasicMaterial({ color: 0xada8a5 });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);

//Mars
const marsGeometry = new THREE.SphereGeometry(1, 32, 32);
const marsMaterial = new THREE.MeshBasicMaterial({ color: 0xc1440e }); 
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

//Creating the line
const points = [];
for(let i = 0; i < 628;i++){
  rad = i/100
  points.push(new THREE.Vector3(Math.cos(rad) * earth_radius, Math.sin(rad) * earth_radius, 0))
}
const line_material = new THREE.LineBasicMaterial( { color: 0x00aaff } );
const line_geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( line_geometry,line_material);
scene.add(line)

// Animation loop
let angle = 0;
function animate() {
  requestAnimationFrame(animate);

  // Earth orbit (circular for now)
  angle += 0.01;
  earth.position.x = Math.cos(angle) * earth_radius;
  earth.position.y = Math.sin(angle) * earth_radius;

  venus.position.x = Math.cos(angle * 1.25) * venus_radius;
  venus.position.y = Math.sin(angle * 1.25) * venus_radius;

  mercury.position.x = Math.cos(angle * 2) * mercury_radius;
  mercury.position.y = Math.sin(angle * 2) * mercury_radius;

  mars.position.x = Math.cos(angle * 0.5) * mars_radius;
  mars.position.y = Math.sin(angle * 0.5) * mars_radius;

  renderer.render(scene, camera);
}

animate();

// Responsive canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
