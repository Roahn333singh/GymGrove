const mongoose=require("mongoose");
const DB="mongodb+srv://doubtnut333:fhwAgdZ2vTK2Y9jb@cluster0.36mquzv.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=>console.log(error.message));