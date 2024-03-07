import { Module } from '@nestjs/common';
import { WsRoomsModule } from './ws-rooms/ws-rooms.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    WsRoomsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
}
