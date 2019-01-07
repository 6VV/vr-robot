import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { User } from './user';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  private webSocket: WebSocket = null;
  private users: User[] = [];

  constructor(private socketService: SocketService) {
    this.webSocket = this.socketService.getRankSocket();
  }

  ngOnInit() {
    this.initWebSocket();
  }

  public refresh(): void {
    this.webSocket.send(JSON.stringify({ oper: 'get' }));
  }
  private initWebSocket(): void {
    this.webSocket.onopen = () => {
      this.refresh();
    };
    this.webSocket.onmessage = event => {
      if (!event.data) {
        return;
      }
      this.users = [];
      const data = JSON.parse(event.data);

      for (let i = 0; i < data.length; ++i) {
        this.users.push(new User(data[i]['name'], data[i]['score'], data[i]['time']));
      }

      this.users = this.users.sort((user1, user2) => {
        if (user1.time > user2.time) {
          return 1;
        } else if (user1.time < user2.time) {
          return -1;
        } else {
          return 0;
        }
      });

      for (let i = 0; i < this.users.length; ++i) {
        this.users[i].id = i + 1;
      }

    };
  }

}
