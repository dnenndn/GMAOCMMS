import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MaintenanceTask } from './maintenance-task.entity';

// Define enums locally to avoid import issues
export enum EquipmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  DECOMMISSIONED = 'DECOMMISSIONED'
}

@Entity('equipments')
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100, nullable: true })
  model: string;

  @Column({ length: 100, nullable: true, unique: true })
  serial_number: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @Column({ type: 'text', nullable: true })
  qr_code: string;

  @Column({ type: 'date', nullable: true })
  purchase_date: Date;

  @Column({ type: 'date', nullable: true })
  warranty_expiry: Date;

  @Column({ 
    type: 'enum', 
    enum: EquipmentStatus, 
    default: EquipmentStatus.ACTIVE 
  })
  status: EquipmentStatus;

  @Column({ length: 255 })
  location: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  purchase_value: number;

  @Column({ type: 'int' })
  maintenance_interval: number;

  @Column({ type: 'date', nullable: true })
  last_maintenance_date: Date;

  @Column({ type: 'date', nullable: true })
  next_maintenance_date: Date;

  @Column({ type: 'json', nullable: true })
  specifications: Record<string, any>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => MaintenanceTask, task => task.equipment)
  maintenance_tasks: MaintenanceTask[];

  generateQRCode(): void {
    this.qr_code = `EQUIP-${this.serial_number}-${this.id.substring(0, 8)}`;
  }

  isDueForMaintenance(): boolean {
    if (!this.next_maintenance_date) return false;
    return new Date() >= this.next_maintenance_date;
  }
}