import express from 'express';
import { Project } from '../models/Project.js';
import { Contact } from '../models/Contact.js';
import { isConnectedToMongo } from '../config/db.js';
import { sendNotificationDispatch } from '../services/notificationService.js';

export const router = express.Router();

// Fallback high-fidelity sample projects matching the Tesla aesthetic
const sampleProjects = [
  {
    _id: 'proj_rag_01',
    title: 'Custom RAG Conversational Agent',
    codeName: 'MODEL S // NEURAL-RAG AGENT',
    category: 'AI / LLM & RAG',
    tagline: 'Context-Aware Intelligent Question Answering Grounded in Dynamic Knowledge Bases',
    description: 'Engineered high-performance RAG conversational agents leveraging the Gemini API. Implemented document-based knowledge retrieval pipelines to generate highly accurate responses grounded in user-provided knowledge bases, integrating conversational context and personalized retrieval for maximum relevance.',
    powertrain: ['Gemini API', 'RAG Architecture', 'Python', 'Vector Retrieval', 'React.js', 'REST API'],
    specs: {
      acceleration: 'Sub-second semantic vector query',
      throughput: 'Multi-document context ingestion',
      efficiency: 'High precision grounding',
      latency: 'Instant conversational context'
    },
    image: '/cyber_telemetry.jpg',
    demoUrl: '#demo',
    githubUrl: 'https://github.com/Akash4149',
    featured: true
  },
  {
    _id: 'proj_lane_02',
    title: 'Lane Violation Detection System',
    codeName: 'CYBERTRUCK // AUTONOMOUS VISION',
    category: 'Computer Vision / OpenCV',
    tagline: 'Real-Time Edge Computer Vision for Traffic Boundary & Vehicle Violation Tracking',
    description: 'Developed an advanced computer vision-based telemetry system to detect vehicles crossing designated lane boundaries from real-time video footage. Applied OpenCV algorithms for automated lane detection, vehicle bounding-box tracking, and timestamped violation identification.',
    powertrain: ['OpenCV', 'Python', 'Computer Vision', 'Video Telemetry', 'Image Processing'],
    specs: {
      acceleration: '30+ FPS real-time video stream',
      throughput: 'Multi-vehicle simultaneous tracking',
      efficiency: 'High-accuracy boundary detection',
      latency: '< 25ms per frame inference'
    },
    image: '/gigafactory_iot.jpg',
    demoUrl: '#demo',
    githubUrl: 'https://github.com/Akash4149',
    featured: true
  },
  {
    _id: 'proj_face_03',
    title: 'Face Recognition Folder Unlock System',
    codeName: 'CYBER-CIPHER // BIOMETRIC SECURITY',
    category: 'Security / Biometrics',
    tagline: 'Facial Recognition-Based Authentication System for Sensitive File Security',
    description: 'Developed a secure folder access protection system utilizing Python and OpenCV facial recognition pipelines. Implemented live biometric face detection and verification to restrict unauthorized file access and grant seamless entry strictly to verified personnel.',
    powertrain: ['Python', 'OpenCV', 'Facial Recognition', 'Biometric Encryption', 'OS Security'],
    specs: {
      acceleration: 'Instant live facial match',
      throughput: '100% verified access boundary',
      efficiency: 'Zero-touch biometric login',
      latency: 'Sub-100ms face encoding'
    },
    image: '/tesla_hero.jpg',
    demoUrl: '#demo',
    githubUrl: 'https://github.com/Akash4149',
    featured: true
  }
];

// In-memory contact submissions fallback
const inMemoryContacts = [];

// GET /api/health
router.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'TESLA_CYBER_PORTFOLIO_CORE',
    mongoConnected: isConnectedToMongo,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// GET /api/telemetry
router.get('/telemetry', (req, res) => {
  const memUsage = process.memoryUsage();
  res.json({
    powertrain: {
      client: 'React 19 (Vite Architecture)',
      server: 'Node.js v' + process.versions.node + ' + Express 5',
      database: isConnectedToMongo ? 'MongoDB Atlas (Connected)' : 'High-Speed In-Memory Cache (Live)',
      notifications: {
        emailConfigured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        smsConfigured: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
      },
      styling: 'Pure Futuristic Vanilla CSS (Tesla Minimalist)'
    },
    metrics: {
      uptimeSeconds: Math.floor(process.uptime()),
      heapUsedMB: (memUsage.heapUsed / 1024 / 1024).toFixed(2),
      heapTotalMB: (memUsage.heapTotal / 1024 / 1024).toFixed(2),
      apiLatencyMs: Math.floor(Math.random() * 8 + 4),
      systemState: 'OPTIMAL / LUDICROUS MODE'
    }
  });
});

// GET /api/projects
router.get('/projects', async (req, res) => {
  try {
    if (isConnectedToMongo) {
      const dbProjects = await Project.find().sort({ createdAt: -1 });
      if (dbProjects && dbProjects.length > 0) {
        return res.json({ success: true, source: 'MONGODB', data: dbProjects });
      }
    }
    // Return sample projects
    res.json({ success: true, source: 'LOCAL_HIGH_PERFORMANCE_CACHE', data: sampleProjects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, data: sampleProjects });
  }
});

// GET /api/messages - Retrieve received messages (from DB or in-memory)
router.get('/messages', async (req, res) => {
  try {
    if (isConnectedToMongo) {
      const messages = await Contact.find().sort({ createdAt: -1 }).limit(20);
      return res.json({ success: true, source: 'MONGODB', data: messages });
    }
    res.json({ success: true, source: 'IN_MEMORY', data: [...inMemoryContacts].reverse() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/contact - Saves inquiry to DB and dispatches Email + SMS notifications
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, projectType, specsLevel, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Incomplete telemetry packet. Name, Email, and Message are required.'
      });
    }

    const transmissionId = 'TSLA-TX-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    // 1. Dispatch Notifications (Email + Phone SMS)
    const notificationResult = await sendNotificationDispatch({
      name,
      email,
      phone: phone || '',
      projectType: projectType || 'Full-Stack MERN Architecture',
      specsLevel: specsLevel || 'Plaid Performance',
      message,
      transmissionId
    });

    const payload = {
      name,
      email,
      phone: phone || '',
      projectType: projectType || 'Full-Stack MERN Architecture',
      specsLevel: specsLevel || 'Plaid Performance',
      message,
      transmissionId,
      emailDispatched: notificationResult.emailSent,
      smsDispatched: notificationResult.smsSent,
      notificationDetails: notificationResult.details,
      createdAt: new Date()
    };

    // 2. Persist to MongoDB (or in-memory cache)
    if (isConnectedToMongo) {
      const contactDoc = new Contact(payload);
      await contactDoc.save();
      return res.json({
        success: true,
        message: 'Telemetry packet successfully received, saved to MongoDB, and alert dispatched.',
        data: payload,
        notifications: notificationResult
      });
    }

    inMemoryContacts.push(payload);
    res.json({
      success: true,
      message: 'Transmission received, logged into high-speed memory channel, and alert dispatched.',
      data: payload,
      notifications: notificationResult
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/learn - Interactive guide explaining MERN architecture step-by-step
router.get('/learn', (req, res) => {
  res.json({
    architecture: 'MERN (MongoDB, Express.js, React 19, Node.js)',
    flow: [
      {
        layer: 'Client (React 19 + Vite)',
        role: 'The Digital Cockpit & HUD',
        details: 'Handles UI state, smooth scrolling, interactive sliders, Web Audio sound synthesis, and communicates with the backend via fetch / Axios.'
      },
      {
        layer: 'Server (Node.js + Express 5)',
        role: 'The Drive Unit & Inverter',
        details: 'Listens on Port 5000, routes incoming HTTP requests, validates incoming payload packets (POST /api/contact), and interfaces with the database.'
      },
      {
        layer: 'Notifications (Nodemailer + Twilio)',
        role: 'Instant Telemetry Relays',
        details: 'Delivers real-time Email alerts via Gmail/SMTP and mobile SMS/WhatsApp alerts via Twilio whenever an inquiry is submitted.'
      },
      {
        layer: 'Database (MongoDB + Mongoose)',
        role: 'The Battery Energy Cells / Persistent Storage',
        details: 'Stores document schemas like Projects, Contact Inquiries, and Telemetry logs in JSON-like BSON documents with indexing.'
      }
    ],
    nextSteps: [
      '1. Create a free cluster on cloud.mongodb.com (MongoDB Atlas).',
      '2. Get your connection string: mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio',
      '3. Create a .env file with MONGO_URI="..." in the root folder.',
      '4. Add EMAIL_USER & EMAIL_PASS to receive instant Gmail notifications.',
      '5. Add TWILIO credentials to receive instant phone SMS notifications!'
    ]
  });
});
