/**
 * socket-io.service
 * chat-app
 *
 * Created by henryehly on 5/7/16.
 */

import {Injectable, EventEmitter} from '@angular/core';
import Socket = SocketIOClient.Socket;
import {IChatMessage} from '../interfaces/chat-message.interface';

@Injectable()

export class SocketIOService {
  broadcastMessageUpdate: EventEmitter<IChatMessage>;
  userMessageUpdate: EventEmitter<IChatMessage>;
  connectionsUpdate: EventEmitter<any[]>;
  private _socket: Socket;
  private _socketUrl: string = 'http://localhost:3000';

  constructor() {
    this.broadcastMessageUpdate = new EventEmitter<IChatMessage>();
    this.userMessageUpdate = new EventEmitter<IChatMessage>();
    this.connectionsUpdate = new EventEmitter<any>();

    this.openSocket();
  }

  openSocket() {
    this._socket = io(this._socketUrl);
    this._socket.on('message', (message: IChatMessage) => this.broadcastMessageUpdate.emit(message));
    this._socket.on('user-message', (message: IChatMessage) => this.userMessageUpdate.emit(message));
    this._socket.on('user-connection', (data: any) => this.connectionsUpdate.emit(data.connections));
  }

  broadcastMessage(message: IChatMessage) {
    this._socket.emit('message', message);
  }
}
