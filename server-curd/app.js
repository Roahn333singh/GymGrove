require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("./db/conn");
const cors=require("cors");
const router=require("./routes/router");

const users=require("./models/userSchema")

app.use(cors());
app.use(express.json());
app.use(router);
const port=8003;
app.listen(port,()=>{
    console.log(`server is start port number ${port}`);
});