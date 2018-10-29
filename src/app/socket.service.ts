import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private rankServerAddress = 'ws://' + this.configService.serverIp + ':12004/';
  private rankSocket = null;

  constructor(private configService: ConfigService) {
    this.rankSocket = new WebSocket(this.rankServerAddress);
  }

  public getRankSocket(): WebSocket {
    return this.rankSocket;
  }
}
