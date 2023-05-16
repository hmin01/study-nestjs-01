import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
// Exception
import { BadRequestException } from '@nestjs/common';
// Interface
import { BoardStatus } from 'src/apis/board/board.interface';

export class BoardStatusValidationPipe implements PipeTransform {
  // 상태 옵션
  readonly options: BoardStatus[] = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any, metadata: ArgumentMetadata) {
    // 입력 받은 값에 대한 유형 확인
    this.isValidType(value);
    // 입력받은 값은 대문자로 변환
    const transformed: string = (value as string).toUpperCase();
    // 검증
    if (!this.isValidValue(transformed)) throw new BadRequestException(`'${value}' isn't in the status options`);
    // 반환
    return transformed;
  }

  private isValidValue(value: any): boolean {
    return this.options.includes(value);
  }

  private isValidType(value: any): void {
    // 값 유무 확인
    if (!value) throw new BadRequestException('Can\'t find status option');
    // 문자열 여부 확인
    if (typeof value !== 'string') throw new BadRequestException('The data type for the status value must be a string');
  }
}