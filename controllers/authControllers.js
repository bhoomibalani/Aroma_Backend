const userModel = require("../models/userModel")
const bcrypt =require('bcrypt');
const JWT= require('jsonwebtoken')


//REGISTER
const registerController=async(req,res)=>{
    try{
       const{userName,email,password,address,phone}= req.body
       //validation
       if(!userName ||!email||!password||!address||!phone){
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
       //hashing password
       var salt=bcrypt.genSaltSync(10);
       const hashedPassword= await bcrypt.hash(password,salt)
       //create new user
       const user=await userModel.create({
        userName,
        email,
        password:hashedPassword,
        address,
        phone})

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
};


//LOGIN
const loginController=async(req,res)=>{
try{
const{email,password}=req.body
//validation

if(!email||!password){
    return res.status(500).send({
        success:false,
        message:'Please Provide email or password'
    });
}
//check user
const user= await userModel.findOne({email});

if(!user){
    return res.status(404).send({
        success:false,
        message:'User Not Found'
    });
}
//check usr password 
const isMatch = await bcrypt.compare(password,user.password)
console.log("Entered password:", password);
console.log("Stored hash:", user.password);
console.log("ismatch",isMatch )

if(!isMatch){
  
    return res.status(500).send({
        success:false,
        message:"Invalid credentials",
      
    });
}

//token
const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{
    expiresIn:'7d',
})
user.password=undefined;
res.status(200).send({
    success:true,
    message:'Login Successfully',
    token,
    user,

})
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in Login API ',
        error
    })
}
}




module.exports={ registerController , loginController}