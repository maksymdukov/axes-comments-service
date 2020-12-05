import { EntityRepository, Repository } from 'typeorm';
import { AnonymousUser } from './anonymous-user.entity';

@EntityRepository(AnonymousUser)
export class AnonymousUserRepository extends Repository<AnonymousUser> {}
