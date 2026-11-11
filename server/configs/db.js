import mongoose from "mongoose";
import dns from "node:dns";

// Some networks/routers block SRV DNS lookups used by mongodb+srv:// URIs.
// Use Google DNS for Node's lookups so the Atlas hostname can be resolved.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async() => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    })

    let mongodbURI = process.env.MONGODB_URI;
    const projectName = 'resume-builder';

    if(!mongodbURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }

    if(mongodbURI.endsWith('/')) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    await mongoose.connect(`${mongodbURI}/${projectName}`)
  }  catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export default connectDB;