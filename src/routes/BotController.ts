import TelegramBot, { Message } from 'node-telegram-bot-api';
import QuizService from '../services/QuizService';
import QuestionService from '../services/QuestionService';

class BotController {
  async handleStartCommand(message: Message) {
    // Lógica para el comando /start
  }

  async handleNewQuestionCommand(message: Message) {
    // Lógica para obtener una nueva pregunta
    const question = await QuizService.getRandomQuestion();
    // Enviar la pregunta al usuario
  }

  async handleAnswer(message: Message) {
    // Lógica para manejar la respuesta del usuario
  }

  // Aquí puedes agregar más métodos para otros comandos o acciones
}

export default new BotController();
