import { v4 as uuidv4 } from 'uuid';
import Session from '../models/Session.js';

export const createSession = async (req, res) => {
  try {
    const sessionId = uuidv4();
    const session =await Session.create({sessionId});
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};