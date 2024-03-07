import { Injectable } from '@nestjs/common';
import { Room, User } from 'src/shared/chat.interface';

@Injectable()
export class WsRoomsService {

  public rooms: Room[] = []
  public users: User[] = []

  async validateUser( user: User ) {
    let ref = true
    await this.users.forEach( e => {
        if ( e.socketId == user.socketId ) ref = false
      }
    ) 
    return ref
  }

  async createRoom( name: string, user: User ) {
    const search = this.rooms.filter( e => e.name == name  )
    const ref = await this.validateUser(user) 
    if ( search.length == 0 && ref ) {
      const room = {
        name: name,
        host: user,
        users: [user]  
      }
      this.rooms.push( room )
      this.users.push(user)
    }
  } 

  async findRoomByName( name: string ) {
    return this.rooms.filter( e => e.name == name )[0]
  }

  async addUserInRoom( name: string, user: User ) {
    const room = await this.findRoomByName(name)
    const ref = await this.validateUser(user) 
    if ( room.users.length < 4 && ref ) {
      room.users.push(user)
      this.users.push(user)
    }
  }

  async leaveUserRoom( name: string, user: User ) {
    const room = await this.findRoomByName(name)
    room.users = room.users.filter( e => e.socketId != user.socketId)
    this.users = this.users.filter( e => e.socketId != user.socketId )
    if ( room.users.length == 0 ) 
      this.rooms = this.rooms.filter( e => e.name != room.name )
  }

  async removeUserFromAllRooms( socketId: string ) {
    
  }
}
