import express from 'express';
import { createNewEvent, getStagingEvents, getEventInformation, updateEventInformation, getMembers} from "../controller/adminController";
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

router.post('/new-event', createNewEvent);
router.get('/staging', getStagingEvents);
router.get('/event-information', getEventInformation);
router.put('/event-information/:eventId', updateEventInformation);
router.get('/members', getMembers);

export default router;
