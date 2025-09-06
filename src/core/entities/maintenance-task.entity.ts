import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Equipment } from './equipment.entity';

// Define enums locally
export enum MaintenanceStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum MaintenancePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

@Entity('maintenance_tasks')
export class MaintenanceTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  equipment_id: string;

  @ManyToOne(() => Equipment, equipment => equipment.maintenance_tasks)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  scheduled_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_date: Date;

  @Column({ 
    type: 'enum', 
    enum: MaintenanceStatus, 
    default: MaintenanceStatus.PENDING 
  })
  status: MaintenanceStatus;

  @Column({ length: 100 })
  assigned_to: string;

  @Column({ 
    type: 'enum', 
    enum: MaintenancePriority, 
    default: MaintenancePriority.MEDIUM 
  })
  priority: MaintenancePriority;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'json', nullable: true })
  checklist: any[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  complete(): void {
    this.status = MaintenanceStatus.COMPLETED;
    this.completed_date = new Date();
  }

  isOverdue(): boolean {
    return this.status === MaintenanceStatus.PENDING && new Date() > this.scheduled_date;
  }
}