import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  login: string;

  @Column()
  password: string;

  @ApiProperty()
  @Column()
  version: number;

  @ApiProperty()
  @Column({ type: 'bigint' })
  createdAt: number;

  @ApiProperty()
  @Column({ type: 'bigint' })
  updatedAt: number;
}
