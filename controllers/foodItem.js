const FoodItem = require('../models/FoodItem');

exports.addFoodItem = async (req, res) => {
    try {

        console.log(req.body);

        if (!req.body.name || !req.body.calories || !req.body.protein || !req.body.carbs || !req.body.fat || !req.body.itemWeight || !req.body.acceptedUnit) {
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

exports.deleteFoodItem = async (req, res) => {
    
        try {
    
            const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
    
            res.status(200).json({
                success: true,
                message: 'FoodItem deleted successfully',
                foodItem
            })
    
        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            })
        }
}


// to find all the subset of a given array of numbers that sum to a given number
function subsetSumToK(arr, n, givenCalories) {
    let sum = 0;
    let i = 0;
    let j = 0;
    let result = [];

    let count = 0;
    while(i <n&& j<n){
        sum+=arr[j].calories;
        
        if(sum>=givenCalories-100 && sum<=givenCalories+100){
            let temp = [i,j-1];
            result.push(temp);
        }
        
        else if(sum>givenCalories+100){
            sum-=arr[j].calories;
            while(i<=j){
                sum-=arr[i].calories;
                i++;
                if(sum>=givenCalories-100 && sum<=givenCalories+100){
                    let temp =[i,j-1];
                    result.push(temp);
                }
            }
        }
        j++;
        
    }
    return result;
}


exports.getFoodItemsByCalories = async (req, res) => {

    try {


        const foodItems = await FoodItem.find({}).sort({calories: 1});

        let foodItemsToReturn = [];

        let a = subsetSumToK(foodItems, foodItems.length, Number(req.params.givenCalories));

        a.map(item => {
            let f = item[0];
            let s = item[1];
            let temp = {};
            let protein = 0;
            let calories = 0;
            

            // food item with their protein level
            for(let i=f; i<=s; i++){
                protein += foodItems[i].protein;
                calories += foodItems[i].calories;
                temp[foodItems[i].name] = foodItems[i].protein;
            }
        
            temp.TotalProtein = protein;
            temp.TotalCalories = calories;
            temp.proteinPercent = (protein/calories)*100;
            foodItemsToReturn.push(temp);
        })


        // sort the meal having protein level between 20 to 30 percent of the total calories if its possible.
        foodItemsToReturn.sort((a, b) => {
            return b.proteinPercent - a.proteinPercent;
        })

        res.status(200).json({
            success: true,
            message: 'FoodItems retrieved successfully',
            foodItemsToReturn
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}