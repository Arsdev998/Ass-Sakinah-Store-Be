import mongoose from "mongoose";

const connect = async (req, res) => {
   try {
     const conn = await mongoose.connect(process.env.MONGODB_URL, {
       connectTimeoutMS: 20000, // misalnya 10 detik
       socketTimeoutMS: 45000, //
     });
     console.log(`mongo db connected: ${conn.connection.host}`);
   } catch (error) {
     console.log(`error: ${error.message}`);
     process.exit(1);
   }
};

export default connect;
