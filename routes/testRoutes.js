const express=require('express');
const { testUserController } = require('../controllers/testController');

const router=express.Router()


router.get('/test-user',testUserController)

//export
module.exports=router;