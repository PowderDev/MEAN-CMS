import { Router } from 'express'
import passport from 'passport'
import { create, getAll } from '../controllers/order'
const router = Router()

router.route('/').get(passport.authenticate('jwt', { session: false }), getAll)
router.route('/').post(passport.authenticate('jwt', { session: false }), create)

export default router