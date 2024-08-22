import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  security: {
    expiresIn: process.env.EXPIRES_IN ?? '1d',
    refreshIn: process.env.REFRESHES_IN ?? '7d',
    bcryptSaltOrRound: parseInt(process.env.BCRYPT_SALT_OR_ROUND ?? '10'),
  },
  swagger: {
    enabled: true,
    title: 'Ella',
    description: 'Ella REST API',
    version: '0.0.1',
    path: 'api',
  },
};

export default (): Config => config;
