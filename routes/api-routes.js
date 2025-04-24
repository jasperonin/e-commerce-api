import express from 'express';
import { generateAPiKey } from '../middleware/generate-api-key.js';

const router = express.Router();

router.get('/generate', (req, res) => {
    const { role } = req.query;

    if(!role) {
        res.status(400).json({ message: `Role is required` });
    }
    const token = generateAPiKey(role);

    res.json({ token });
}); 

export default router;