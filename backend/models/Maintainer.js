// models/Maintainer.js
import mongoose from 'mongoose';

const maintainerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
});

export default mongoose.model('Maintainer', maintainerSchema);