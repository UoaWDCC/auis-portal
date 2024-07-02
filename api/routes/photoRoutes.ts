import express from "express"
import {
  getPhotoById,
  uploadPhoto,
  deletePhoto
} from "../controller/photoController"
import { protect, authorize } from "../middleware/authMiddleware" // Assuming you have authentication and optional authorization middleware

const router = express.Router()

router.get("/:id", getPhotoById)
router.post("/", protect, authorize("admin"), uploadPhoto)
router.delete("/:id", protect, authorize("admin"), deletePhoto)
export default router
