import { Router } from 'express';
import BotController from './BotController';
import logger from "../utils/logger";

const router = Router();

// Asegúrate de que las funciones controladoras sean llamadas con el contexto adecuado
// Si BotController es una clase y handleStartCommand es un método que usa 'this', necesitas asegurarte de mantener el contexto
const commandHandlers: { [command: string]: (message: any) => void } = {
  '/start': BotController.handleStartCommand.bind(BotController),
  '/newquestion': BotController.handleNewQuestionCommand.bind(BotController),
  '/canal': BotController.handleCanalCommand.bind(BotController),
  // Agrega más comandos y sus manejadores aquí
};

// El resto del código de tu router...


router.post('/message', (req, res) => {
  logger.info("Entrando en /message");
  const message = req.body.message;

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
