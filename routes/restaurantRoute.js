const express=require('express');

const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController, getAllRestaurantController,getRestaurantByIdController } = require('../controllers/restaurantController');

const router=express.Router()


//routes
//CREATE RES
router.post('/create',authMiddleware,createRestaurantController);

// get all restro
router.get('/getAll',getAllRestaurantController);

//get restaurnat
router.get('/get/:id',getRestaurantByIdController);
module.exports=router;