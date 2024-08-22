import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
};

export default (): Config => config;
