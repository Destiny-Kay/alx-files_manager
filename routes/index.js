// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * @function loadRoutes Loads routes on the main server app
 * @param {} server an express server instance
 */
export default function loadRoutes(server) {
  server.get('/status', AppController.getStatus);
  server.get('/stats', AppController.getStats);

  server.get('/connect', basicAuthenticate, AuthController.getConnect);
  server.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

  server.post('/users', UsersController.postNew);
  server.get('/users/me', xTokenAuthenticate, UsersController.getMe);

  server.post('/files', xTokenAuthenticate, FilesController.postUpload);
  server.get('/files/:id', xTokenAuthenticate, FilesController.getShow);
  server.get('/files', xTokenAuthenticate, FilesController.getIndex);
  server.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);
  server.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);
  server.get('/files/:id/data', FilesController.getFile);

  server.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });
  server.use(errorResponse);
}
