import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: Prisma.TaskCreateInput) {
    const { listId } = createTaskDto as unknown as { listId: number };
    if (!(await this.listExists(listId))) {
      throw new NotFoundException(`Lista con ID ${listId} no encontrada`);
    }
    return await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description || null,
        completed: createTaskDto.completed || false,
        list: { connect: { id: listId } },
      },
    });
  }

  async findAllByListId(listId: number) {
    if (!(await this.listExists(listId))) {
      throw new NotFoundException(`Lista con ID ${listId} no encontrada`);
    }
    return await this.prisma.task.findMany({ where: { listId } });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: Prisma.TaskUpdateInput) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    if (!(await this.listExists(task.listId))) {
      throw new NotFoundException(`Lista con ID ${task.listId} no encontrada`);
    }
    return await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return await this.prisma.task.delete({ where: { id } });
  }

  private async listExists(listId: number): Promise<boolean> {
    const list = await this.prisma.list.findUnique({ where: { id: listId } });
    return !!list;
  }
}
