import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OBJLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const width = 400, height = 400;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
camera.position.set(0, 0, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.getElementById('Windmill').appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 0.4); 
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(5, 10, 7.5);
scene.add(directional);

scene.background = new THREE.Color(0x87ceeb);

let propler;

const loader = new OBJLoader();
loader.load(
  'models/Body.obj',
  function (object) {
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial(); 
      }
    });

    object.scale.set(2.5, 2.5, 2.5);  
    object.position.set(0, -5, 0);

    scene.add(object);
    console.log("OBJ loaded", object);
  },
  undefined,
  function (error) {
    console.error('An error happened', error);
  }
);

loader.load(
  'models/Propeller.obj',
  function (object) {
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial(); 
      }
    });

    object.scale.set(2.5, 2.5, 2.5);  
    object.position.set(0, 1.3, 0);

    propler = object;

    scene.add(object);
    console.log("OBJ loaded", object);
  },
  undefined,
  function (error) {
    console.error('An error happened', error);
  }
);

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 1, 8 );
controls.update();

function animate(time) {
  requestAnimationFrame(animate);

  if (propler) {
    propler.rotation.z = time / 500;
  }

  // required if controls.enableDamping or controls.autoRotate are set to true
	//controls.update();

  renderer.render(scene, camera);
}
animate();
