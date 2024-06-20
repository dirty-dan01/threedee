import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { add } from 'three/examples/jsm/nodes/Nodes.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointOfLight = new THREE.PointLight(0xffffff, 100);
pointOfLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff, .05);
scene.add(pointOfLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointOfLight);
scene.add(lightHelper)

const gridHelper = new THREE.GridHelper(200,50);
scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStars(){
   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
   const material = new THREE.MeshStandardMaterial({color: 0xffffff});
   const star = new THREE.Mesh(geometry, material);

   const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))

   star.position.set(x, y, z);
   scene.add(star); 
}

Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load('');
scene.background = spaceTexture;

const spaceCube = new THREE.TextureLoader().load('space.jpg');
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: spaceCube})
);

scene.add(cube)


const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture})
);
scene.add(moon)

moon.position.z = 30;
moon.position.setX(-10);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  cube.rotation.x += 0.01;
  cube.rotation.z += 0.01;

  camera.position.z = t * -0.1;
  camera.position.y = t * -0.02;
  camera.rotation.x = t * -0.02;
}

document.body.onscroll = moveCamera;


function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01; 
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;   

  controls.update();
  renderer.render(scene , camera);
}

animate();