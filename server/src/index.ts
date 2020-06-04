import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', '..', 'client', 'build');
  // Serve any static files
  app.use(express.static(buildPath));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}
app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 3001;

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
