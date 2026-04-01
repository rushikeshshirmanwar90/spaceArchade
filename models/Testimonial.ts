import mongoose, { Schema, models } from 'mongoose';

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Testimonial = models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
