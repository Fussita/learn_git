import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsRoomsService } from './ws-rooms.service';
export declare class WsRoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly wsRoomsService;
    server: Server;
    constructor(wsRoomsService: WsRoomsService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: any): Promise<void>;
    handleSetNewRoom(client: any, payload: any): Promise<void>;
    handleGetRooms(client: any, payload: any): Promise<void>;
    handleSetJoinUser(client: any, payload: any): Promise<void>;
    handleSetLeaveUser(client: any, payload: any): Promise<void>;
    handleDeliveryTokens(client: any, payload: any): Promise<void>;
}
