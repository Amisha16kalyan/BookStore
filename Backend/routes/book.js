const router=require("express").Router();
const User=require("../model/user");
const Book=require("../model/books");
const jwt=require("jsonwebtoken");
const{authenticateToken}=require("./userAuth");
//add book-admin
router.post("/add-book",authenticateToken,async(req,res)=>{
try{
    const{id}=req.headers;
    const user=  await User.findById(id);
    if(user.role!=="admin"){
return res.status(400).json({message:"you dont have permission to perform admin work"}
)
    };

const book= Book({
    url:req.body.url,
    title:req.body.title,
    author:req.body.author,
    price:req.body.price,
    desc:req.body.desc,
    language:req.body.language,
});
book.save();
res.status(200).json({message:"book added successfully"});
}catch(err){
     res.status(500).json({message:"internal server error"});
}
});

router.put("/update-book",authenticateToken,async(req,res)=>{
    try{
    const{bookid}=req.headers;
    await Book.findByIdAndUpdate(bookid,{
    url:req.body.url,
    title:req.body.title,
    author:req.body.author,
    price:req.body.price,
    desc:req.body.desc,
    language:req.body.language,
    });

res.status(200).json({message:"book updated successfully"});
}catch(err){
     res.status(500).json({message:"internal server error"});
}
});

router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
        await book.findByIdAndDelete(bookid);
        return res.status(200).json({messwage:"book deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
});
router.get("/get-all-books",async(req,res)=>{
    try{
const books=await Book.find().sort({createdAt:-1});
return res.json({status:"success",
    data:books,
});
    }catch(error){
        res.status(500).json({message:"internal server error"});
    }
});

router.get("/get-recent-books",async(req,res)=>{
    try{
const books=await Book.find().sort({createdAt:-1}).limit(4);
return res.json({status:"success",
    data:books,
});
    }catch(error){
        res.status(500).json({message:"internal server error"});
    }
});

router.get("/get-book-by-id/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        const book=await Book.findById(id);
        return res.json({status:"success",
        data:book,
        });
    }
    catch(error){
         res.status(500).json({message:"internal server error"});
    }
    }
);
module.exports=router;