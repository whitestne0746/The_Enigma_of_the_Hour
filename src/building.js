import "imports-loader?THREE=three!three/examples/js/QuickHull.js";
import "imports-loader?THREE=three!three/examples/js/geometries/ConvexGeometry.js";
import * as THREE from "three";

export default class Building extends THREE.Object3D {
  constructor() {
    super();
    this.pillarWidth = 10;
    this.pillarHeight = 80;
    this.wallDepth = 10;
    this.pillarMaterial = new THREE.MeshPhongMaterial({ color: "#f5deb3" });
    this.wallMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });

    const pillar = this.createPillar();
    const wall = this.createUpWall();
    const backWall = this.createBackWall();
    backWall.position.z = -70;
    const stairs = this.createStairs()[0];
    const edges = this.createStairs()[1];
    stairs.position.y = -10;
    edges.position.y = -10;
    const watch = this.createWatch();
    // watch.position.z = 60
    this.position.y = 10;
    this.add(pillar);
    this.add(wall);
    this.add(backWall);
    this.add(stairs);
    this.add(edges);
    this.add(watch);

    this.castShadow = true;
    this.receiveShadow = true;
  }

  createPillar() {
    const pillars = new THREE.Group();
    const pillarGeo = new THREE.BoxGeometry(
      this.pillarWidth,
      this.pillarHeight,
      this.wallDepth
    );
    let x = 0;
    for (let i = 0; i < 8; i++) {
      const pillar = new THREE.Mesh(pillarGeo, this.pillarMaterial);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      pillar.position.x = x;
      pillar.position.y = this.pillarHeight / 2;

      if (i !== 7) {
        const top = this.createPillarTop(55);
        top.position.x = x + 5;
        top.position.y = 55;
        pillars.add(top);
      }

      pillars.add(pillar);
      x += 50;
    }
    return pillars;
  }

  createPillarTop(y) {
    const top = new THREE.Group();
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(20, 30, 0),
      new THREE.Vector3(40, 0, 0)
    );
    const curvePoint = curve.getPoints(40);
    for (let i = 0; i < curvePoint.length; i++) {
      if (i > 0) {
        const vertices = [
          new THREE.Vector3(
            curvePoint[i].x,
            curvePoint[i].y,
            curvePoint[i].z - this.wallDepth / 2
          ),
          new THREE.Vector3(
            curvePoint[i].x,
            curvePoint[i].y,
            curvePoint[i].z + this.wallDepth / 2
          ),
          new THREE.Vector3(
            curvePoint[i - 1].x,
            curvePoint[i - 1].y,
            curvePoint[i - 1].z + this.wallDepth / 2
          ),
          new THREE.Vector3(
            curvePoint[i - 1].x,
            curvePoint[i - 1].y,
            curvePoint[i - 1].z - this.wallDepth / 2
          ),
          new THREE.Vector3(
            curvePoint[i].x,
            this.pillarHeight - y,
            curvePoint[i].z - this.wallDepth / 2
          ),
          new THREE.Vector3(
            curvePoint[i].x,
            this.pillarHeight - y,
            curvePoint[i].z + this.wallDepth / 2
          ),
          new THREE.Vector3(
            curvePoint[i - 1].x,
            this.pillarHeight - y,
            curvePoint[i - 1].z + this.wallDepth / 2
          ),
          new THREE.Vector3(
            curvePoint[i - 1].x,
            this.pillarHeight - y,
            curvePoint[i - 1].z - this.wallDepth / 2
          )
        ];
        const geo = new THREE.ConvexGeometry(vertices);
        const mesh = new THREE.Mesh(geo, this.pillarMaterial);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        top.add(mesh);
      }
    }
    return top;
  }

  createUpWall() {
    const upWall = new THREE.Group();
    const wall1 = new THREE.Mesh(
      new THREE.BoxGeometry(360, 30, this.wallDepth),
      this.wallMaterial
    );
    wall1.castShadow = true;
    wall1.receiveShadow = true;
    wall1.position.x = 175;
    wall1.position.y = 95;

    const wall2 = new THREE.Mesh(
      new THREE.BoxGeometry(50, 20, this.wallDepth),
      this.wallMaterial
    );
    wall2.castShadow = true;
    wall2.receiveShadow = true;
    wall2.position.x = 175;
    wall2.position.y = 120;

    const wall3 = new THREE.Mesh(
      new THREE.BoxGeometry(360, 10, this.wallDepth),
      this.wallMaterial
    );
    wall3.castShadow = true;
    wall3.receiveShadow = true;
    wall3.position.x = 175;
    wall3.position.y = 135;

    const upPillar = new THREE.Group();
    let x = 0;
    for (let i = 0; i < 7; i++) {
      if (i !== 3) {
        const pillar = new THREE.Mesh(
          new THREE.BoxGeometry(5, 20, this.wallDepth),
          this.wallMaterial
        );
        pillar.castShadow = true;
        pillar.receiveShadow = true;
        pillar.position.x = x;
        upPillar.add(pillar);
      }
      x += 50;
    }
    upPillar.position.x = 25;
    upPillar.position.y = 120;

    upWall.add(wall1);
    upWall.add(wall2);
    upWall.add(wall3);
    upWall.add(upPillar);
    return upWall;
  }

  createBackWall() {
    const backWall = new THREE.Group();
    const wall1 = new THREE.Mesh(
      new THREE.BoxGeometry(360, 80, this.wallDepth),
      this.wallMaterial
    );
    wall1.castShadow = true;
    wall1.receiveShadow = true;
    wall1.position.x = 175;
    wall1.position.y = 30;

    const wall2 = new THREE.Group();
    const _wall1 = new THREE.Mesh(
      new THREE.BoxGeometry(90, 20, this.wallDepth),
      this.wallMaterial
    );
    _wall1.castShadow = true;
    _wall1.receiveShadow = true;
    _wall1.position.x = 40;
    const _wall2 = new THREE.Mesh(
      new THREE.BoxGeometry(140, 20, this.wallDepth),
      this.wallMaterial
    );
    _wall2.castShadow = true;
    _wall2.receiveShadow = true;
    _wall2.position.x = 175;
    const _wall3 = new THREE.Mesh(
      new THREE.BoxGeometry(90, 20, this.wallDepth),
      this.wallMaterial
    );
    _wall3.castShadow = true;
    _wall3.receiveShadow = true;
    _wall3.position.x = 310;

    wall2.add(_wall1);
    wall2.add(_wall2);
    wall2.add(_wall3);
    wall2.position.y = 80;

    const wall3 = new THREE.Mesh(
      new THREE.BoxGeometry(360, 20, this.wallDepth),
      this.wallMaterial
    );
    wall3.castShadow = true;
    wall3.receiveShadow = true;
    wall3.position.x = 175;
    wall3.position.y = 100;

    const wall4 = new THREE.Mesh(
      new THREE.BoxGeometry(360, 10, this.wallDepth),
      this.wallMaterial
    );
    wall4.castShadow = true;
    wall4.receiveShadow = true;
    wall4.position.x = 175;
    wall4.position.y = 135;

    const upPillar = new THREE.Group();
    let x = 0;
    for (let i = 0; i < 7; i++) {
      if (i !== 3) {
        const pillar = new THREE.Mesh(
          new THREE.BoxGeometry(5, 20, this.wallDepth),
          this.wallMaterial
        );
        pillar.castShadow = true;
        pillar.receiveShadow = true;
        pillar.position.x = x;
        upPillar.add(pillar);
      }
      x += 50;
    }
    upPillar.position.x = 25;
    upPillar.position.y = 120;

    backWall.add(wall1);
    backWall.add(wall2);
    backWall.add(wall3);
    backWall.add(wall4);
    backWall.add(upPillar);
    return backWall;
  }

  createStairs() {
    const obj = [];
    const stairs = new THREE.Group();
    const edges = new THREE.Group();
    let height = 0;
    let stair;
    let line;
    const geometry = new THREE.Geometry();
    for (let i = 0; i < 7; i++) {
      height = height + 10 / 7;
      if (i !== 6) {
        stair = new THREE.Mesh(
          new THREE.BoxGeometry(360, height, 20 / 7),
          new THREE.MeshPhongMaterial({ color: "#deb887" })
        );
        stair.position.z = 23.5 - (20 / 7) * (i + 1);
      } else {
        stair = new THREE.Mesh(
          new THREE.BoxGeometry(360, height, 70),
          new THREE.MeshPhongMaterial({ color: "#deb887" })
        );
        stair.position.z = -30;
      }
      stair.castShadow = true;
      stair.receiveShadow = true;
      stair.position.x = 175;
      stair.position.y = height / 2;

      geometry.vertices.push(new THREE.Vector3(-5, 0, 0));
      geometry.vertices.push(new THREE.Vector3(355, 0, 0));

      line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: "#696969" })
      );
      line.position.y = height;
      line.position.z = 23.5 - (20 / 7) * (i + 1) + 10 / 7;

      stairs.add(stair);
      edges.add(line);
    }
    obj.push(stairs);
    obj.push(edges);
    return obj;
  }

  createWatch() {
    const watch = new THREE.Group();
    const hands = new THREE.Group();
    const disk = new THREE.Mesh(
      new THREE.CylinderGeometry(10, 10, 5, 36, 1, false),
      new THREE.MeshBasicMaterial({ color: "#ffffff" })
    );
    disk.castShadow = true;
    disk.receiveShadow = true;
    const hourHand = new THREE.Mesh(
      new THREE.BoxGeometry(1, 6, 1),
      new THREE.MeshBasicMaterial({ color: "#000000" })
    );
    hourHand.rotation.x = -Math.PI / 2;
    hourHand.rotation.z = Math.PI / 2.2;
    hourHand.position.x = 3;
    hourHand.position.y = -3;

    const minuteHand = new THREE.Mesh(
      new THREE.BoxGeometry(1, 8, 1),
      new THREE.MeshBasicMaterial({ color: "#000000" })
    );
    minuteHand.castShadow = true;
    minuteHand.receiveShadow = true;
    minuteHand.rotation.x = -Math.PI / 2;
    minuteHand.rotation.z = -Math.PI / 5;
    minuteHand.position.x = -3.5;
    minuteHand.position.y = -3;
    minuteHand.position.z = 4;

    const center = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 1, 36, 1, false),
      new THREE.MeshBasicMaterial({ color: "#000000" })
    );
    center.castShadow = true;
    center.receiveShadow = true;
    // center.rotation.x = -Math.PI / 2
    center.position.y = -3;
    watch.add(disk);
    watch.add(hourHand);
    watch.add(minuteHand);
    watch.add(center);
    watch.rotation.x = -Math.PI / 2;
    watch.position.x = 175;
    watch.position.y = 120;
    watch.position.z = 5;
    return watch;
  }
}
