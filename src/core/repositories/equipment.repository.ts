import { Equipment } from '../entities/equipment.entity';

export interface EquipmentRepository {
  findById(id: string): Promise<Equipment | null>;
  findAll(): Promise<Equipment[]>;
  save(equipment: Equipment): Promise<Equipment>;
  update(id: string, equipment: Partial<Equipment>): Promise<Equipment | null>;
  delete(id: string): Promise<boolean>;
  findByStatus(status: string): Promise<Equipment[]>;
  findDueForMaintenance(): Promise<Equipment[]>;
  findByQRCode(qrCode: string): Promise<Equipment | null>;
  findWithPagination(options: any): Promise<[Equipment[], number]>;
}
