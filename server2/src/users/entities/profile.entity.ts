import { Column } from 'typeorm';

export class UserProfile {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  photo: string;
}
