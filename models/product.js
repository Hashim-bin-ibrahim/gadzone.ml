const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        trim: true,
    },
    new: {
        type: String,
        
    },
    outOfStock: {
        type: String,
        
    },
    sale: {
        type: String,
        
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    brand_name: {
        type: String,
        required: true,
        trim: true,
    },
    // offer: { type: Number },
    productPictures: Array,
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            review: String
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
    },
    updatedAt: Date,

}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);