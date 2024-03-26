import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

//connect to users db
const DBUri = process.env.DBUri 

 const connectToMongoDB = async() => {
   try {
   mongoose.connect(DBUri!);

   mongoose.connection.on('connected', () => {
       console.log('Connected to MongoDB successfully');
   });
   } catch (error) {
    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    })
   }
}



module.exports = connectToMongoDB