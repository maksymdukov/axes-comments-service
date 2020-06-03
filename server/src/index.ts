import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middlewares/error-handler';

const isDev = process.env.NODE_ENV !== 'production';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/api', router);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const start = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI env is required');
  }
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(PORT, () => {
    console.log('Listening on port %s', PORT);
  });
};

start();
