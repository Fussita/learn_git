"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsRoomsService = void 0;
const common_1 = require("@nestjs/common");
let WsRoomsService = class WsRoomsService {
    constructor() {
        this.rooms = [];
        this.users = [];
    }
    async validateUser(user) {
        let ref = true;
        await this.users.forEach(e => {
            if (e.socketId == user.socketId)
                ref = false;
        });
        return ref;
    }
    async createRoom(name, user) {
        const search = this.rooms.filter(e => e.name == name);
        const ref = await this.validateUser(user);
        if (search.length == 0 && ref) {
            const room = {
                name: name,
                host: user,
                users: [user]
            };
            this.rooms.push(room);
            this.users.push(user);
        }
    }
    async findRoomByName(name) {
        return this.rooms.filter(e => e.name == name)[0];
    }
    async addUserInRoom(name, user) {
        const room = await this.findRoomByName(name);
        const ref = await this.validateUser(user);
        if (room.users.length < 4 && ref) {
            room.users.push(user);
            this.users.push(user);
        }
    }
    async leaveUserRoom(name, user) {
        const room = await this.findRoomByName(name);
        room.users = room.users.filter(e => e.socketId != user.socketId);
        this.users = this.users.filter(e => e.socketId != user.socketId);
        if (room.users.length == 0)
            this.rooms = this.rooms.filter(e => e.name != room.name);
    }
    async removeUserFromAllRooms(socketId) {
    }
};
exports.WsRoomsService = WsRoomsService;
exports.WsRoomsService = WsRoomsService = __decorate([
    (0, common_1.Injectable)()
], WsRoomsService);
//# sourceMappingURL=ws-rooms.service.js.map