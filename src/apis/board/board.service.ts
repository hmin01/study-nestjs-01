import { Injectable } from '@nestjs/common';
// DTO
import { CreateBoardDto } from './board.dto';
// Entity
import { Board } from './board.entity';
// Exception
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
// Interface
import { BoardStatus } from './board.interface';

@Injectable()
export class BoardService {
  /**
   * [Method] 게시물 생성
   * @param input 게시물 정보
   * @returns 생성된 게시물
   */
  async create(input: CreateBoardDto): Promise<Board> {
    // 객체 생성 및 저장
    const board: Board = await Board.save(Board.create({
      ...input,
      status: BoardStatus.PUBLIC
    }));
    // 예외 처리
    if (!board) throw new InternalServerErrorException();
    // 결과 반환
    return board;
  }

  /**
   * [Method] 게시물 삭제
   * @param id 게시물 ID
   */
  async deleteById(id: number): Promise<string> {
    // 삭제
    const result = await Board.delete({ id });
    // 예외 처리
    if (result.affected === 0) this.notFoundException(id);
    // 결과 반환
    return 'Deleted';
  }

  /**
   * [Method] 모든 게시물 조회
   * @returns 조회 결과
   */
  async findAll(): Promise<Board[]> {
    try {
      return await Board.find();
    } catch (err: unknown) {
      this.notFoundException();
    }
  }

  /**
   * [Method] 특정 게시물 조회
   * @param id 게시물 ID
   * @returns 조회 결과
   */
  async findById(id: number): Promise<Board> {
    // 조회
    const board: Board =  await Board.findOneBy({ id });
    // 예외 처리
    if (!board) this.notFoundException(id);
    // 결과 반환
    return board;
  }

  /**
   * [Method] 게시물 상태 변경
   * @param id 게시물 ID
   * @param status 상태 값
   */
  async updateStatus(id: number, status: BoardStatus): Promise<string> {
    // 상태 변경
    const result = await Board.update(id, { status });
    // 예외 처리
    if (result.affected === 0) this.notFoundException(id);
    // 결과 반환
    return 'Updated';
  }

  /**
   * [Private Method] NotFoundException
   * @param id 게시물 ID
   * @returns 예외 반환
   */
  private notFoundException(id?: number): void {
    throw new NotFoundException(id ? `Can't find board with id (input: ${id})` : `Can't find boards`);
  }
}
