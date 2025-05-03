const express=require('express');

const authMiddleware = require("../middlewares/authMiddleware");
const { createCatController,getAllCatController, updateCatController, deleteCatC68168593f7e885ef7c8912a3ontroller } = require('../controllers/categoryController');

const router=express.Router()


//routes
//CREATE cat
router.post('/create',authMiddleware,createCatController)

//GET ALL CAT
router.get('/getAll',getAllCatController);

//upadte cat
router.put('/update/:id',authMiddleware,updateCatController);

//delete cat
router.delete('/delete/:id',authMiddleware,deleteCatController);

module.exports=router;