import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = Router()

// Path: /api/v1/auth/sign-up (POST)
authRouter.post('/sign-up', signUp)

authRouter.post('/sign-in', signIn)

authRouter.post('/sign-out', signOut)

export default authRouter

// Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGIxYmY0MTk2NWVkZTk3OTA5YWU4MzIiLCJpYXQiOjE3NTY0NzkyOTcsImV4cCI6MTc1NjczODQ5N30.DbE5krOnkg8HWUh8MQY98n1WaaGxdvZsS13MnkM8WV8
// id: 68b1bf41965ede97909ae832