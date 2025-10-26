import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    // Hide password in logs
    const sanitizedUri = process.env.MONGODB_URI.replace(/:[^:]*@/, ":****@");
    console.log("Connection string:", sanitizedUri + "/mern-ecommerce");
    
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-ecommerce`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("\n---------------------------------------------------------");
        
    console.log("MongoDB connected successfully to mern-ecommerce database 👍");
    
    // List all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("---------------------------------------------------------");

    console.log("\nCollections in database:");
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // Log the available databases
    const admin = mongoose.connection.db.admin();
    const dbInfo = await admin.listDatabases();
    console.log("\n---------------------------------------------------------");

    console.log("Available databases:", dbInfo.databases.map(db => db.name));
    console.log("---------------------------------------------------------");

    
  } catch (err) {
    console.error("MongoDB connection failed");
    console.error("Error name:", err.name);
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
    if (err.errmsg) console.error("Error details:", err.errmsg);
    process.exit(1);
  }
};

export default connectDB;
