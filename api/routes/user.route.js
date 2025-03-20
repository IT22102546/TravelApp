import express  from "express";
import { signout, test } from "../controllers/user.controller.js";


const router = express.Router();

router.get('/test',test);
router.get('/signout',signout);



export default router;