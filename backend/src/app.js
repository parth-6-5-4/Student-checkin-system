import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import studentsRouter from './routes/students.js';
import checkinsRouter from './routes/checkins.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/students', studentsRouter);
app.use('/', checkinsRouter); // exposes /checkin and /checkins

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
