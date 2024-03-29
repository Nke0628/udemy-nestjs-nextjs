import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Task } from '@prisma/client'
import { Request } from 'express'
import { createTaskDto } from './dto/create-task.dto'
import { updateTaskDto } from './dto/update-task.dto'
import { TodoService } from './todo.service'

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTasks(@Req() req: Request): Promise<Task[]> {
    return this.todoService.getTasks(req.user.id)
  }

  @Get(':id')
  getTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    return this.todoService.getTaskById(req.user.id, taskId)
  }

  @Post()
  createTask(@Req() req: Request, @Body() dto: createTaskDto): Promise<Task> {
    return this.todoService.createTask(req.user.id, dto)
  }

  @Patch(':id')
  updateTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: updateTaskDto,
  ): Promise<Task> {
    return this.todoService.updateTaskById(req.user.id, taskId, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<void> {
    return this.todoService.deleteByTaskId(req.user.id, taskId)
  }
}
