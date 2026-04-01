import mongoose, { Schema, models } from 'mongoose';

const architectSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
  },
  { timestamps: true }
);

const Architect = models.Architect || mongoose.model('Architect', architectSchema);

export default Architect;
