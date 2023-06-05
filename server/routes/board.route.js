import express from 'express'
import {param} from 'express-validator'
import {tokenAuth} from "../middlewares/token.middleware.js"
import {validate, isObjectId} from "../utils/validator.js"
import {boardGetAll, boardCreate, updatePosition, getOne} from '../controllers/board.controller.js'

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

router.put(
    '',
    tokenAuth,
    updatePosition
)

router.get(
    '/:boardId',
    param('boardId').custom(value => {
        if(!isObjectId(value)){
    
            return Promise.reject('Invalid id')
            
        }else return Promise.resolve()
    }),
    tokenAuth,
    validate,
    getOne,
    )

export default router;