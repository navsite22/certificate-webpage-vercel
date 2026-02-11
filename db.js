// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
//       socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
//     });

//     console.log(`✅ MongoDB connected: ${conn.connection.host}`);
//   } catch (error) {
//       console.error('❌ MongoDB connection error:', error.message);
//       console.log('⚠️  Server will continue without database connection');
//       // Don't exit the process, let the server run without DB
//   }
// };

///////////////////////////////
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }).then((mongoose) => {
      console.log("✅ MongoDB connected");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", error.message);
  }

  return cached.conn;
};
