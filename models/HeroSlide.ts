import mongoose, { Schema, models } from 'mongoose';

const heroSlideSchema = new Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const HeroSlide = models.HeroSlide || mongoose.model('HeroSlide', heroSlideSchema);

export default HeroSlide;
