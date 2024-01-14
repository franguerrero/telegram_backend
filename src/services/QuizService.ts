import Question, { IQuestion } from '../models/Question';

class QuizService {
  async getRandomQuestion(): Promise<IQuestion | null> {
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    return Question.findOne().skip(random);
  }

  async checkAnswer(questionId: string, optionIndex: number): Promise<boolean> {
    const question = await Question.findById(questionId) as IQuestion;
    if (!question) {
      throw new Error('Question not found');
    }
    return question.answer === optionIndex;
  }
}

export default new QuizService();
