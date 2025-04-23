import express from 'express';
import {createUser , getUser, getSpecificUser} from '../api/user_creation.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUser);
router.get('/:id', getSpecificUser);

export default router;

