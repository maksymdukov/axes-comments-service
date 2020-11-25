import { Column } from 'typeorm';

export class UserProfile {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  phone: string;
}
