import { Logger, QueryRunner } from 'typeorm';

import {
  createLogger,
  Logger as WinstonLogger,
  transports,
  format,
} from 'winston';

export class CustomLogger implements Logger {
  private readonly queryLogger: WinstonLogger;
  private readonly schemaLogger: WinstonLogger;
  private readonly customFormat: any;

  constructor() {
    this.customFormat = format.printf(
      ({ message, level, label, timestamp }) =>
        `${timestamp} [${label}] ${level} ${message}`,
    );

    const options = (filename: string) => ({
      transports: new transports.File({ filename, level: 'debug' }),
      format: this.customFormat,
    });

    this.queryLogger = createLogger(options('query.log'));
    this.schemaLogger = createLogger(options('schema.log'));
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner,
  ): any {}

  logMigration(message: string, queryRunner?: QueryRunner): any {
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.queryLogger.log({
      level: 'debug',
      message: `${query} - ${ parameters ? JSON.stringify(parameters) : ''}`,
      timestamp: Date.now(),
      label: 'query',
    });
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {}

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {}

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    this.schemaLogger.log({
      level: 'debug',
      message,
      timestamp: Date.now(),
      label: 'schema',
    });
  }
}
