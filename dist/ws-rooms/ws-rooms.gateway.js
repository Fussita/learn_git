"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsRoomsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const ws_rooms_service_1 = require("./ws-rooms.service");
let WsRoomsGateway = class WsRoomsGateway {
    constructor(wsRoomsService) {
        this.wsRoomsService = wsRoomsService;
    }
    handleConnection(client) {
        console.log(' > user connected ' + client.id);
    }
    async handleDisconnect(client) {
        console.log('> user disconnect');
    }
    async handleSetNewRoom(client, payload) {
        const msj = 'Msg From Server: ' + payload.roomName + ' created';
        client.join(payload.roomName);
        client.emit('create-room', msj);
        await this.wsRoomsService.createRoom(payload.roomName, payload.user);
        this.server.emit('get-rooms', this.wsRoomsService.rooms);
    }
    async handleGetRooms(client, payload) {
        client.emit('get-rooms', this.wsRoomsService.rooms);
    }
    async handleSetJoinUser(client, payload) {
        client.join(payload.roomName);
        await this.wsRoomsService.addUserInRoom(payload.roomName, payload.user);
        this.server.emit('get-rooms', this.wsRoomsService.rooms);
    }
    async handleSetLeaveUser(client, payload) {
        client.leave(payload.roomName);
        await this.wsRoomsService.leaveUserRoom(payload.roomName, payload.user);
        this.server.emit('get-rooms', this.wsRoomsService.rooms);
    }
    async handleDeliveryTokens(client, payload) {
        const roomName = payload.roomName;
        const room = await this.wsRoomsService.findRoomByName(roomName);
        this.server.in(room.users[0].socketId).emit('delivery-tokens', 'aguachile');
        this.server.in(room.users[1].socketId).emit('delivery-tokens', 'aguatorrente');
    }
};
exports.WsRoomsGateway = WsRoomsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WsRoomsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('create-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WsRoomsGateway.prototype, "handleSetNewRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('get-rooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WsRoomsGateway.prototype, "handleGetRooms", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WsRoomsGateway.prototype, "handleSetJoinUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WsRoomsGateway.prototype, "handleSetLeaveUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('delivery-tokens'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WsRoomsGateway.prototype, "handleDeliveryTokens", null);
exports.WsRoomsGateway = WsRoomsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } }),
    __metadata("design:paramtypes", [ws_rooms_service_1.WsRoomsService])
], WsRoomsGateway);
//# sourceMappingURL=ws-rooms.gateway.js.map