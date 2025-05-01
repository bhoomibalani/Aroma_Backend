const express=require('express');
const { getUserController,updateUserController,pwUpdateUserController } = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware")

const router=express.Router()


//routes
//GET USER||
router.get('/getUser',authMiddleware,getUserController);

//UPADTE USER
router.put('/updateUser',authMiddleware,updateUserController);


//password update
router.patch('/updatePassword',authMiddleware,pwUpdateUserController);
module.exports=router;