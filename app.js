const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { pool } = require("./dbConfig.js");
const bcrypt = require("bcrypt");
const session=require("express-session");
const flash=require("express-flash");
const passport=require("passport");
const path=require("path");

const initializePassport=require('./passportConfig.js');
initializePassport(passport);


const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

const userSchema = {
    email: String,
    password: String
};
app.use(
    session({
        secret:'secret',
        resave:false,
        saveUninitialized:false
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/login",checkAuthenticated, function (req, res) {
    res.render("login");
});

app.get("/register",checkAuthenticated, function (req, res) {
    res.render("register");
});

app.get("/index_2",checkNotAuthenticated,function(req,res){
    res.render("index_2", { email: req.user.email });
});
app.get('/logout', function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.error(err);
        }
        req.flash("success_msg", "You have logged out");
        res.redirect('/login');
    });                     
});

// app.post("/newindex",(req,res)=>{
//     res.render("newindex");
// });




app.post("/register", async (req, res) => {
    let { email, password } = req.body;

    console.log({
        email,
        password
    });
    let errors = [];

    if (!email || !password) {
        errors.push({ message: "Please enter all fields" });
    }
    if (password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters" });
    }
    if (errors.length > 0) {
        res.render('register', { errors });
    }
    else {
        let hashedPassword = await bcrypt.hash(password, 10);

        pool.query(
            `SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results.rows);

                if (results.rows.length > 0) {
                    errors.push({ message: "Email already registered" });
                    res.render('register', { errors });
                }
                else{
                    pool.query(
                        'INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id, password',[email,hashedPassword],(err,results)=>{
                            if(err){
                                throw err;
                            }
                            console.log(results.rows);
                            req.flash('success_msg',"You are now registered Please login");
                            res.redirect('/login')

                        }
                        
                    )
                }
            }
        );
    }
});

app.post("/login",passport.authenticate('local',{
    successRedirect:'/index_2',
    failureRedirect:'/login',
    failureFlash:true
})
);
function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/index_2');
    }
    next();
}

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
    
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
