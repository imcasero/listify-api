import { Module } from '@nestjs/common';
import { PrismaModule } from '@/src/prisma/prisma.module';
import { ListController } from './list.controller';
import { ListService } from './list.service';

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [PrismaModule],
  exports: [ListService],
})
export class ListModule {}
