import * as THREE from 'three';

export class BlockGrid {
  private validPosition: THREE.Vector3[] = [];
  private boxLength = 100;
  private colorObjects = this.createColorObjects();
  private boxAdded: THREE.Mesh[] = [];

  constructor(private scene: THREE.Scene, private lineNumber: number) {
    this.initGrid(scene, lineNumber);
    this.initValidPosition();
  }
  private createColorObjects(): any[] {
    return [
      { color: new THREE.Color('red'), number: 1 },
      { color: new THREE.Color('orange'), number: 1 },
      { color: new THREE.Color('blue'), number: 1 },
      { color: new THREE.Color('yellow'), number: 1 }
    ];
  }
  private nextValidPosition(): THREE.Vector3 {
    const index = this.random(this.validPosition.length);
    const position = this.validPosition[index];
    this.validPosition[index] = new THREE.Vector3(
      position.x,
      position.y,
      position.z + this.boxLength
    );
    return position;
  }

  private nextColor(): THREE.Color {
    const flags = [];
    for (let i = 0; i < this.colorObjects.length; ++i) {
      if (this.colorObjects[i].number > 0) {
        flags.push(i);
      }
    }

    const index = flags[this.random(flags.length)];
    --this.colorObjects[index].number;

    return this.colorObjects[index].color;
  }

  public update(): void {
    this.removeAllBox();
    this.initColorObjects();
    this.initValidPosition();

    let number = 0;
    for (let i = 0; i < this.colorObjects.length; ++i) {
      number += this.colorObjects[i].number;
    }
    for (let i = 0; i < number; ++i) {
      const box = this.createBox(this.nextValidPosition(), this.nextColor());
      this.scene.add(box);
      this.boxAdded.push(box);
    }
  }
  private initColorObjects(): void {
    this.colorObjects = this.createColorObjects();
  }

  private removeAllBox(): void {
    for (let i = 0; i < this.boxAdded.length; ++i) {
      this.scene.remove(this.boxAdded[i]);
    }
    this.boxAdded = [];
  }

  private random(range: number): number {
    return Math.floor(Math.random() * range);
  }

  private initGrid(scene: THREE.Scene, lineNumber: number) {
    const lineLength = this.boxLength * lineNumber;
    scene.add(this.createPlane(this.boxLength * (lineNumber + 1)));

    for (let i = 0; i < lineNumber + 1; ++i) {
      scene.add(
        this.createLine(
          new THREE.Vector3(
            -lineLength / 2,
            -lineLength / 2 + this.boxLength * i,
            -this.boxLength / 2
          ),
          new THREE.Vector3(
            lineLength / 2,
            -lineLength / 2 + this.boxLength * i,
            -this.boxLength / 2
          )
        )
      );
      scene.add(
        this.createLine(
          new THREE.Vector3(
            -lineLength / 2 + this.boxLength * i,
            -lineLength / 2,
            -this.boxLength / 2
          ),
          new THREE.Vector3(
            -lineLength / 2 + this.boxLength * i,
            lineLength / 2,
            -this.boxLength / 2
          )
        )
      );
    }
  }

  private createBox(position: THREE.Vector3, color: THREE.Color): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(
      this.boxLength,
      this.boxLength,
      this.boxLength
    );
    const material = new THREE.MeshLambertMaterial({ color: color });
    const box = new THREE.Mesh(geometry, material);
    box.position.x = position.x;
    box.position.y = position.y;
    box.position.z = position.z;
    box.castShadow = true;

    return box;
  }
  private initValidPosition(): void {
    this.validPosition = [];
    const lineLength = this.boxLength * this.lineNumber;
    const start = -lineLength / 2 + this.boxLength / 2;

    for (let i = 0; i < this.lineNumber; ++i) {
      for (let j = 0; j < this.lineNumber; ++j) {
        this.validPosition.push(
          new THREE.Vector3(
            start + i * this.boxLength,
            start + j * this.boxLength,
            0
          )
        );
      }
    }
  }

  private createPlane(length: number): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(length, length, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.z = -this.boxLength / 2;
    plane.receiveShadow = true;
    return plane;
  }

  private createLine(
    startPosition: THREE.Vector3,
    endPosition: THREE.Vector3
  ): THREE.Line {
    const geometry = new THREE.Geometry();
    geometry.vertices.push(startPosition);
    geometry.vertices.push(endPosition);

    return new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: 0x0000ff, opacity: 0.5 })
    );
  }
}
