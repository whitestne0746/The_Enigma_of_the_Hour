import 'imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js'
import * as THREE from 'three'
import Building from './building'

window.addEventListener('DOMContentLoaded', init)

const windowWidth = 760
const windowHeight = 599

function init() {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(windowWidth, windowHeight)
  renderer.setClearColor(0x40e0d0, 1.0)
  document.body.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(
    45,
    windowWidth / windowHeight,
    0.1,
    2000000
  )
  camera.position.set(0, 50, 150)

  const controls = new THREE.OrbitControls(camera)

  const scene = new THREE.Scene()

  const light = new THREE.DirectionalLight('#ffffff')
  light.intensity = 2
  light.position.set(1, 1, 1)
  scene.add(light)

  /*
  const amb = new THREE.AmbientLight('#464646')
  scene.add(amb)
  */

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100000, 100000),
    new THREE.MeshPhongMaterial({ color: 0xe9967a })
  )
  plane.rotation.x = -Math.PI / 2
  scene.add(plane)

  const building = new Building()
  building.position.x = -175
  scene.add(building)

  animation()

  function animation() {
    requestAnimationFrame(animation)
    renderer.render(scene, camera)
  }
}
