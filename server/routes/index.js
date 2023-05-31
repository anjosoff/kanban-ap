import express from 'express'
import userRoute from './user.route.js'
import boardRoute from './board.route.js'
const router = express.Router()

router.use('/users', userRoute)

router.use('/boards', boardRoute)

export default router;