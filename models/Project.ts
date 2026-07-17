import mongoose, { Schema, models } from 'mongoose';

const projectSchema = new Schema(
  {
    title: { type: String, default: '' },
    location: { type: String, default: '' },
    category: { type: String, default: '' },
    image: { type: String, default: '' },
    images: { type: [String], default: [] },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

const Project = models.Project || mongoose.model('Project', projectSchema);

export default Project;
