import { IsString, IsDate, IsEnum, IsInt, Min, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { EquipmentStatus } from '@shared/constants';
import { Type } from 'class-transformer';

export class CreateEquipmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  serial_number?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  @Type(() => Date)
  purchase_date: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  warranty_expiry?: Date;

  @IsEnum(EquipmentStatus)
  status: EquipmentStatus;

  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  purchase_value?: number;

  @IsInt()
  @Min(1)
  maintenance_interval: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  last_maintenance_date?: Date;
}
