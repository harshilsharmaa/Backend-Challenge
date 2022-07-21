const User = require('../models/User');

exports.addUser = async(req,res)=>{
    try {

        const user = await User.create(req.body);

        res.status(201).json({
            success:true,
            message:"User Added Successfully",
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.addUserMealPlan = async(req,res)=>{
    try {

        const user = await User.findById(req.params.id);
        if(!user){
            res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        }


        user.mealPlan.push(req.body.mealPlan);
        user.save();

        res.status(201).json({
            success:true,
            message:"Meal Plan Added",
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateUserMealPlan = async(req,res)=>{
    try {

        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            })
        }

        // To find index of mealPlan to be updated
        let toUpdateMealPlanIndex = -1;
        user.mealPlan.map((item,index)=>{
            if(item._id == req.params.mealPlanId){
                toUpdateMealPlanIndex = index;
            }
        })

        // if mealPlan not found return error
        if(toUpdateMealPlanIndex==-1){
            return res.status(400).json({
                success:false,
                message:"Meal Plan Not Found"
            })
        }

        // remove mealPlan from mealPlan array
        user.mealPlan.splice(toUpdateMealPlanIndex,1);

        // add new mealPlan to mealPlan array
        user.mealPlan.push(req.body.newMealPlan);
        user.save();

        res.status(201).json({
            success:true,
            message:"Meal Plan Updated Successfully",
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}