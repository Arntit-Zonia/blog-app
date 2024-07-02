import { Router } from "express";

import errorHandler from "../controllers/errorHandler";
import register from "../controllers/register";
import login from "../controllers/login";
import logout from "../controllers/logout";
import OAuth from "../controllers/oAuth";

const router: Router = Router();

router.post("/register", errorHandler(register));
router.post("/login", errorHandler(login));
router.post("/oath/google", errorHandler(OAuth));
router.post("/logout", errorHandler(logout));

export default router;
