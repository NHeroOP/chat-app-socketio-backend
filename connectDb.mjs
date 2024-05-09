import { connect } from "mongoose";


const connection = {}

export default async function connectDB() {
  if (connection.isConnected) {
    console.log("Db Already connected");
    return;
  }

  try {
    const db = await connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState
    console.log("DB connected successfully");
    
  } catch (err) {
    console.log("DB connection failed", err);
    process.exit(1);
  }
}