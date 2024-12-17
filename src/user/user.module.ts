import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ListModule } from '../list/list.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, ListModule],
})
export class UserModule {}
