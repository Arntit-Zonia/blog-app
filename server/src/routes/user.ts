import { Router } from "express";

import errorHandler from "../controllers/errorHandler";
import register from "../controllers/register";
import login from "../controllers/login";

const router: Router = Router();

router.post("/register", errorHandler(register));
router.post("/login", errorHandler(login));

export default router;
