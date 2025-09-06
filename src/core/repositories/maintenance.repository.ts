import { MaintenanceTask } from '../entities/maintenance-task.entity';

export interface MaintenanceRepository {
  findById(id: string): Promise<MaintenanceTask | null>;
  findByEquipmentId(equipmentId: string, limit?: number): Promise<MaintenanceTask[]>;
  findByStatus(status: string): Promise<MaintenanceTask[]>;
  save(task: MaintenanceTask): Promise<MaintenanceTask>;
  update(id: string, task: Partial<MaintenanceTask>): Promise<MaintenanceTask | null>;
  delete(id: string): Promise<boolean>;
  findOverdueTasks(): Promise<MaintenanceTask[]>;
  findUpcomingTasks(days: number): Promise<MaintenanceTask[]>;
}
