const categoryModel= require("../models/categoryModel")

//create cat
const createCatController=async(req,res)=>{
try{
const {title,imageUrl}=req.body
//vald
if(!title){
    return res.status(500).send({
        success:false,
        message:'please provide category title or image'
    })
}
const newCategory = new categoryModel({title,imageUrl})
await newCategory.save()
res.status(201).send({
    success:true,
    messsage:'Category created',
    newCategory
})


}
catch(error){
console.log(error)
res.status(500).send({
    success:false,
    message:'Error in create cat api',
    error
})
}
};


//get all cat
const getAllCatController=async(req,res)=>{
    try{
        const categories= await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success:false,
                message:'No categories found'
            })
        }

        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories,
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in get all category api",
            error
        })
    }
};

//update cat
const updateCatController =async(req,res)=>{
    try{
        const{id}=req.params
        const{title,imageUrl}=req.body
        const updatedCategory =await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:'No Category Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'ACtegory updated successsfully'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in update api',
            error
        })

    }
};

//delete api
const deleteCatController= async(req,res)=>{
try{
const {id}= req.params;
if(!id){
    return res.status(500).send({
        success:false,
        message:'please provide category id'
    }) 
}
const deleteCategory = await categoryModel.findById(id);
if(!deleteCategory){
    return res.status(500).send({
        success:false,
        message:'no cat found with this id'
    })
}
await categoryModel.findByIdAndDelete(id)
res.status(200).send({
    success:true,
    message:'catgory deleted successfully'
})
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in delete cat api',
        error
    })
}
}

module.exports={createCatController,getAllCatController,updateCatController,deleteCatController}