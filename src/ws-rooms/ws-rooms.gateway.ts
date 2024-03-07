import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { WsRoomsService } from './ws-rooms.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class WsRoomsGateway implements 
  OnGatewayConnection,
  OnGatewayDisconnect
{
  @WebSocketServer()
  public server: Server

  constructor(private readonly wsRoomsService: WsRoomsService) {}

  handleConnection(client: Socket) {
    console.log(' > user connected '+ client.id)      
  }  
  
  async handleDisconnect(client: any) {
    console.log('> user disconnect')
    //await this.wsRoomsService.removeUserFromAllRooms(client.id)
  }

  @SubscribeMessage('create-room')
  async handleSetNewRoom( client: any, payload: any ) {
    const msj = 'Msg From Server: '+ payload.roomName + ' created'
    client.join(payload.roomName) 
    client.emit('create-room', msj)
    await this.wsRoomsService.createRoom(payload.roomName, payload.user)
    this.server.emit('get-rooms', this.wsRoomsService.rooms)
  }

  @SubscribeMessage('get-rooms')
  async handleGetRooms( client: any, payload: any ) {
    client.emit('get-rooms', this.wsRoomsService.rooms)
  }

  @SubscribeMessage('join-room')
  async handleSetJoinUser( client: any, payload: any ) {
    client.join(payload.roomName)
    await this.wsRoomsService.addUserInRoom( payload.roomName, payload.user )
    this.server.emit('get-rooms', this.wsRoomsService.rooms)
  }

  @SubscribeMessage('leave-room')
  async handleSetLeaveUser( client: any, payload: any ) {
    client.leave(payload.roomName)
    await this.wsRoomsService.leaveUserRoom( payload.roomName, payload.user )
    this.server.emit('get-rooms', this.wsRoomsService.rooms)
  }

  @SubscribeMessage('delivery-tokens')
  async handleDeliveryTokens( client: any, payload: any ) {
    const roomName = payload.roomName
    const room = await this.wsRoomsService.findRoomByName(roomName)
    
    this.server.in(room.users[0].socketId).emit('delivery-tokens', 'aguachile')
    this.server.in(room.users[1].socketId).emit('delivery-tokens', 'aguatorrente')
    //this.server.to(roomName).emit('delivery-tokens', 'repartir')
  }

}

// await this.server.in(payload.user.socketId).socketsJoin(payload.roomName) 
// client.leave(room)
// client.emit('create-room', 'Recibido')
// this.server.to(room).emit('msgFromRoom', message)
    