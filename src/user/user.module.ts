import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ListModule } from '@/src/list/list.module';
import { PrismaModule } from '@/src/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, ListModule],
})
export class UserModule {}
