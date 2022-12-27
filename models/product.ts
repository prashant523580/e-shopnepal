import mongoose from "mongoose"
mongoose.Promise = global.Promise
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    aviableQuantity: {
        type: Number,

    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }

}, { timestamps: true })
// mongoose.models = {}
exports.modules =  mongoose.models.Products || mongoose.model("Products", ProductSchema)