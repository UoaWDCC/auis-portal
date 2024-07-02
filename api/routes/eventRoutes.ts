import express from "express"
import { getEventById, getEvents } from "../controller/eventController"
//import products from '../data/products.js' // DONT FORGET THE .JS in backend files

const router = express.Router()

router.route("/").get(getEvents)
router.route("/:id").get(getEventById)

export default router
