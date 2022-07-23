const express = require('express');
const router = express.Router();

const {
    addFoodItem,
    getFoodItems,
    getFoodItemsByCalories,
    deleteFoodItem
} = require('../controllers/foodItem');

router.route('/add').post(addFoodItem);
router.route('/getFoodItemsByCalories/:givenCalories').get(getFoodItemsByCalories);


router.route('/get').get(getFoodItems);
router.route('/delete/:id').delete(deleteFoodItem);

module.exports = router;