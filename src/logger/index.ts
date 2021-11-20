import { createLogger, format, transports } from 'winston';

const { timestamp, combine, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message} `;
});

export const apiLogger = createLogger({
  format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customFormat),
  transports: [new transports.Console()]
});
