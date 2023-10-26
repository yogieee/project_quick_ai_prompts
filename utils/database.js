import mongoose from "mongoose";

let isConnected = false; // track if the database is connected

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Database(MongoDB) is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database(MongoDB) is connected");
    isConnected = true;
  } catch (error) {
    console.log(
      "Database(MongoDB) is not connected. Error while connecting to MongoDB:"
    );
    console.log(error);
  }
};
