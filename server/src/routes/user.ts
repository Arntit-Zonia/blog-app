import { Router } from "express";

import errorHandler from "../controllers/errorHandler";
import signup from "../controllers/signup";

const router: Router = Router();

router.post("/signup", errorHandler(signup));

export default router;
