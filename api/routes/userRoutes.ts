import { Router } from "express"
import { getAllUsers } from "../controller/userController"

const router = Router()

router.get("/users", getAllUsers)
export default router
