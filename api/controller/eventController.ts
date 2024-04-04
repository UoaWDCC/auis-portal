import { Request, Response } from 'express';
import Events from '../db/sampleEvents'; //

const getEvents = async (req: Request, res: Response): Promise<void> => {
    res.json(Events);
};

const getEventById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const product = Events.find((event) => event._id === id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export { getEvents, getEventById };
