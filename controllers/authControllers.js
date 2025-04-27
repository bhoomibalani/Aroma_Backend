const userModel = require("../models/userModel")

//REGISTER
const registerController=async(req,res)=>{
    try{
       const{userName,email,password,address,phone}= req.body
       //validation
       if(!userName || !email||!password||!address||!phone){
        return res.status(500).send({
            success:false,
            message:'Please Provide All Fields'
        })
       }
       //Check User
       const existing=await userModel.findOne({email})
       if(existing){
        return res.status(500).send({
            success:false,
            message:'Email Already Registered please Login'
        })
       }
       //create new user
       const user=await userModel.create({userName,email,password,address,phone})
       res.status(201).send({
        success:true,
        message:'Sucessfully Registered',
        user,
       })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Register API',
            error
        })
    }
}

module.exports={ registerController }