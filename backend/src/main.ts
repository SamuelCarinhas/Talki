import express, { Application } from 'express';
import dotenv from 'dotenv';

import logger from './utils/logger.util';

//For env File
dotenv.config();

const app: Application = express();
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 8000;

app.listen(port, host, () => {
    logger.info(`Server live at https://${host}:${port}`);
});