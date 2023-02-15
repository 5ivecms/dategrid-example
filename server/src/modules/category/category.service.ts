import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public findAll() {
    return this.categoryRepository.find();
  }

  public create(dto: CreateCategoryDto) {
    return this.categoryRepository.save(dto);
  }

  public findByIds(ids: number[]) {
    return this.categoryRepository.find({ where: { id: In(ids) } });
  }
}
