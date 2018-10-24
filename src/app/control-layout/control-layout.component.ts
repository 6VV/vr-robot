import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-control-layout',
  templateUrl: './control-layout.component.html',
  styleUrls: ['./control-layout.component.css']
})
export class ControlLayoutComponent implements OnInit {

  @ViewChild('blockLayout')
  blockLayout;

  private score = 0;
  public number = 0;
  private TEXT_RANKING = '排名';
  private TEXT_VIDEO = '视频';

  public urlButtonText = this.TEXT_RANKING;

  constructor(private router: Router) { }

  ngOnInit() {
    this.update();
  }

  public update() {
    // this.blockScene.updateBox();
    this.blockLayout.update();
  }

  public computeScore() {
    if (this.number === 4) {
      this.score += 10;
    } else {
      this.score += this.number * 2;
      this.score -= 2;
    }
    this.number = 0;
  }

  public done() {
    this.computeScore();
    this.update();
  }

  public newGame() {
    this.score = 0;
    this.number = 0;
    this.update();
  }

  public showRanking() {
    if (this.urlButtonText === this.TEXT_RANKING) {
      this.urlButtonText = this.TEXT_VIDEO;
      this.router.navigateByUrl('/ranking');
    } else {
      this.urlButtonText = this.TEXT_RANKING;
      this.router.navigateByUrl('/video');
    }
  }

}
