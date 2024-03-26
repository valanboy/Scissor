
import mongoose from "mongoose"; 
import bcryptjs from "bcryptjs"
import { isEmail } from "validator"

const UserSchema = new mongoose.Schema(
    {email:{
        type: String,
        required: true,
         lowercase: true,
         Unique: true
    },
    username:{
        type: String,
        required:true,
        minlength: 6
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }

    }
)


UserSchema.pre('save', async function(next){
    try {
        const salt =  await bcryptjs.genSalt();
this.password = await bcryptjs.hash(this.password, salt)
console.log("password is hashed just before saving this user!")

    next()
    } catch (error) {
        console.log(error)
    }
})


const user = mongoose.model('user', UserSchema);

module.exports = user