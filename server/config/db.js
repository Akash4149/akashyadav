import mongoose from 'mongoose';

export let isConnectedToMongo = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoURI) {
    console.log('\x1b[33m%s\x1b[0m', '⚡ [TESLA POWERTRAIN] MONGO_URI not provided in .env');
    console.log('\x1b[36m%s\x1b[0m', '⚡ [SYSTEM RUNTIME] Operating in High-Performance Local Mock/Memory Mode.');
    console.log('\x1b[90m%s\x1b[0m', '⚡ [PRO-TIP] Add MONGO_URI="mongodb+srv://..." to your .env to connect live MongoDB Atlas.');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    isConnectedToMongo = true;
    console.log('\x1b[32m%s\x1b[0m', `⚡ [TESLA POWERTRAIN] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `⚡ [POWERTRAIN ERROR] MongoDB Connection Failed: ${error.message}`);
    console.log('\x1b[36m%s\x1b[0m', '⚡ [SYSTEM RUNTIME] Switched to High-Performance Resilient Memory Mode.');
    return false;
  }
};
