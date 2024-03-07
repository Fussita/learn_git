import { Module } from '@nestjs/common';
import { WsRoomsModule } from './ws-rooms/ws-rooms.module';

@Module({
  imports: [
    WsRoomsModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
}
