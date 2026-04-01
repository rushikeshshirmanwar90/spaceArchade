import mongoose, { Schema, models } from 'mongoose';

const collectionImageSchema = new Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CollectionImage = models.CollectionImage || mongoose.model('CollectionImage', collectionImageSchema);

export default CollectionImage;
