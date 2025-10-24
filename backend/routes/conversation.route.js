import express from 'express';
import { getConversations, createConversation } from '../controllers/conversation.controller.js';

const router = express.Router();


router.post('/', createConversation);
router.get('/:userId', getConversations);



export default router;