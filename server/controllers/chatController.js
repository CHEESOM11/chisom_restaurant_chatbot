import { getBotResponse } from "../services/chatbotService.js";

export const chatBot = async (req, res) => {
  const { message, state } = req.body;

  const botResponse = getBotResponse(message, state);

  res.json(botResponse);
};