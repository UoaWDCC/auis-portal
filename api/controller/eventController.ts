import { Request, Response } from "express"
import Events from "../db/sampleEvents"
import asyncHandler from "../middleware/asyncHandler"

const getEvents = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json(Events)
  }
)

const getEventById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const event = Events.find((event) => event._id === id)

    if (event) {
      res.json(event)
    } else {
      res.status(404)
      throw new Error("Event not found")
    }
  }
)

export { getEvents, getEventById }
