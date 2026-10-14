import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    codeName: { type: String, required: true },
    category: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    powertrain: [String], // e.g. ["React 19", "Node.js", "Express", "MongoDB", "WebSockets"]
    specs: {
      acceleration: String, // e.g. "0-60 in 1.9s"
      throughput: String,   // e.g. "120k req/s"
      efficiency: String,   // e.g. "99.98% SLA"
      latency: String       // e.g. "18ms p99"
    },
    image: { type: String, required: true },
    demoUrl: { type: String, default: '#' },
    githubUrl: { type: String, default: '#' },
    featured: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
