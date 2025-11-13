// src/preset.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsNumberOptions } from 'class-validator';

// Opciones para permitir números con decimales
const numberOptions: IsNumberOptions = {
  allowNaN: false,
  allowInfinity: false,
};

export class PresetDto {
  @ApiProperty({ example: 25.5 })
  @IsNumber(numberOptions)
  T_base: number;

  @ApiProperty({ example: 1.5 })
  @IsNumber(numberOptions)
  A_T: number;

  @ApiProperty({ example: 0.1 })
  @IsNumber(numberOptions)
  sigma_T: number;

  @ApiProperty({ example: 0.05 })
  @IsNumber(numberOptions)
  drift_T_per_day: number;

  @ApiProperty({ example: 30 })
  @IsNumber(numberOptions)
  S_base: number;

  @ApiProperty({ example: -0.001 })
  @IsNumber(numberOptions)
  drift_S_per_min: number;

  @ApiProperty({ example: 0.05 })
  @IsNumber(numberOptions)
  sigma_S: number;

  @ApiProperty({ example: 0.5 })
  @IsNumber(numberOptions)
  waterchange_reduction: number;

  @ApiProperty({ example: 7 })
  @IsNumber(numberOptions)
  waterchange_frequency_days: number;

  @ApiProperty({ example: 0.02 })
  @IsNumber(numberOptions)
  k_evap_per_deg: number;

  @ApiProperty({ example: 8.0 })
  @IsNumber(numberOptions)
  O2_base: number;

  @ApiProperty({ example: 0.5 })
  @IsNumber(numberOptions)
  A_O2: number;

  @ApiProperty({ example: 0.2 })
  @IsNumber(numberOptions)
  sigma_O2: number;

  @ApiProperty({ example: -0.1 })
  @IsNumber(numberOptions)
  k_T_O2: number;

  @ApiProperty({ example: 0.1 })
  @IsNumber(numberOptions)
  O2_event_prob_per_day: number;

  @ApiProperty({ example: 360 })
  @IsNumber(numberOptions)
  hypoxia_min: number;

  @ApiProperty({ example: 720 })
  @IsNumber(numberOptions)
  hypoxia_max: number;

  @ApiProperty({ example: 2.0 })
  @IsNumber(numberOptions)
  O2_floor: number;

  @ApiProperty({ example: 8.2 })
  @IsNumber(numberOptions)
  pH_base: number;

  @ApiProperty({ example: 0.2 })
  @IsNumber(numberOptions)
  A_pH: number;

  @ApiProperty({ example: 0.05 })
  @IsNumber(numberOptions)
  sigma_pH: number;

  @ApiProperty({ example: -0.01 })
  @IsNumber(numberOptions)
  k_feed_acid: number;

  @ApiProperty({ example: 0.05 })
  @IsNumber(numberOptions)
  k_O2_pH: number;

  @ApiProperty({ example: 0.5 })
  @IsNumber(numberOptions)
  pH_recovery_on_waterchange: number;

  @ApiProperty({ example: 5.0 })
  @IsNumber(numberOptions)
  O2_pH_threshold: number;

  @ApiProperty({ example: 0.1 })
  @IsNumber(numberOptions)
  pH_smoothing_alpha: number;

  @ApiProperty({ example: 6.5 })
  @IsNumber(numberOptions)
  pH_min_limit: number;

  @ApiProperty({ example: 9.0 })
  @IsNumber(numberOptions)
  pH_max_limit: number;

  @ApiProperty({ example: 0.5 })
  @IsNumber(numberOptions)
  Feed_base: number;

  @ApiProperty({ example: 2.5 })
  @IsNumber(numberOptions)
  feed_spike_multiplier: number;

  @ApiProperty({ example: 0.3 })
  @IsNumber(numberOptions)
  feed_spike_prob_per_day: number;

  @ApiProperty({ example: [0, 630] })
  @IsArray()
  @IsNumber({}, { each: true })
  feed_spike_duration_min: number[];

  @ApiProperty({ example: 0.8 })
  @IsNumber(numberOptions)
  feed_noise_min_factor: number;

  @ApiProperty({ example: 1.2 })
  @IsNumber(numberOptions)
  feed_noise_max_factor: number;

  @ApiProperty({ example: 0.01 })
  @IsNumber(numberOptions)
  feed_min_kg_min: number;

  @ApiProperty({ example: 500 })
  @IsNumber(numberOptions)
  V: number;

  @ApiProperty({ example: 1000 })
  @IsNumber(numberOptions)
  initial_N: number;

  @ApiProperty({ example: 0.01 })
  @IsNumber(numberOptions)
  stocking_prob_per_day: number;

  @ApiProperty({ example: 100 })
  @IsNumber(numberOptions)
  stocking_min: number;

  @ApiProperty({ example: 500 })
  @IsNumber(numberOptions)
  stocking_max: number;

  @ApiProperty({ example: 0.1 })
  @IsNumber(numberOptions)
  alpha: number;

  @ApiProperty({ example: 0.2 })
  @IsNumber(numberOptions)
  beta: number;

  @ApiProperty({ example: 0.3 })
  @IsNumber(numberOptions)
  gamma: number;

  @ApiProperty({ example: 0.05 })
  @IsNumber(numberOptions)
  weight_salinity: number;

  @ApiProperty({ example: 0.4 })
  @IsNumber(numberOptions)
  kappa: number;

  @ApiProperty({ example: 0.5 })
  @IsNumber(numberOptions)
  shock_factor: number;

  @ApiProperty({ example: 3.0 })
  @IsNumber(numberOptions)
  O2_crit_for_shock: number;

  @ApiProperty({ example: 15 })
  @IsNumber(numberOptions)
  density_crit_for_shock: number;

  @ApiProperty({ example: 0.1 })
  @IsNumber(numberOptions)
  max_mortality_rate: number;

  @ApiProperty({ example: 28 })
  @IsNumber(numberOptions)
  T_opt: number;

  @ApiProperty({ example: 4.0 })
  @IsNumber(numberOptions)
  O2_crit: number;

  @ApiProperty({ example: 10 })
  @IsNumber(numberOptions)
  rho_opt: number;

  @ApiProperty({ example: 25 })
  @IsNumber(numberOptions)
  salinity_optimal_min: number;

  @ApiProperty({ example: 35 })
  @IsNumber(numberOptions)
  salinity_optimal_max: number;

  @ApiProperty({ example: 15 })
  @IsNumber(numberOptions)
  salinity_lethal_low: number;

  @ApiProperty({ example: 45 })
  @IsNumber(numberOptions)
  salinity_lethal_high: number;

  @ApiProperty({ example: 30 })
  @IsNumber(numberOptions)
  sanity_temp_crit_for_ph: number;

  @ApiProperty({ example: 7.0 })
  @IsNumber(numberOptions)
  sanity_ph_min_at_crit_temp: number;

  @ApiProperty({ example: 0.1 })
  @IsNumber(numberOptions)
  sanity_ph_fix_noise_min: number;

  @ApiProperty({ example: 0.3 })
  @IsNumber(numberOptions)
  sanity_ph_fix_noise_max: number;

  @ApiProperty({ example: 3.5 })
  @IsNumber(numberOptions)
  sanity_o2_crit_for_ph: number;

  @ApiProperty({ example: 8.5 })
  @IsNumber(numberOptions)
  sanity_ph_max_at_crit_o2: number;

  @ApiProperty({ example: 12 })
  @IsNumber(numberOptions)
  sanity_density_crit_for_o2: number;

  @ApiProperty({ example: 9.0 })
  @IsNumber(numberOptions)
  sanity_o2_max_at_crit_density: number;

  @ApiProperty({ example: 0.1 })
  @IsNumber(numberOptions)
  sanity_o2_fix_noise_min: number;

  @ApiProperty({ example: 0.3 })
  @IsNumber(numberOptions)
  sanity_o2_fix_noise_max: number;

  @ApiProperty({ example: 40 })
  @IsNumber(numberOptions)
  sanity_salinity_max_with_wc: number;

  @ApiProperty({ example: 0.1 })
  @IsNumber(numberOptions)
  sanity_sal_fix_noise_min: number;

  @ApiProperty({ example: 0.3 })
  @IsNumber(numberOptions)
  sanity_sal_fix_noise_max: number;

  @ApiProperty({ example: 0.2 })
  @IsNumber(numberOptions)
  sanity_max_mortality_ratio: number;

  @ApiProperty({ example: 5.0 })
  @IsNumber(numberOptions)
  initial_weight_g: number;

  @ApiProperty({
    example: [
      [1.0, 0.15],
      [5.0, 0.08],
    ],
  })
  @IsArray()
  @IsArray({ each: true })
  feed_table: Array<number[]>;

  @ApiProperty({ example: 20.0 })
  @IsNumber(numberOptions)
  target_weight_g: number;

  @ApiProperty({ example: 1.5 })
  @IsNumber(numberOptions)
  fcr: number;

  @ApiProperty({ example: 20 })
  @IsNumber(numberOptions)
  temp_min_growth: number;

  @ApiProperty({ example: 28 })
  @IsNumber(numberOptions)
  temp_optimal_growth: number;

  @ApiProperty({ example: 32 })
  @IsNumber(numberOptions)
  temp_max_growth: number;
}
