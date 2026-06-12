import mongoose, { Schema, models } from 'mongoose';

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, default: '' },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Project = models.Project || mongoose.model('Project', projectSchema);

export default Project;
