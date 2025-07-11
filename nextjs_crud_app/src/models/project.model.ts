import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  projectId: string;
  name: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  projectCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    projectId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    projectCode: { type: String },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

// Avoid re-defining model on hot-reloads
export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);
