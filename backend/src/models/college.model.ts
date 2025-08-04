import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ICollege extends Document {
  name: string;
  state: string;
  city: string;
  yearOfEstablishment: number;
  // We will add more fields like fees, bond, quota, etc., later.
}

// 2. Create a Schema corresponding to the document interface.
const collegeSchema = new Schema<ICollege>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  yearOfEstablishment: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true // This will add `createdAt` and `updatedAt` fields
});

// 3. Create a Model.
export const College = model<ICollege>('College', collegeSchema);