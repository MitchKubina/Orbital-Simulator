import * as THREE from 'three';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // black space

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 600;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const earth_radius = 200;

// Create the Sun
const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // yellow
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create the Earth
const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff }); // blue
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

/*
//Venus
const venusGeometry = new THREE.SphereGeometry(2, 32, 32);
const venusMaterial = new THREE.MeshBasicMaterial({ color: 0xf8e2b0 }); 
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venus);

//Mercury
const mercuryGeometry = new THREE.SphereGeometry(0.66, 32, 32);
const mercuryMaterial = new THREE.MeshBasicMaterial({ color: 0xada8a5 });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);

//Mars
const marsGeometry = new THREE.SphereGeometry(1, 32, 32);
const marsMaterial = new THREE.MeshBasicMaterial({ color: 0xc1440e }); 
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);
*/

//Creating the line
/*
const points = [];
for(let i = 0; i < 628;i++){
  let rad = i/100
  points.push(new THREE.Vector3(Math.cos(rad) * earth_radius, Math.sin(rad) * earth_radius, 0))
}
*/

/*
const line_material = new THREE.LineBasicMaterial( { color: 0x00aaff } );
const line_geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( line_geometry,line_material);
scene.add(line)
*/

const earth_mass = 5.972e24; //10^7
const G = 6.67430e-11;
const sun_mass = 1.989e30; // Gravitational Constant
const dt = 1/60;

let position = new THREE.Vector3(1.5e11, 0, 0);
let r = position.length();
//console.log(sun.position.x);
//console.log(sun.position.y);



// Animation loop
function animate() {
  requestAnimationFrame(animate);
  //console.log(angle);

  // Calculating acceleration for each dimension
  //let unit_vector = position.clone().normalize().multiplyScalar(-1);
  let r = position.length();
  print(unit_vector);
  let acceleration = position.clone().normalize().multiplyScalar(-G * sun_mass / (r * r));
  acceleration.negate();

  // Earth orbit (circular for now)
  angle += 0.01;
  position[0] = Math.cos(angle) * earth_radius;
  position[1] = Math.sin(angle) * earth_radius;

  earth.position.x = position[0];
  earth.position.y = position[1];


  /*
  venus.position.x = Math.cos(angle * 1.25) * venus_radius;
  venus.position.y = Math.sin(angle * 1.25) * venus_radius;

  mercury.position.x = Math.cos(angle * 2) * mercury_radius;
  mercury.position.y = Math.sin(angle * 2) * mercury_radius;

  mars.position.x = Math.cos(angle * 0.5) * mars_radius;
  mars.position.y = Math.sin(angle * 0.5) * mars_radius;

  */
  renderer.render(scene, camera);
}

animate();

// Responsive canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
