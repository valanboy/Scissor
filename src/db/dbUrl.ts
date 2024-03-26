import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

//connect to urls db
const DBUrls = process.env.DBUrls
 const connectToMongoDBUrls = async() => {
    try {
    mongoose.connect(DBUrls!);
 
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDBUrls successfully');
    });
    } catch (error) {
     mongoose.connection.on('error', (err) => {
         console.log('Error connecting to MongoDBUrlss', err);
     })
    }
 }
 
 module.exports = connectToMongoDBUrls