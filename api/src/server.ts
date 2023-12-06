import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import config from './config';
import routes from './routes';
import logger from './helpers/logger';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'running',
  });
});

app.use('/auth', rateLimit(config.rateLimit.auth), routes.authRoutes);
app.use('/categories', routes.categoryRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('main try catch err! Message:', err);

  res.status(err.code || 500).json({
    message: err.message,
  });
});

process.on('unhandledRejection', (reason) => {
  logger.error('unhandledRejection! Reason:', reason);
  process.exit();
});

app.listen(config.APP_PORT, () => {
  logger.info('API Server is live');
});
