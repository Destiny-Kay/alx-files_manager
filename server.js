import express from 'express';
import loadRoutes from './routes';
import injectMiddlewares from './libs/middlewares';

// Server config
const server = express();
injectMiddlewares(server);
loadRoutes(server);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
