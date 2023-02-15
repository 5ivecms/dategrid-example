import { IsArray, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  public readonly title: string;

  @IsArray()
  public categoryIds: number[];
}
