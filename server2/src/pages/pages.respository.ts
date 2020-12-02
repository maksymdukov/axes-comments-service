import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import {} from '@nestjs/mapped-types';

export class PagesRepository extends Repository<Page> {}