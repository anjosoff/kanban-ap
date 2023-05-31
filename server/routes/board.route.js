import express from 'express'
import {body} from 'express-validator'
import {tokenAuth} from "../middlewares/token.middleware.js"
import {validate} from "../utils/validator.js"
import {boardGetAll, boardCreate} from '../controllers/board.controller.js'

const router = express.Router()

router.post(
    '/',
    tokenAuth,
    boardCreate
)
router.get(
    '/',
    tokenAuth,
    boardGetAll
)

export default router;