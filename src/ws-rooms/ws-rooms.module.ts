import { Module } from '@nestjs/common';
import { WsRoomsService } from './ws-rooms.service';
import { WsRoomsGateway } from './ws-rooms.gateway';

@Module({
  providers: [WsRoomsGateway, WsRoomsService],
})
export class WsRoomsModule {}
