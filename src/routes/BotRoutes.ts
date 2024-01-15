import { Router } from 'express';
import BotController from './BotController';
import logger from "../utils/logger";

const router = Router();

router.post('/message', (req, res) => {
  logger.info("Entrando en /message");
  const message = req.body.message;

  // Verifica si el mensaje y el texto existen
  if (message && typeof message.text === 'string') {
    // Aquí puedes determinar qué acción tomar basándote en el mensaje
    if (message.text.startsWith('/start')) {
      BotController.handleStartCommand(message);
    } else if (message.text.startsWith('/newquestion')) {
      BotController.handleNewQuestionCommand(message);
    } else {
      BotController.handleAnswer(message);
    }
  } else {
    // Manejar casos donde no hay mensaje o texto
    logger.info("No se encontró mensaje o texto en la actualización");
  }

  res.status(200).send('OK');
});




export default router;
