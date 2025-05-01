const express=require('express');
const { getUserController,updateUserController,pwUpdateUserController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware")

const router=express.Router()


//routes
//GET USER||
router.get('/getUser',authMiddleware,getUserController);

//UPADTE USER
router.put('/updateUser',authMiddleware,updateUserController);


//password update
router.patch('/updatePassword',authMiddleware,pwUpdateUserController);

//delete user
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)
module.exports=router;