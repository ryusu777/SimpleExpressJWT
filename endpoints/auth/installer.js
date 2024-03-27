import { Router } from 'express';
import { registerLogin } from './login.js';
import { registerRefreshToken } from './refresh-token.js';
const router = Router();

registerLogin(router);
registerRefreshToken(router);

export default router
