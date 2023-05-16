import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// Interface
import { BoardStatus } from './board.interface';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}