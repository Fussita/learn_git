import { Room, User } from 'src/shared/chat.interface';
export declare class WsRoomsService {
    rooms: Room[];
    users: User[];
    validateUser(user: User): Promise<boolean>;
    createRoom(name: string, user: User): Promise<void>;
    findRoomByName(name: string): Promise<Room>;
    addUserInRoom(name: string, user: User): Promise<void>;
    leaveUserRoom(name: string, user: User): Promise<void>;
    removeUserFromAllRooms(socketId: string): Promise<void>;
}
