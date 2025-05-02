const restaurantModel= require("../models/restaurantModel");

//create res
const createRestaurantController =async(req,res)=>{
 try{
const {
    title,
    imageUrl,
    foods,
    time,
    pickup,
    delivery,
    isOpen,
    logoUrl,
    rating,
    ratingCount,
    code,
    coords
}=req.body

//validation
if(!title||!coords){
    return res.status(500).send({
        success:false,
        message:'please provide titile and address',   
    });
}
const newRestaurant =new restaurantModel({
    title,
    imageUrl,
    foods,
    time,
    pickup,
    delivery,
    isOpen,
    logoUrl,
    rating,
    ratingCount,
    code,
    coords,
})

await newRestaurant.save()
res.status(201).send({
    success:true,
    message:'New Restaurant created successfully',
})
 }catch(error){
console.log(error)
res.status(500).send({
    success:false,
    message:'Error In Create Restaurant API',
    error
})
 }
}

module.exports={createRestaurantController};