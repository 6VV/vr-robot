import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';
import * as $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-control-layout',
  templateUrl: './control-layout.component.html',
  styleUrls: ['./control-layout.component.css']
})
export class ControlLayoutComponent implements OnInit {

  @ViewChild('blockLayout')
  blockLayout;

  private score = 0;
  private newScore = 0;
  public number = 0;
  private operator = '';

  private TEXT_RANKING = '排名';
  private TEXT_VIDEO = '视频';
  public urlButtonText = this.TEXT_RANKING;

  private MAX_TIME = 5 * 60;
  private remainTime = this.MAX_TIME;
  private timeId;

  private TEXT_PAUSE = '暂停';
  private TEXT_CONTINUE = '继续';
  public pauseButtonText = this.TEXT_PAUSE;

  private webSocket: WebSocket = null;

  constructor(private router: Router, private socketService: SocketService) {
    this.webSocket = this.socketService.getRankSocket();
  }

  ngOnInit() {
    this.update();
  }

  public changeScore(value) {
    this.number = value;
  }

  public update() {
    this.number = 0;
    this.blockLayout.update();
  }

  public computeScore() {
    if (this.number === 4) {
      this.newScore = this.score + 10;
    } else {
      this.newScore = this.score + this.number * 2;
    }
  }

  public newGroup() {
    this.score = this.newScore;
    this.update();
  }

  // public done() {
  //   this.computeScore();
  //   this.update();
  // }

  public newGame() {
    this.reset();
    this.computeTime();
    this.update();
  }

  private reset() {
    this.score = 0;
    this.newScore = 0;
    this.number = 0;
    this.remainTime = this.MAX_TIME;
    this.pauseButtonText = this.TEXT_PAUSE;
    this.stopComputeTime();
  }

  private computeTime() {
    this.timeId = setInterval(() => {
      this.remainTime -= 1;
      if (this.remainTime <= 0) {
        $('#commitDialog').modal('show');
        this.stopComputeTime();
      }
    }, 1000);
  }

  private stopComputeTime() {
    clearInterval(this.timeId);
  }

  public pause() {
    this.stopComputeTime();
    if (this.pauseButtonText === this.TEXT_PAUSE) {
      this.pauseButtonText = this.TEXT_CONTINUE;
    } else {
      this.computeTime();
      this.pauseButtonText = this.TEXT_PAUSE;
    }
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

  private processBarValue() {
    return this.remainTime / this.MAX_TIME;
  }

  private processBarColor() {
    return this.processBarValue() < 0.4 ? 'bg-danger' : '';
  }


  private remainTimeText() {
    const remainMinute = Math.floor(this.remainTime / 60);
    const remainSecond = this.remainTime - remainMinute * 60;
    return remainMinute + ' : ' + remainSecond;
  }

  public save(value) {
    if (value.score === null) {
      alert('分数不能为空');
    }
    this.webSocket.send(JSON.stringify({ oper: 'new', value: value }));
    this.webSocket.send(JSON.stringify({ oper: 'get' }));
    $('#commitDialog').modal('hide');
    this.reset();
  }
}
