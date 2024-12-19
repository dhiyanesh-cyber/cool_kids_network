// backend/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Cool Kid', 'Cooler Kid', 'Coolest Kid'], 
    default: 'Cool Kid' 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);