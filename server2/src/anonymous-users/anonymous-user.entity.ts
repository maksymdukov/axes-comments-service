import { Comment } from 'src/comments/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnonymousUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @OneToMany(() => Comment, (comment) => comment.anonymousUser)
  comments: Comment[];
}
