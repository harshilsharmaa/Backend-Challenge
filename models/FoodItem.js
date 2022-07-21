const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    calories: {
        type: Number,
    },
    protein: {
        type: Number,
    },
    carbs: {
        type: Number,
    },
    fat: {
        type: Number,
    },
    itemWeight: {
        type: Number,
    },
    acceptedUnit: {
        type: String,
        enum: ["ml", "g", "kg", "mg"],
    }
})


module.exports = mongoose.model('FoodItem', foodItemSchema);