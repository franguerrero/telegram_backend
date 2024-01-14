import Question, { IQuestion } from '../models/Question';

class QuestionService {
  async addQuestion(text: string, options: string[], answer: number): Promise<IQuestion> {
    const newQuestion = new Question({ text, options, answer });
    return newQuestion.save();
  }

  async getQuestion(id: string): Promise<IQuestion | null> {
    return Question.findById(id);
  }

  async updateQuestion(id: string, updateData: Partial<IQuestion>): Promise<IQuestion | null> {
    return Question.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteQuestion(id: string): Promise<IQuestion | null> {
    return Question.findByIdAndDelete(id);
  }

  async listQuestions(): Promise<IQuestion[]> {
    return Question.find();
  }
}

export default new QuestionService();
