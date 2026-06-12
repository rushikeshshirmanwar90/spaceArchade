import mongoose, { Schema, models } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

if (process.env.NODE_ENV !== 'production') {
  delete (mongoose.models as any)['Category'];
}

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
