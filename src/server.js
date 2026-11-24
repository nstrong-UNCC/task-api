import { fileURLToPath } from 'node:url';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';

import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';

// Initialize Express application
const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Load OpenAPI Documentation
let specs;

try {
  const openApiPath = fileURLToPath(
    new URL('../docs/openapi.yaml', import.meta.url)
  );

  specs = yaml.load(fs.readFileSync(openApiPath, 'utf8'));
} catch (error) {
  console.error('Failed to load OpenAPI specification:', error);
  throw error;
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/tasks', taskRoutes);

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    errors: ['Not found'],
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    errors: [err.status ? err.message : 'Internal Server Error'],
  });
});

export default app;

const isMainModule = process.argv[1] &&
  import.meta.url === new URL(`file://${process.argv[1]}`).href;

if (isMainModule) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
