import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  empId: number;

  @Column()
  empName: string;

  @Column()
  empDept: string;
}
