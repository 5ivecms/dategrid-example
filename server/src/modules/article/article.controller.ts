import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SearchDto } from 'src/common/services/search-service/search.dto';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  public async findAll() {
    return await this.articleService.findAll();
  }

  @Get('search')
  public search(@Query() dto: SearchDto<ArticleEntity>) {
    return this.articleService.search(dto);
  }

  @Post()
  public create(@Body() dto: CreateArticleDto) {
    return this.articleService.create(dto);
  }
}
