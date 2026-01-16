const router=require("express").Router();
const{authenticateToken}=require("./userAuth");
const Book=require("../model/books");
const Order=require("../model/order.js");
const User=require("../model/user");
const order = require("../model/order.js");
router.post("/place-order",authenticateToken,async(req,res)=>{
try{
    const{id}=req.headers;
    const{order}=req.body;
    for(const orderData of order){

        const newOrder=new Order({user:id,book:orderData._id});
        const orderDataFromDb=await newOrder.save();
        //saving order in user model
        await User.findByIdAndUpdate(id,{
            $push:{orders:orderDataFromDb._id},

        });
        await User.findByIdAndUpdate(id,
            {
            $pull:{cart:orderData._id},
        });
    }
    return res.json({
        status:"Success",
        message:"order placed successfully",
    });

}catch(error){
    console.log(error);
    res.status(500).json({message:"internal server error"});
}
});

// order of particular user
router.get("/get-order-history",authenticateToken,async(req,res)=>{
try{
    const{id}=req.headers;
    const userData=await User.findById(id).populate({
        path:"orders",
        populate:{path:"book"},
    });
    const orderData=userData.orders.reverse();
    return res.json({
        status:"Success",
        data:orderData,
    });

}catch(error){
    console.log(error);
    res.status(500).json({message:"internal server error"});
}
});

// get all orders--admin
router.get("/get-all-order",authenticateToken,async(req,res)=>{
try{
   
    const userData=await Order.find()
    .populate({ 
        path:"book",

    })
    .populate({
        path:"user",
    })
    .sort({createdAt:-1});
    return res.json({
        status:"Success",
        data:userData,
    });
}catch(error){
    console.log(error);
    res.status(500).json({message:"internal server error"});
}
});

//update order--admin
router.put("/update-status/:id",authenticateToken,async(req,res)=>{
    try{
 const{id}=req.params;
 await Order.findByIdAndUpdate(id,{status:req.body.status});
 return res.json({
    status:"Success",
    message:"Ststus updsted successfully",
 });
    }catch(error){
    console.log(error);
    res.status(500).json({message:" error occured"});
}
});

module.exports=router;