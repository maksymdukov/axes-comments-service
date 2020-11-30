import { Column } from 'typeorm';

export class UserProfile {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  phone: string;
}
