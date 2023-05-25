import express from 'express'
import {body} from 'express-validator'
import { userRegister, userSignIn } from '../controllers/user.controller.js'
import {tokenAuth} from "../middlewares/token.middleware.js"
import {validate} from "../utils/validator.js"

const router = express.Router()

router.post(
    '/register',
    body("username")
    .exists().withMessage("Username is required")
    .isLength({min:6}).withMessage("Username must be at least 6 characters")
    .isLength({max:15}).withMessage("Username must have maximum 15 characters"),
    body("password")
    .exists().withMessage("Password is required")
    .isLength({min:6}).withMessage("Password must be at least 6 characters"),
    validate,
    userRegister
)
router.post(
    '/login',
    body("username")
    .exists().withMessage("Username is required")
    .isLength({min:6}).withMessage("Username must be at least 6 characters"),
    body("password")
    .exists().withMessage("Password is required")
    .isLength({min:6}).withMessage("Password must be at least 6 characters"),
    validate,
    userSignIn
)

router.get(
    "/check-token",
    tokenAuth,
    (req, res) => res.status(200).json({
      username: req.user.username
    })
  );
 
export default router;