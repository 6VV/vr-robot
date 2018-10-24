import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  private webSocket: WebSocket = null;
  private serverAddress = 'ws://127.0.0.1:12003/';
  private isFirstReceiveImage = true;

  constructor() { }

  ngOnDestroy() {
    this.closeWebSocket();
  }

  ngOnInit() {
    this.initWebSocket();
    // $('#fire-branch-tab').on('shown.bs.tab', () => {
    //   this.initWebSocket();
    // });
    // $('#fire-branch-tab').on('hidden.bs.tab', () => {
    //   this.closeWebSocket();
    // });
  }

  private closeWebSocket(): void {
    if (this.webSocket) {
      this.webSocket.close();
      this.webSocket = null;
    }
  }

  private initWebSocket(): void {
    if (this.webSocket) {
      return;
    }
    console.log('event');

    this.webSocket = new WebSocket(this.serverAddress);
    this.isFirstReceiveImage = true;

    this.webSocket.onclose = () => {
      console.log('fire-branch websocket close');
    };
    this.webSocket.onopen = () => {
      console.log('fire-branch websocket open');
    };

    this.webSocket.onmessage = event => {
      // console.log(event);
      if (!event.data) {
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // 读取文件完成后，创建img标签来显示服务端传来的字节数组
        const img = <HTMLImageElement>(
          document.getElementById('video')
        );
        if (!img) {
          return;
        }
        img.src = <string>reader.result;

        img.onload = () => {
          this.updateImageElementSize(img);
        };
      };
      // 调用FileReader的readAsDataURL的方法会触发onload事件
      reader.readAsDataURL(event.data);
    };
  }

  // 修改图片大小以适应父控件
  private updateImageElementSize(imgElement: HTMLImageElement): void {
    // 若是第一次修改大小
    if (this.isFirstReceiveImage) {
      const parentElement: HTMLElement = imgElement.parentElement;
      // 若父容器大小不为0,修改大小
      if (parentElement.clientWidth && parentElement.clientHeight) {
        this.isFirstReceiveImage = false;

        // 父容器宽高比
        const containerScale =
          parentElement.clientWidth / parentElement.clientHeight;

        // 实际图片宽高比
        const imgScale = imgElement.naturalWidth / imgElement.naturalHeight;

        if (containerScale > imgScale) {
          // 若父容器宽高比大于图片宽高比，设置图片高度为父容器高度
          imgElement.style.height = '100%';
          imgElement.style.width = 'auto';
          // imgElement.style.width = parentElement.clientHeight * imgScale + 'px';
        } else {
          // 若父容器宽高比小于图片宽高比，设置图片宽度为父容器宽度
          imgElement.style.width = '100%';
          imgElement.style.height = 'auto';
          // imgElement.style.height = parentElement.clientWidth / imgScale + 'px';
        }
      }
    }
  }

}
