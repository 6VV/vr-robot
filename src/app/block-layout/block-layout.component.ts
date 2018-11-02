import { Component, OnInit } from '@angular/core';
import { BlockScene } from './block-scene';

@Component({
  selector: 'app-block-layout',
  templateUrl: './block-layout.component.html',
  styleUrls: ['./block-layout.component.css']
})
export class BlockLayoutComponent implements OnInit {
  private blockScene: BlockScene;

  ngOnInit() {
    this.blockScene = new BlockScene();
    this.update();
  }

  public update() {
    if (this.blockScene) {
      this.blockScene.updateBox();
    }
  }
}
