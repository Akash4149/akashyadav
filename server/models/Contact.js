import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    projectType: { 
      type: String, 
      enum: ['Cyber Web Application', 'Full-Stack MERN Architecture', 'Cloud / Microservices API', 'AI / Autonomous Integration', 'Consulting & Design Review'],
      default: 'Full-Stack MERN Architecture'
    },
    specsLevel: {
      type: String,
      enum: ['Standard Fleet', 'Plaid Performance', 'Ludicrous Overdrive'],
      default: 'Plaid Performance'
    },
    message: { type: String, required: true },
    transmissionId: { type: String, required: true, unique: true },
    emailDispatched: { type: Boolean, default: false },
    smsDispatched: { type: Boolean, default: false },
    notificationDetails: [String],
    status: { type: String, default: 'TRANSMITTED_PENDING_REVIEW' }
  },
  { timestamps: true }
);

export const Contact = mongoose.model('Contact', contactSchema);
