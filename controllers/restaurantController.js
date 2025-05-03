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
};


//GET ALL RESTRO

const getAllRestaurantController =async(req,res)=>{
try{
const restaurants = await restaurantModel.find({})
if(!restaurants){
    return res.status(404).send({
        success:false,
        message:'No restaurant available'
    })
}
res.status(200).send({
    success:true,
    totalCount:restaurants.length,
    restaurants
})
}
catch(error){
console.log(error)
res.status(500).send({
    success:false,
    messsage:'Error in GET  all restro API',
    error
})

}
}

//get restro by id 
const getRestaurantByIdController =async(req,res)=>{
try{
const restaurantId=req.params.id;

if(!restaurantId){
    return res.status(400).send({
success:false,
message:'no restro found',
    });
}
const restaurant = await restaurantModel.findById(restaurantId)
if(!restaurant){
    return res.status(404).send({
        success:false,
        message:'no restro found'
    })
}
res.status(200).send({
    success:true,
    restaurant,
});
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in get restro by id api',
        error
    })
}
}

//delete restro
const deleteRestaurantController=async(req,res)=>{
    try{
        const restaurantId=req.params.id
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:'Please Provide Restaurant id'
            })

        }
        if(!restaurantId){
            return res.status(404).send({
                sucess:false,
                message:'No restaurant found or provide restro id '
            })

        }
        await restaurantModel.findByIdAndDelete(restaurantId) 
        res.status(200).send({
            success:true,
            message:'restro delted successfully'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete restro api'
        })
    }

}

module.exports={
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantByIdController,
    deleteRestaurantController,
};