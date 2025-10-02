import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import studentsRouter from './routes/students.js';
import checkinsRouter from './routes/checkins.js';
import adminRouter from './routes/admin.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
// Allow credentialed CORS for frontend origin
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/admin', adminRouter);
app.use('/students', studentsRouter);
app.use('/', checkinsRouter); // exposes /checkin and /checkins

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
