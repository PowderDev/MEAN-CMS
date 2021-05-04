import { Router } from 'express'
import passport from 'passport';
import upload from '../middleware/upload'
import { create, getAll, getById, remove, update } from './../controllers/category';
const router = Router()

router.route('/').get(passport.authenticate('jwt', { session: false }), getAll)
router.route('/:id').get(getById)
router.route('/:id').delete(remove)
router.route('/').post(passport.authenticate('jwt', { session: false }), upload.single('image'), create)
router.route('/:id').put(passport.authenticate('jwt', { session: false }), upload.single('image'), update)

export default router