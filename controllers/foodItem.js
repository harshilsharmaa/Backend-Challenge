const FoodItem = require('../models/FoodItem');

exports.addFoodItem = async (req, res) => {
    try {

        console.log(req.body);
        
        if(!req.body.name || !req.body.calories || !req.body.protein || !req.body.carbs || !req.body.fat || !req.body.itemWeight || !req.body.acceptedUnit) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const foodItem = await FoodItem.create({
            name: req.body.name,
            calories: req.body.calories,
            protein: req.body.protein,
            carbs: req.body.carbs,
            fat: req.body.fat,
            itemWeight: req.body.itemWeight,
            acceptedUnit: req.body.acceptedUnit,
        });

        res.status(201).json({
            success: true,
            message: 'FoodItem added successfully',
            foodItem
        })


    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.getFoodItems = async (req, res) => {

    try {
        const foodItems = await FoodItem.find();
        res.status(200).json({
            success: true,
            message: 'FoodItems retrieved successfully',
            foodItems
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}