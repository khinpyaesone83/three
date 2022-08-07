import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

// init
let camera, scene, renderer;
let mesh, geometry, material;

const loader = new GLTFLoader();
init();
export function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 5;
  camera.rotation.z = 1;

  scene = new THREE.Scene();
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  loader.load("/models/drone/scene.gltf", (gltf) => {
    let model = gltf.scene;
    model.scale.set(0.45, 0.45, 0.45);
    gsap.to(camera.position, {
      z: 1,
      duration: 1,
      ease: "back.out(1.7)",
    });
    gsap.to(camera.rotation, {
      z: 0,
      duration: 1,
    });
    gsap.to(model.rotation, {
      x: 1,
      duration: 2,
      delay: 1,
    });
    gsap.to(model.rotation, {
      y: Math.PI * 1.75,
      duration: 2,
      delay: 1,
    });
    gsap.to(model.scale, {
      duration: 1,
      delay: 1,
      x: 0.25,
      y: 0.25,
      z: 0.25,
    });
    gsap.to(model.position, {
      duration: 1,
      delay: 1,
      x: 0.8,
      y: 0.3,
    });

    scene.add(model);
  });

  //   geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  //   material = new THREE.MeshNormalMaterial();

  //   mesh = new THREE.Mesh(geometry, material);
  //   scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  renderer.setClearColor(0x2727272, 1);
  document.body.appendChild(renderer.domElement);
}

// animation

function animation(time) {
  //   mesh.rotation.x = time / 2000;
  //   mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
