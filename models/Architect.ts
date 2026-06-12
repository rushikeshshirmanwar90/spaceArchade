import mongoose, { Schema, models } from 'mongoose';

const architectSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, default: '' },
    bio: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Clear cached model in dev so schema changes take effect on hot reload
if (process.env.NODE_ENV !== 'production') {
  delete (mongoose.models as any)['Architect'];
}

const Architect = mongoose.models.Architect || mongoose.model('Architect', architectSchema);

export default Architect;
