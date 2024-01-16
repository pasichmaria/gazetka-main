import { Router } from 'express'
import passport from 'passport'

import { papersController } from './PapersController'

export const papersRouter = Router()

papersRouter
  .route('/')
  .get(papersController.list)
  .post(passport.authenticate('jwt', { session: false }), papersController.create)

papersRouter.route('/groups').get(papersController.groups)
papersRouter.route('/publishers').get(papersController.publishers)

papersRouter
  .route('/:id')
  .get(papersController.get)
  .put(passport.authenticate('jwt', { session: false }), papersController.update)
  .delete(passport.authenticate('jwt', { session: false }), papersController.remove)
