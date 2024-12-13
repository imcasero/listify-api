import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListService } from './list.service';
import { Prisma } from '@prisma/client';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() createListDto: Prisma.ListCreateInput) {
    return this.listService.create(createListDto);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.listService.findByUserId(+userId);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.listService.findOneById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListDto: Prisma.ListUpdateInput,
  ) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
