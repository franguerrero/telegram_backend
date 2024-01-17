import { Router } from 'express';
import BotController from './BotController';
import logger from "../utils/logger";

const router = Router();

const commandHandlers: { [key: string]: (message: any) => Promise<void> | undefined } = {
  '/start': BotController.handleStartCommand,
  '/newquestion': BotController.handleNewQuestionCommand,
  '/canal': BotController.handleCanalCommand,
  // Agrega más comandos y sus manejadores aquí
};

router.post('/message', (req, res) => {
  logger.info("Entrando en /message");
  const message = req.body.message; // Asegúrate de que 'message' se extrae correctamente del cuerpo de la solicitud

  if (message && typeof message.text === 'string') {
    logger.info("ID del chat:", message.chat.id);

    const command = message.text.split(' ')[0];
    const handler = commandHandlers[command];

    if (handler) {
      logger.info(`Entrando en ${command}`);
      handler(message);
    } else {
      BotController.handleAnswer(message);
    }
  } else {
    logger.info("No se encontró mensaje o texto en la actualización");
  }

  res.status(200).send('OK');
});

export default router;
