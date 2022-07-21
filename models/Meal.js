const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["breakfast", "lunch", "evening snack", "dinner"],
    },
    name: {
        type: String,
    },
    foodItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem',
    }]
})


module.exports = mongoose.model('Meal', mealSchema);