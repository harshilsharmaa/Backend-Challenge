const express = require('express');

const router = express.Router();

const{
    addUser,
    addUserMealPlan,
    updateUserMealPlan
} = require('../controllers/user');

router.route('/add').post(addUser);
router.route('/addMealPlan/:id').post(addUserMealPlan);

router.route('/:id/updateMealPlane/:mealPlanId').patch(updateUserMealPlan)

module.exports = router;