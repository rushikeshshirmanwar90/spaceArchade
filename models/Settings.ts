import mongoose, { Schema, models } from 'mongoose';

const settingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const Settings = models.Settings || mongoose.model('Settings', settingsSchema);

export default Settings;
