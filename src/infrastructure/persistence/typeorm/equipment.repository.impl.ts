import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from '@core/entities/equipment.entity';
import { EquipmentRepository } from '@core/repositories/equipment.repository';

@Injectable()
export class TypeOrmEquipmentRepository implements EquipmentRepository {
  constructor(
    @InjectRepository(Equipment)
    private readonly repository: Repository<Equipment>
  ) {}

  async findById(id: string): Promise<Equipment | null> {
    return this.repository.findOne({ 
      where: { id },
      relations: ['maintenance_tasks']
    });
  }

  async findAll(): Promise<Equipment[]> {
    return this.repository.find({ relations: ['maintenance_tasks'] });
  }

  async save(equipment: Equipment): Promise<Equipment> {
    return this.repository.save(equipment);
  }

  async update(id: string, equipment: Partial<Equipment>): Promise<Equipment | null> {
    await this.repository.update(id, equipment);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async findByStatus(status: string): Promise<Equipment[]> {
    return this.repository.find({ 
      where: { status },
      relations: ['maintenance_tasks']
    });
  }

  async findDueForMaintenance(): Promise<Equipment[]> {
    const today = new Date();
    return this.repository
      .createQueryBuilder('equipment')
      .where('equipment.next_maintenance_date <= :today', { today })
      .andWhere('equipment.status = :status', { status: 'ACTIVE' })
      .leftJoinAndSelect('equipment.maintenance_tasks', 'maintenance_tasks')
      .getMany();
  }

  async findByQRCode(qrCode: string): Promise<Equipment | null> {
    return this.repository.findOne({ 
      where: { qr_code: qrCode },
      relations: ['maintenance_tasks']
    });
  }

  async findWithPagination(options: any): Promise<[Equipment[], number]> {
    const { skip, take, where } = options;
    return this.repository.findAndCount({
      where,
      skip,
      take,
      relations: ['maintenance_tasks'],
      order: { created_at: 'DESC' }
    });
  }
}
