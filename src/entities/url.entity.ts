import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


@Entity('dblog')
export class UrlEntity {
    @PrimaryGeneratedColumn()
id: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    originalUrl: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    shortUrl: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    userIp: string;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    createdAt: Date;
    
}  // 일반적으로 TypeORM에서 엔티티(Entity)의 이름은 스네이크 케이스(Snake Case)가 아니라 카멜 케이스(Camel Case)를 사용