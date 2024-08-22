export interface Config {
  nest: NestConfig;
  security: SecurityConfig;
  swagger: SwaggerConfig;
}

export interface NestConfig {
  port: number;
}

export interface SecurityConfig {
  bcryptSaltOrRound: string | number;
  expiresIn: string;
  refreshIn: string;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}
