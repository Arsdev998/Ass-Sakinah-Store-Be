import mongoose from "mongoose";

const connect = async (req, res) => {
   try {
     const conn = await mongoose.connect(process.env.MONGODB_URL);

     console.log(`mongo db connected: ${conn.connection.host}`);
   } catch (error) {
     console.log(`error: ${error.message}`);
     process.exit(1);
   }
};

export default connect;
