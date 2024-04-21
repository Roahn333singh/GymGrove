const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://doubtnut333:vTzcCn2iMZ6KrNMG@cluster0.khcqfeh.mongodb.net/attendanceG?retryWrites=true&w=majority&appName=Cluster0");

mongoose.connection.on('error', (error) => {
    console.error("Error connecting to DB:", error);
});

mongoose.connection.once('open', () => {
    console.log("Connected to DB");
});

// User schema 
const userSchema = new mongoose.Schema({
    attendance: Number
});

// Specify custom collection name "users"
const User = mongoose.model("User", userSchema, "users");


// API endpoint to increment attendance
app.get("/attendance", async (req, res) => {
    try {
        console.log("Request for attendance...");
        res.status(200).json({ message: "Attendance get successfully", data : total});
    } catch (error) {
        res.status(500).json({ message: "Failed to get attendance", error: error });
    }
});

// API endpoint to increment attendance
app.post("/attendance/increment", async (req, res) => {
    try {
        console.log("Incrementing Attendance..");
        const user = User.create({"attendance" : req.body.attendance});
        // User.insertOne({"attendance" : req.body.attendance});
        // const user = await User.findOne(); // Assuming you have only one user in your database
        // user.attendance++;
        // await user.save();
        res.status(200).json({ message: "Attendance incremented successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to increment attendance", error: error });
    }
});

// API endpoint to decrement attendance
app.post("/attendance/decrement", async (req, res) => {
    try {
        const user = await User.findOne(); // Assuming you have only one user in your database
        if (user.attendance > 0) {
            user.attendance--;
            await user.save();
            res.status(200).json({ message: "Attendance decremented successfully" });
        } else {
            res.status(400).json({ message: "Attendance count cannot be negative" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to decrement attendance", error: error });
    }
});

app.listen(8888, () => {
    console.log("Server started on port 8888");
});
