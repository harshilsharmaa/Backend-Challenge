const express = require('express');
const router = express.Router();

const {
    addMeal,
    getMeals,
    updateMeal
} = require('../controllers/meal');

router.route('/add').post(addMeal);

router.route('/update/:id').patch(updateMeal);

router.route('/get').get(getMeals);

module.exports = router;