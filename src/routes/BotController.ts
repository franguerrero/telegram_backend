import TelegramBot, { Message } from 'node-telegram-bot-api';
import QuizService from '../services/QuizService';
import QuestionService from '../services/QuestionService';
import logger from "../utils/logger";


class BotController {

  private bot: TelegramBot;

  constructor() {
    
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error("TELEGRAM_BOT_TOKEN is not defined in .env file");
    }
  this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
  logger.info("TOKEN Telegram set: "+process.env.TELEGRAM_BOT_TOKEN);
  

    // ... resto del código ...
  }

  async handleCanalCommand(message: Message) {
    // Aquí puedes definir el mensaje de bienvenida o las instrucciones iniciales
    const welcomeMessage = "Bienvenido al bot. Envía /newquestion para obtener una pregunta.";

    try {

      if (!process.env.CANALADMINISTRATIVOAND) {
        throw new Error("CANALADMINISTRATIVOAND is not defined in .env file");
      }
     
      const question = await QuizService.getRandomQuestion();
      if (question) {
        const questionText = question.text;
        const options = question.options; // Asegúrate de que esto es un array de opciones
        const correctOptionIndex = question.answer; // El índice de la opción correcta
  
        await this.bot.sendPoll(message.chat.id, questionText, options, {
          is_anonymous: true,
          type: 'quiz',
          correct_option_id: correctOptionIndex,
          explanation: 'question.explanation', // Explicación que se mostrará después de responder
          explanation_parse_mode: 'Markdown' // O 'HTML', si tu explicación tiene formato
        });
      } else {
        await this.bot.sendMessage(process.env.CANALADMINISTRATIVOAND, "Lo siento, no tengo preguntas disponibles en este momento.");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje de bienvenida:", error);
    }
  }

  async handleStartCommand(message: Message) {
    // Aquí puedes definir el mensaje de bienvenida o las instrucciones iniciales
    const welcomeMessage = "Bienvenido al bot. Envía /newquestion para obtener una pregunta.";

    try {
      // Enviar el mensaje de bienvenida al usuario
      await this.bot.sendMessage(message.chat.id, welcomeMessage);
    } catch (error) {
      console.error("Error al enviar el mensaje de bienvenida:", error);
    }
  }

  
  async handleNewQuestionCommand(message: Message) {
    try {
      const question = await QuizService.getRandomQuestion();
      if (question) {
        const questionText = question.text;
        const options = question.options; // Asegúrate de que esto es un array de opciones
        const correctOptionIndex = question.answer; // El índice de la opción correcta
  
        await this.bot.sendPoll(message.chat.id, questionText, options, {
          is_anonymous: true,
          type: 'quiz',
          correct_option_id: correctOptionIndex,
          explanation: 'question.explanation', // Explicación que se mostrará después de responder
          explanation_parse_mode: 'Markdown' // O 'HTML', si tu explicación tiene formato
        });
      } else {
        await this.bot.sendMessage(message.chat.id, "Lo siento, no tengo preguntas disponibles en este momento.");
      }
    } catch (error) {
      console.error(error);
      await this.bot.sendMessage(message.chat.id, "Ocurrió un error al obtener una pregunta.");
    }
  }

  
  
  /*
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
  */
  

  async handleAnswer(message: Message) {
    // Lógica para manejar la respuesta del usuario
    this.bot.on('poll_answer', async (answer) => {
      // Aquí puedes manejar la respuesta de la encuesta
      // Por ejemplo, verificar si la respuesta es correcta y actualizar la puntuación del usuario
    });
    
  }

  // Aquí puedes agregar más métodos para otros comandos o acciones
}

export default new BotController();
