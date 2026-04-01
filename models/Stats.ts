import mongoose, { Schema, models } from 'mongoose';

const statsSchema = new Schema(
  {
    projectsCompleted: { type: Number, required: true, default: 150 },
    yearsExperience: { type: Number, required: true, default: 25 },
    teamMembers: { type: Number, required: true, default: 45 },
  },
  { timestamps: true }
);

const Stats = models.Stats || mongoose.model('Stats', statsSchema);

export default Stats;
