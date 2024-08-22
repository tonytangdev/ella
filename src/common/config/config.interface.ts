export interface Config {
  nest: NestConfig;
  security: SecurityConfig;
}

export interface NestConfig {
  port: number;
}

export interface SecurityConfig {
  bcryptSaltOrRound: string | number;
  expiresIn: string;
  refreshIn: string;
}
