import { Router } from 'express'
import passport from 'passport'
import { overview, analytics } from '../controllers/analytics'
const router = Router()

router.route('/overview').get(passport.authenticate('jwt', { session: false }), overview)
router.route('/').get(passport.authenticate('jwt', { session: false }), analytics)

export default router