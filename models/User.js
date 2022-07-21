const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    caloriesRequirement: {
        type: Number,
    },
    mealPlan: [{
        date: {
            type: Date,
            default:Date.now
        },
        meals: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal',
        }]
    }]
})

module.exports = mongoose.model('User', userSchema);