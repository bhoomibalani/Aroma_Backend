const express=require('express');

const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodContoller, getAllFoodController, getSingleFoodController ,getFoodByRestroController, updateFoodController,deleteFoodController} = require('../controllers/foodController');

const router=express.Router();

//ROUTES
//create food
router.post('/create',authMiddleware,createFoodContoller)


//get all food
router.get('/getAll',getAllFoodController)

//gt sngle food
router.get('/get/:id',getSingleFoodController);

//getrfood by restro
router.get('/getByRestaurant/:id',getFoodByRestroController);


//upadte food
router.put('/update/:id',authMiddleware,updateFoodController);

//delete food
router.delete('/delete/:id',authMiddleware,deleteFoodController);
module.exports=router;