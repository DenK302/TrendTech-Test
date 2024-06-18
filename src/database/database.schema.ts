import { Schema } from 'mongoose';

export const DocumentSchema = new Schema({
  name: { type: String, required: true },
});