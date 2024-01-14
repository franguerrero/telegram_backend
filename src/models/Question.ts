import mongoose, { Schema, Document } from 'mongoose';

// Interfaz que representa una pregunta
export interface IQuestion extends Document {
  text: string;
  options: string[];
  answer: number; // índice de la opción correcta
}

// Esquema de Mongoose para una pregunta
const QuestionSchema: Schema = new Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: Number, required: true },
});

// Crear el modelo de Mongoose
export default mongoose.model<IQuestion>('Question', QuestionSchema);
