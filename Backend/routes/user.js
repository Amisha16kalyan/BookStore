const router=require("express").Router();
const User=require("../model/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const{authenticateToken}=require("./userAuth");
//signup
router.post("/sign-up",async (req,res)=>{
    try{
const{username,email,password,address}=req.body;

if(username.length < 4){
    return res.status(400).json({message:"username length should be greater than 4"});
}

const existingUsername=await User.findOne({username:username});
if(existingUsername){
    return res.status(400).json({message:"username already exits"});
}

const existingEmail=await User.findOne({email:email});
if(existingEmail){
    return res.status(400).json({message:"email already exits"});
}

if(password.length<=5){
     return res.status(400).json({message:"password length should be greater than 5"});
}
const hashpass=await bcrypt.hash(password,10);
const newUser=new User({
    username:username,
    email:email,
    password:hashpass,
    address:address});

    await newUser.save();
    return res.status(200).json({message:"user regidtered successfully"});
}catch(err){
        res.status(500).json({message:"internal server error"});
    }
});

//signin
router.post("/sign-in",async(req,res)=>{
    try{
const{username,password}=req.body;
const existingUser=await User.findOne({username});
if(!existingUser){
    return res.status(400).json({message:"invalid credential"});
}
await bcrypt.compare(password,existingUser.password,(err,data)=>{
    if(data){
        const authclaims=[
            {name:existingUser.username},
            {role:existingUser.role},
        ];
        const token=jwt.sign({authclaims},"book123#@",
            {expiresIn:"30d",
        });
        res.status(200).json({
            id:existingUser._id,
            role:existingUser.role,
            token:token,
        });
    }else{
         res.status(400).json({message:"invalid credential"});
    }
})
    }catch(err){
        res.status(500).json({message:"internal server error"});
    }
});
//get user info
router.get("/get-user-info",authenticateToken,async(req,res)=>{
    try{
const{id}=req.headers;
const data=await User.findById(id).select("-password");
return res.status(200).json(data);
    }catch(err){
        res.status(500).json({message:"internal server error"});
    }
});
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
        const{id}=req.headers;
        const{address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"address updated successfully"});
    }catch(err){
        res.status(500).json({message:"internal server error"});
    }
});
module.exports=router;