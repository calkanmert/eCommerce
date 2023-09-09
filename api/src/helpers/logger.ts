import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.metadata(),
        format.printf(({ level, message, metadata }) => `${level}: ${message} ${metadata ? JSON.stringify(metadata) : ''}`),
      ),
    }),
  ],
});

export default logger;
