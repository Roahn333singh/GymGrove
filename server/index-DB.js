// // Importing express using CommonJS syntax
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // Updated to use extended option
// app.use(cors());

// // mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
// mongoose.connect("mongodb+srv://doubtnut333:L.a5M_4_sjsKSW4@cluster0.lzbtpej.mongodb.net/gym-grove?retryWrites=true&w=majority&appName=Cluster0", {
//     useNewUrlParser: true, // Removed warning option
//     useUnifiedTopology: true // Removed warning option
// }).then(() => {
//     console.log("Connected to DB");
// }).catch(error => {
//     console.error("Error connecting to DB:", error);
// });

// // User schema 
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });

// const User = mongoose.model("User", userSchema); // Changed to mongoose.model

// // Login route
// app.post("/login", async (req, res) => { // Made the route async
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email: email });
//         if (user) {
//             if (password === user.password) {
//                 res.send({ message: "login success", user: user });
//             } else {
//                 res.send({ message: "wrong credentials" });
//             }
//         } else {
//             res.send("not registered");
//         }
//     } catch (error) {
//         console.error("Error finding user:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Register route
// app.post("/register", async (req, res) => { // Made the route async
//     const { name, email, password } = req.body;
//     try {
//         const existingUser = await User.findOne({ email: email });
//         if (existingUser) {
//             res.send({ message: "user already exists" });
//         } else {
//             const newUser = new User({ name, email, password });
//             await newUser.save();
//             res.send({ message: "successful" });
//         }
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// app.listen(6969, () => {
//     console.log("Server started on port 6969");
// });

// Importing express using CommonJS syntax










const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb+srv://doubtnut333:L.a5M_4_sjsKSW4@cluster0.lzbtpej.mongodb.net/gym-grove?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(error => {
        console.error("Error connecting to DB:", error);
    });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            if (password === user.password) {
                res.send({ message: "login success", user: user });
            } else {
                res.send({ message: "wrong credentials" });
            }
        } else {
            res.send("not registered");
        }
    } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.send({ message: "user already exists" });
        } else {
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.send({ message: "successful" });
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(6969, () => {
    console.log("Server started on port 6969");
});
