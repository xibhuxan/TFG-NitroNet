import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserAgentLogDto {
  @IsInt()
  id_login: number;

  @IsOptional()
  @IsString()
  browser_name?: string;

  @IsOptional()
  @IsString()
  browser_version?: string;

  @IsOptional()
  @IsString()
  browser_major?: string;

  @IsOptional()
  @IsString()
  engine_name?: string;

  @IsOptional()
  @IsString()
  engine_version?: string;

  @IsOptional()
  @IsString()
  device_type?: string;

  @IsOptional()
  @IsString()
  device_vendor?: string;

  @IsOptional()
  @IsString()
  device_model?: string;

  @IsOptional()
  @IsString()
  os_name?: string;

  @IsOptional()
  @IsString()
  os_version?: string;

  @IsOptional()
  @IsString()
  user_agent_text?: string;
}
