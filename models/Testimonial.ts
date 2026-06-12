import mongoose, { Schema, models } from 'mongoose';

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Testimonial = models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
