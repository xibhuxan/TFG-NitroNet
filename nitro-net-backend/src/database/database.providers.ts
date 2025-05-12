import * as mariadb from 'mariadb';
import { Provider } from '@nestjs/common';

export const DatabaseProviders: Provider[] = [
  {
    provide: 'NITRONET_DB',
    useValue: mariadb.createPool({
      host: process.env.NITRONET_DB_HOST,
      user: process.env.NITRONET_DB_USER,
      password: process.env.NITRONET_DB_PASS,
      database: process.env.NITRONET_DB_DATABASE,
      port: Number(process.env.NITRONET_DB_PORT),
      connectionLimit: 5,
    }),
  },
  // Si hay más bases de datos, se ponen aquí
];
