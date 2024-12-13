import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}
  async create(createListDto: Prisma.ListCreateInput) {
    return await this.prisma.list.create({
      data: createListDto,
    });
  }

  async findOneById(id: number) {
    const list = await this.prisma.list.findUnique({
      where: {
        id,
      },
    });

    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
    return list;
  }

  async findByUserId(userId: number) {
    const list = await this.prisma.list.findMany({
      where: {
        userId,
      },
    });
    if (!list) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return list;
  }

  async update(id: number, updateListDto: Prisma.ListUpdateInput) {
    const list = await this.prisma.list.update({
      where: { id },
      data: updateListDto,
    });
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
    return list;
  }

  async remove(id: number) {
    const list = await this.prisma.list.delete({
      where: { id },
    });
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
    return list;
  }
}
