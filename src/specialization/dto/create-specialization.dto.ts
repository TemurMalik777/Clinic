import { IsString } from "class-validator";

export class CreateSpecializationDto {

  @IsString()
  name: string;

  @IsString()
  description: string;
}
