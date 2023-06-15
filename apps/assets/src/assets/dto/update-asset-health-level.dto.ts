import { IsDefined, Max, Min } from 'class-validator';

export class UpdateAssetHealthLevelDto {
  @IsDefined()
  @Max(1)
  @Min(0)
  healthLevel: number;
}
