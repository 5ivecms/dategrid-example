import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchService } from 'src/common/services/search-service/search.service';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto';

@Injectable()
export class ArticleService extends SearchService<ArticleEntity> {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly categoryService: CategoryService,
  ) {
    super(articleRepository);
  }

  public findAll() {
    try {
      return this.articleRepository.find({ relations: { categories: true } });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async create(dto: CreateArticleDto) {
    try {
      const { title, categoryIds } = dto;
      const categories = await this.categoryService.findByIds(categoryIds);
      const article = this.articleRepository.create({ title, categories });
      return this.articleRepository.save(article);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
