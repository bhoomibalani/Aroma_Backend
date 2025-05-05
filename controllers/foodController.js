const foodModel = require("../models/foodModel");

//create food
const createFoodContoller=async(req,res)=>{
    try{

        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount
        }=req.body;

        if(!title||!description||!price||!restaurant){
            return res.status(500).send({
                success:false,
                message:'please provide all fiels'
            })
        }
        const newFood= new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount,
        });
        await newFood.save()
        res.status(201).send({
            success:true,
            message:'new food item careted',
            newFood
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in create food api',
            error
        })
    }
};

//get all foods
const getAllFoodController =async(req,res)=>{
    try{

        const foods= await foodModel.find({})
        if(!foods){
            return res.status(404).send({
                success:false,
                message:'no food item was found'
            })
        }
        res.status(200).send({
            success:true,
            totalFoods:foods.length,
            foods,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in get all food api',
            error
        })
    }
};

//get sngle food
const getSingleFoodController =async(req,res)=>{
try{
    const foodId=req.params.id;
    if(!foodId){
        return res.status(404).send({
            success:false,
            message:'please provide id'
        })
    }
    const food=await foodModel.findById(foodId)
    if(!food){
        return res.status(404).send({
            success:false,
            message:'no food found with this id'
        })
    }
res.status(200).send({
    success:true,
    food,
})

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in get single food api',
        error
    })
}
}

//get food by restro

const getFoodByRestroController  =async(req,res)=>{
    try{
        const restaurantId=req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:'please provide id'
            })
        }
        const food=await foodModel.find({restaurant:restaurantId})
        if(!food){
            return res.status(404).send({
                success:false,
                message:'no food found with this id'
            })
        }
    res.status(200).send({
        success:true,
        message:'food based on restro',
        food,
    })
    
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get single food api',
            error
        })
    }
    }

//update food item

const updateFoodController=async(req,res)=>{
try{
const foodID= req.params.id
if(!foodID){
    return res.status(404).send({
        success:false,
        message:'no food id found'
    })
}
const food=await foodModel.findById(foodID)
if(!food){
    return res.status(404).send({
        success:false,
        message:'no food found'
    })
}
const{
    title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
}=req.body;

const updatedFood=await foodModel.findByIdAndUpdate(foodID,{
    title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating},{new:true})
            res.status(200).send({
                success:true,
                message:'food item was updated',
            });
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in update food api',
        error
    })
}
};

//delete food
const deleteFoodController=async(req,res)=>{
try{
const foodId=req.params.id;
if(!foodId){
    return res.status(404).send({
        success:false,
        message:'provide foodId'
    })
}
const food =await foodModel.findById(foodId)
if(!food){
    return res.status(404).send({
        success:false,
        message:'no food found'
    })
}
await foodModel.findByIdAndDelete(foodId)
res.status(200).send({
    success:true,
    message:'food item deleted',
});
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in delete food api',
        error
    })
}
}

module.exports={createFoodContoller,getAllFoodController,getSingleFoodController,getFoodByRestroController,updateFoodController,deleteFoodController};