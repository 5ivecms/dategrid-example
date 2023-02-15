import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  public create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }
}
