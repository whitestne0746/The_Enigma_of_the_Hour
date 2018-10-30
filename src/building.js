import 'imports-loader?THREE=three!three/examples/js/QuickHull.js'
import 'imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js'
import * as THREE from 'three'

export default class Building extends THREE.Object3D {
  constructor() {
    super()
    this.pillarWidth = 10
    this.pillarHeight = 80
    this.wallDepth = 10
    this.pillarMaterial = new THREE.MeshPhongMaterial({ color: '#f5deb3' })
    this.wallMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })

    const pillar = this.createPillar()
    const wall = this.createUpWall()
    const backWall = this.createBackWall()
    backWall.position.z = -70
    const stairs = this.createStairs()[0]
    const edges = this.createStairs()[1]
    stairs.position.y = -10
    edges.position.y = -10
    this.position.y = 10
    this.add(pillar)
    this.add(wall)
    this.add(backWall)
    this.add(stairs)
    this.add(edges)
  }

  createPillar() {
    const pillars = new THREE.Group()
    const pillarGeo = new THREE.BoxGeometry(this.pillarWidth, this.pillarHeight, this.wallDepth)
    let x = 0
    for (let i = 0; i < 8; i++) {
      const pillar = new THREE.Mesh(pillarGeo, this.pillarMaterial)
      pillar.position.x = x
      pillar.position.y = this.pillarHeight / 2

      if (i !== 7) {
        const top = this.createPillarTop(55)
        top.position.x = x + 5
        top.position.y = 55
        pillars.add(top)
      }

      pillars.add(pillar)
      x += 50
    }
    return pillars
  }

  createPillarTop(y) {
    const top = new THREE.Group()
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(20, 30, 0),
      new THREE.Vector3(40, 0, 0)
    )
    const curvePoint = curve.getPoints(40)
    for (let i = 0; i < curvePoint.length; i++) {
      if (i > 0) {
        const vertices = [
          new THREE.Vector3(
            curvePoint[i].x,
            curvePoint[i].y,
            curvePoint[i].z - this.wallDepth / 2,
          ),
          new THREE.Vector3(
            curvePoint[i].x,
            curvePoint[i].y,
            curvePoint[i].z + this.wallDepth / 2,
          ),
          new THREE.Vector3(
            curvePoint[i - 1].x,
            curvePoint[i - 1].y,
            curvePoint[i - 1].z + this.wallDepth / 2,
          ),
          new THREE.Vector3(
            curvePoint[i - 1].x,
            curvePoint[i - 1].y,
            curvePoint[i - 1].z - this.wallDepth / 2,
          ),
          new THREE.Vector3(
            curvePoint[i].x,
            this.pillarHeight - y,
            curvePoint[i].z - this.wallDepth / 2,
          ),
          new THREE.Vector3(
            curvePoint[i].x,
            this.pillarHeight - y,
            curvePoint[i].z + this.wallDepth / 2,
          ),
          new THREE.Vector3(
            curvePoint[i - 1].x,
            this.pillarHeight - y,
            curvePoint[i - 1].z + this.wallDepth / 2,
          ),
          new THREE.Vector3(
            curvePoint[i - 1].x,
            this.pillarHeight - y,
            curvePoint[i - 1].z - this.wallDepth / 2,
          ),
        ]
        const geo = new THREE.ConvexGeometry(vertices)
        const mesh = new THREE.Mesh(geo, this.pillarMaterial)
        top.add(mesh)
      }
    }
    return top
  }

  createUpWall() {
    const upWall = new THREE.Group()
    const wall1 = new THREE.Mesh(
      new THREE.BoxGeometry(360, 30, this.wallDepth),
      this.wallMaterial
    )
    wall1.position.x = 175
    wall1.position.y = 95

    const wall2 = new THREE.Mesh(
      new THREE.BoxGeometry(50, 20, this.wallDepth),
      this.wallMaterial
    )
    wall2.position.x = 175
    wall2.position.y = 120

    const wall3 = new THREE.Mesh(
      new THREE.BoxGeometry(360, 10, this.wallDepth),
      this.wallMaterial
    )
    wall3.position.x = 175
    wall3.position.y = 135

    const upPillar = new THREE.Group()
    let x = 0
    for (let i = 0; i < 7; i++) {
      if (i !== 3) {
        const pillar = new THREE.Mesh(
          new THREE.BoxGeometry(5, 20, this.wallDepth),
          this.wallMaterial
        )
        pillar.position.x = x
        upPillar.add(pillar)
      }
      x += 50
    }
    upPillar.position.x = 25
    upPillar.position.y = 120

    upWall.add(wall1)
    upWall.add(wall2)
    upWall.add(wall3)
    upWall.add(upPillar)
    return upWall
  }

  createBackWall() {
    const backWall = new THREE.Group()
    const wall1 = new THREE.Mesh(
      new THREE.BoxGeometry(360, 80, this.wallDepth),
      this.wallMaterial
    )
    wall1.position.x = 175
    wall1.position.y = 30

    const wall2 = new THREE.Group()
    const _wall1 = new THREE.Mesh(
      new THREE.BoxGeometry(90, 20, this.wallDepth),
      this.wallMaterial
    )
    _wall1.position.x = 40
    const _wall2 = new THREE.Mesh(
      new THREE.BoxGeometry(140, 20, this.wallDepth),
      this.wallMaterial
    )
    _wall2.position.x = 175
    const _wall3 = new THREE.Mesh(
      new THREE.BoxGeometry(90, 20, this.wallDepth),
      this.wallMaterial
    )
    _wall3.position.x = 310

    wall2.add(_wall1)
    wall2.add(_wall2)
    wall2.add(_wall3)
    wall2.position.y = 80

    const wall3 = new THREE.Mesh(
      new THREE.BoxGeometry(360, 20, this.wallDepth),
      this.wallMaterial
    )
    wall3.position.x = 175
    wall3.position.y = 100

    const wall4 = new THREE.Mesh(
      new THREE.BoxGeometry(360, 10, this.wallDepth),
      this.wallMaterial
    )
    wall4.position.x = 175
    wall4.position.y = 135

    const upPillar = new THREE.Group()
    let x = 0
    for (let i = 0; i < 7; i++) {
      if (i !== 3) {
        const pillar = new THREE.Mesh(
          new THREE.BoxGeometry(5, 20, this.wallDepth),
          this.wallMaterial
        )
        pillar.position.x = x
        upPillar.add(pillar)
      }
      x += 50
    }
    upPillar.position.x = 25
    upPillar.position.y = 120

    backWall.add(wall1)
    backWall.add(wall2)
    backWall.add(wall3)
    backWall.add(wall4)
    backWall.add(upPillar)
    return backWall
  }

  createStairs() {
    const obj = []
    const stairs = new THREE.Group()
    const edges = new THREE.Group()
    let height = 0
    let stair
    let line
    for (let i = 0; i < 7; i++) {
      height = height + 10 / 7
      if (i !== 6) {
        stair = new THREE.Mesh(
          new THREE.BoxGeometry(360, height, 20 / 7),
          new THREE.MeshPhongMaterial({ color: '#deb887' })
        )
        stair.position.z = 23.5 - 20 / 7 * (i + 1)
        line = new THREE.Line(
          new THREE.BoxGeometry(360, height, 20 / 7),
          new THREE.LineBasicMaterial({ color: '#696969' })
        )
        line.position.z = 23.5 - 20 / 7 * (i + 1)
      } else {
        stair = new THREE.Mesh(
          new THREE.BoxGeometry(360, height, 70),
          new THREE.MeshPhongMaterial({ color: '#deb887' })
        )
        stair.position.z = -30
      }
      stair.position.x = 175
      stair.position.y = height / 2
      line.position.x = 175
      line.position.y = height / 2
      stairs.add(stair)
      edges.add(line)
    }
    obj.push(stairs)
    obj.push(edges)
    return obj
  }
}
