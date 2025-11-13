import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsISO8601, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";
import { PresetDto } from ".";

export class SimulationPayloadDto {
  @ApiProperty({
    description: 'Número de días para simular',
    example: 30,
  })
  @IsInt()
  @IsNumber()
  days: number;

  @ApiProperty({
    description: 'Semilla para la generación aleatoria',
    example: 12345,
  })
  @IsInt()
  @IsNumber()
  seed: number;

  @ApiProperty({
    description: 'Fecha y hora de inicio en formato ISO 8601',
    example: '2025-11-03T21:00:00Z',
  })
  @IsISO8601()
  @IsString()
  start_time: string;

  @ApiProperty({
    description: 'ID del tanque',
    example: 101,
  })
  @IsInt()
  @IsNumber()
  tank_id: number;

  // --- Validación anidada ---
  @ApiProperty({
    description: 'Objeto de configuración del preset',
    type: () => PresetDto, // <-- Indica a Swagger el tipo
  })
  @IsDefined({ message: 'El campo preset es obligatorio.' }) // ✅ Debe existir
  @IsNotEmptyObject({}, { message: 'El campo preset no puede estar vacío.' }) // ✅ No vacío
  @ValidateNested() // ✅ Valida las propiedades internas
  @Type(() => PresetDto) // ✅ Convierte a clase
  preset: PresetDto;
}