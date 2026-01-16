const mongoose=require("mongoose"); 
const conn = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to database");
  } catch (err) {
    console.log("Error connecting to database:", err);
  }
};
conn();