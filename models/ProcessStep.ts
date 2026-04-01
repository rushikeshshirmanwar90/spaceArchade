import mongoose, { Schema, models } from 'mongoose';

const processStepSchema = new Schema(
  {
    step: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const ProcessStep = models.ProcessStep || mongoose.model('ProcessStep', processStepSchema);

export default ProcessStep;
