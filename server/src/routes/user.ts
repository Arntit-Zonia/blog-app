import { Router } from "express";

import errorHandler from "../controllers/errorHandler";
import register from "../controllers/register";
import login from "../controllers/login";
import logout from "../controllers/logout";
import OAuthLogin from "../controllers/oAuthLogin";

const router: Router = Router();

router.post("/register", errorHandler(register));
router.post("/login", errorHandler(login));
router.post("/oath/login", errorHandler(OAuthLogin));
router.post("/user/logout", errorHandler(logout));

export default router;
