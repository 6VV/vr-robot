import * as THREE from 'three';
import { BlockGrid } from './block-grid';
import TrackballControls from 'three-trackballcontrols';

export class BlockScene {
  private scene: THREE.Scene = null;
  private camera: THREE.PerspectiveCamera = null;
  private renderer: THREE.WebGLRenderer = null;
  private threeElement: HTMLElement = document.getElementById('three');
  private blockGrid: BlockGrid = null;
  private orbitContorls = null;

  constructor() {
    this.init();
    this.initListener();
    this.render();
    this.blockGrid = new BlockGrid(this.scene, 4);
  }

  private init(): void {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLight();
    this.initContorl();
  }
  private initContorl(): void {
    this.orbitContorls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
  }
  private initScene(): void {
    this.scene = new THREE.Scene();
  }

  private initListener(): void {
    window.addEventListener(
      'resize',
      () => {
        this.camera.aspect =
          this.threeElement.clientWidth / this.threeElement.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
          this.threeElement.clientWidth,
          this.threeElement.clientHeight
        );
      },
      false
    );
  }
  private initCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.threeElement.clientWidth / this.threeElement.clientHeight,
      0.1,
      2000
    );
    this.camera.position.y = -300;
    this.camera.position.z = 500;
    this.camera.lookAt(0, 0, 0);
  }

  private initRenderer(): void {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(
      this.threeElement.clientWidth,
      this.threeElement.clientHeight
    );
    this.renderer.setClearColor(0xeeeeee);
    this.renderer.shadowMapEnabled = true;
    this.threeElement.appendChild(this.renderer.domElement);
  }

  private initLight(): void {
    const spotLight = new THREE.SpotLight(0xffffff);
    const ambientLight = new THREE.AmbientLight(0x333333);
    spotLight.position.set(0, -500, 1500);
    spotLight.castShadow = true;
    this.scene.add(spotLight);
    this.scene.add(ambientLight);
  }

  private render = () => {
    this.renderer.render(this.scene, this.camera);
    this.orbitContorls.update();
    window.requestAnimationFrame(this.render);
  };

  public updateBox(): void {
    this.blockGrid.update();
  }

  // private createBlock() {
  //   const geometry = new THREE.BoxGeometry(50, 50, 50);
  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   const cube = new THREE.Mesh(geometry, material);
  //   cube.position.x = -25;
  //   cube.position.y = 0;
  //   cube.position.z = -25;
  //   this.scene.add(cube);
  // }

  //   private createLine() {
  //     const geometry = new THREE.Geometry();
  //     geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
  //     geometry.vertices.push(new THREE.Vector3(500, 0, 0));

  //     for (let i = 0; i <= 20; i++) {
  //       const line1 = new THREE.Line(
  //         geometry,
  //         new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 })
  //       );
  //       line1.position.z = i * 50 - 500;
  //       this.scene.add(line1);

  //       const line2 = new THREE.Line(
  //         geometry,
  //         new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 })
  //       );
  //       line2.position.x = i * 50 - 500;
  //       line2.rotation.y = (90 * Math.PI) / 180;
  //       this.scene.add(line2);
  //     }
  //   }
}
