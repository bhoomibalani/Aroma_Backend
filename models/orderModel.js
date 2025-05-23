const mongoose = require('mongoose');

//schema 
const orderSchema = new mongoose.Schema(
    {

        foods:[
           {type:mongoose.Schema.Types.ObjectId,
           ref:'Foods'}
           ],
           payment:{},
           buyer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
           },
           status:{
            type:String,
            enum:['preparing','on the way','delivered'],
                default:'preparaing',
           },
    }, { timestamps: true });

    module.exports = mongoose.model("Orders",orderSchema);