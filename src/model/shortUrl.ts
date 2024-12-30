import mongoose from "mongoose"; 
import shortid from "shortid";


const shorturlSchema = new mongoose.Schema({
full: {
    type: String
},

short: {
    type: String,
    required: true,
    default: shortid.generate
},

clicks:{
    type: Number,
    required: true,
    default: 0
},
useremail:{
    type: String
    
}
})

const shortUrl = mongoose.model('shortUrl', shorturlSchema)

module.exports = shortUrl