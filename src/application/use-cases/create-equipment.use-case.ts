import { Injectable } from '@nestjs/common';
import { Equipment } from '@core/entities/equipment.entity';
import { EquipmentRepository } from '@core/repositories/equipment.repository';
import { CreateEquipmentDto } from '../dto/create-equipment.dto';
import { AppError } from '@shared/exceptions/app-error';

@Injectable()
export class CreateEquipmentUseCase {
  constructor(private readonly equipmentRepository: EquipmentRepository) {}

  async execute(dto: CreateEquipmentDto): Promise<Equipment> {
    if (dto.serial_number) {
      const existing = await this.equipmentRepository.findAll();
      const serialExists = existing.some(eq => eq.serial_number === dto.serial_number);
      
      if (serialExists) {
        throw new AppError('Equipment with this serial number already exists', 400);
      }
    }

    const equipment = new Equipment({
      ...dto,
      next_maintenance_date: dto.last_maintenance_date 
        ? this.calculateNextMaintenance(dto.last_maintenance_date, dto.maintenance_interval)
        : undefined
    });

    equipment.generateQRCode();

    return this.equipmentRepository.save(equipment);
  }

  private calculateNextMaintenance(lastDate: Date, interval: number): Date {
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + interval);
    return nextDate;
  }
}
