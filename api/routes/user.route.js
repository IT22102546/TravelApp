import express  from "express";
import {  getUser,signout, test } from "../controllers/user.controller.js";


const router = express.Router();

router.get('/test',test);
router.get('/signout',signout);
router.get('/:userId', getUser);


export default router;