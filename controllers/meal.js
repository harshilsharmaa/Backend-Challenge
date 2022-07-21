const Meal = require('../models/Meal');
const FoodItem = require('../models/FoodItem');

exports.addMeal = async (req, res) => {
    try {

        const { category, name, foodItems } = req.body;

        const foodItem = await FoodItem.find({ _id: { $in: foodItems } });

        if (!foodItem) {
            return res.status(400).json({
                status: 400,
                error: 'FoodItem not found'
            });
        }

        const meal = await Meal.create({
            category,
            name,
            foodItems
        });

        res.status(201).json({
            success: true,
            message: 'Meal added successfully',
            meal
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.updateMeal = async(req, res) => {
    try {
        const { category, name, foodItems } = req.body;
        
        const meal = await Meal.findById(req.params.id);

        if(!meal){
            return res.status(400).json({
                success:false,
                message:"Meal Not Found"
            })
        }

        meal.category = category;
        meal.name = name;
        meal.foodItems = foodItems;

        await meal.save();

        res.status(201).json({
            success:true,
            message:"Meal Updated",
            meal
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.getMeals = async (req, res) => {
    try {
        const meals = await Meal.find().populate('foodItems');
        res.status(200).json({
            success: true,
            meals
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}