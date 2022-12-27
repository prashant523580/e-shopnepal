import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required: true
    },
    enail:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true,
    }

},{timestamps: true})

export default mongoose.model("Users",userSchema)