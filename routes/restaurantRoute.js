const express=require('express');

const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController } = require('../controllers/restaurantController');

const router=express.Router()


//routes
//CREATE RES

router.post('/create',authMiddleware,createRestaurantController)

module.exports=router;