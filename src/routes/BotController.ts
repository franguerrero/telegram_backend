import TelegramBot, { Message } from 'node-telegram-bot-api';
import QuizService from '../services/QuizService';
import QuestionService from '../services/QuestionService';


class BotController {

  private bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot('6917600485:AAGZ_gM23143lRD5ygHOA5ruYWKXBqDcLKg');
    // ... resto del código ...
  }


  async handleStartCommand(message: Message) {
    // Lógica para el comando /start
  }

  

  async handleNewQuestionCommand(message: Message) {
    try {
      const question = await QuizService.getRandomQuestion();
      if (question) {
        // Formatear la pregunta y las opciones
        const questionText = question.text;
        const options = question.options.map((option, index) => `${index + 1}. ${option}`).join('\n');
  
        // Enviar la pregunta al usuario
        await this.bot.sendMessage(message.chat.id, `${questionText}\n\nOpciones:\n${options}`);
      } else {
        // Enviar un mensaje si no se encontró ninguna pregunta
        await this.bot.sendMessage(message.chat.id, "Lo siento, no tengo preguntas disponibles en este momento.");
      }
    } catch (error) {
      console.error(error);
      await this.bot.sendMessage(message.chat.id, "Ocurrió un error al obtener una pregunta.");
    }
  }
  

  async handleAnswer(message: Message) {
    // Lógica para manejar la respuesta del usuario
  }

  // Aquí puedes agregar más métodos para otros comandos o acciones
}

export default new BotController();
