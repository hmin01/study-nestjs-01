import { Body, Controller, Param } from '@nestjs/common';
// DTO
import { CreateBoardDto } from './dto/create';
// Entity
import { Board } from './board.entity';
// HTTP Method
import { Delete, Get, Patch, Post } from '@nestjs/common';
// Interface
import { BoardStatus } from './board.interface';
// Pipe
import { ParseIntPipe } from '@nestjs/common';
// Service
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private service: BoardService) {}

  @Post()
  create(@Body() input: CreateBoardDto): Promise<Board> {
    return this.service.create(input);
  }

  @Get('all')
  findAll(): Promise<Board[]> {
    return this.service.findAll();
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.service.deleteById(id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.service.findById(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: BoardStatus): Promise<string> {
    return this.service.updateStatus(id, status);
  }
}
