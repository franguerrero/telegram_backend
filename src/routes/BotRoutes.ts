import { Router } from 'express';
import BotController from './BotController';

const router = Router();

router.post('/message', (req, res) => {
  const message = req.body.message;
  
  // Aquí puedes determinar qué acción tomar basándote en el mensaje
  if (message.text.startsWith('/start')) {
    BotController.handleStartCommand(message);
  } else if (message.text.startsWith('/newquestion')) {
    BotController.handleNewQuestionCommand(message);
  } else {
    BotController.handleAnswer(message);
  }

  res.status(200).send('OK');
});

export default router;
