const express = require('express');
const router = express.Router();

const {
    addFoodItem,
    getFoodItems
} = require('../controllers/foodItem');

router.route('/add').post(addFoodItem);


router.route('/get').get(getFoodItems);

module.exports = router;