const userModel = require("../models/userModel");
const bcrypt =require('bcrypt');
//get user info
const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id }, { _id: 0 })

        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        //hide password
        user.password = undefined
        //resp
        res.status(200).send({
            success: true,
            message: 'User get Successfully',
            user,
        })

    } catch (error) {
       
        res.status(500).send({
            success: false,
            message: 'Error in GET API',
            error
        })
    }
};

//UPDATE USER
const updateUserController = async (req, res) => {
    try {
        //find user

        const user = await userModel.findById({ _id: req.user.id })
    
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'user not found'
            })
        }
        //update
        const { userName, address, phone } = req.body
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) user.phone = phone

        //re-save user
        await user.save()
        
        res.status(200).send({
            success: true,
            message: 'User Updated successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in update User API',
            error
        })
    }
};
//upadte passowrd
 const pwUpdateUserController=async(req,res)=>{
  try{
    const {password,newPassword}=req.body;
    if(!password || !newPassword) {
        return res.status(400).send({
            success: false,
            message: "Missing field"
        });
    }
    const user = await userModel.findById({ _id: req.user.id })
    if(!user){
        return res.status(404).send({
            success: false,
            message: 'user not found'
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Current password is incorrect",
      });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).send({
        success: true,
        message: 'User password Updated successfully'
    })
  } catch(err){
    res.status(400).send({
        success:false,
        message:"error in upadte password api",
        error:err.message
    });
  }
 }

 //DELETe PROFILE ACCOUNT
 const deleteProfileController=async(req,res)=>{
try{
const id=req.params;
await userModel.findByIdAndDelete(req.params.id)
return res.status(200).send({
    success:true,
    messsage:"your account has been deleted"
})
}catch(error){
console.log(error)
res.status(500).send({
    success:false,
    message:'Error in Delete Profile API',
    error
})
}
 };

module.exports = { 
     getUserController,
     updateUserController,
     pwUpdateUserController,
     deleteProfileController
     };