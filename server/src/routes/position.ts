import { Router } from 'express'
import passport from 'passport'
import { create, getByCategoryId, remove, update } from '../controllers/position'
const router = Router()

router.route('/:categoryId').get(passport.authenticate('jwt', { session: false }), getByCategoryId)
router.route('/').post(create)
router.route('/:id').delete(remove)
router.route('/:id').put(update)

export default router