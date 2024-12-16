import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ListModule,
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
