import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('dblog')
export class UrlEntity {
    @PrimaryGeneratedColumn()
id: number;


    @Column({ type: 'varchar', length: 200, nullable: false })
    originalUrl: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    shortenUrl: string;

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    created_at: Date;

    @Column({ type: 'varchar', length: 200, nullable: false })
    user_ip: string;
}
