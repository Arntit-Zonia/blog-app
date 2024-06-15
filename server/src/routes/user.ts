import { Router } from "express";

import errorHandler from "../controllers/errorHandler";
import signup from "../controllers/signup";
import login from "../controllers/login";

const router: Router = Router();

router.post("/signup", errorHandler(signup));
router.post("/login", errorHandler(login));

export default router;
