import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly title: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];
}
