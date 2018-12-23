import "imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js";
import * as THREE from "three";
import Building from "./building";

window.addEventListener("DOMContentLoaded", init);

const windowWidth = 760;
const windowHeight = 599;

function init() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(windowWidth, windowHeight);
  renderer.setClearColor(0x40e0d0, 1.0);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    45,
    windowWidth / windowHeight,
    0.1,
    2000000
  );
  camera.position.set(0, 50, 150);

  const controls = new THREE.OrbitControls(camera);

  const scene = new THREE.Scene();

  const light = new THREE.DirectionalLight("#ffffff");
  light.castShadow = true;
  light.shadow.mapSize.width = 16384;
  light.shadow.mapSize.height = 16384;
  light.intensity = 2;
  light.position.set(-100, 100, -100);
  light.shadow.camera.left = -1000;
  light.shadow.camera.right = 1000;
  light.shadow.camera.top = -1000;
  light.shadow.camera.bottom = 1000;
  light.shadow.camera.far = 4000;
  scene.add(light);

  // const amb = new THREE.AmbientLight('#ffffff')
  // scene.add(amb)

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100000, 100000),
    new THREE.MeshPhongMaterial({ color: 0xe9967a })
  );
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  const building = new Building();
  building.castShadow = true;
  building.receiveShadow = true;
  building.position.x = -175;
  // building.position.y = 5;
  scene.add(building);

  animation();

  function animation() {
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
  }
}
