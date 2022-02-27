const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserModel = require('./models/User');
const app = express();

const MONGO_URL = "mongodb://localhost:27017/sessions";
mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then((res)=>{
    console.log("Connected to Database");
});

const store = MongoDBSession({
    uri: MONGO_URL,
    collection: 'mySessions',
})

app.use(session({
    secret: 'abcjajajb',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const isAuth = (req,res,next) =>{
    if(req.session.isAuth){
        next();
    }else{
        res.redirect('/login');
    }

}
app.post("/register",async (req,res)=>{
    const {name,email,password}=req.body;
    let user = await UserModel.findOne({email});
    if (user){
        return res.redirect('/register');
    }
    const hashedPass = await bcrypt.hash(password,12);
    user = new UserModel({
        username: name,
        email,
        password: hashedPass
    });
    await user.save();
    res.redirect('/login');
})

app.post("/login", async (req,res)=>{
    const {email,password} = req.body;

    const user = await UserModel.findOne({email});

    if(!user){
        return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.redirect('/login');
    }
    req.session.isAuth = true;
    res.redirect('/dashboard');
});

app.post("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if (err) throw err;
        res.redirect("/");
    });
});

app.get('/', function(req, res){
    console.log(req.session);
    res.sendFile(__dirname + '/views/home.html');
    });

app.get('/register', function(req, res){
    res.sendFile(__dirname + '/views/register.html');
    });
app.get('/login', function(req, res){
        res.sendFile(__dirname + '/views/login.html');
        });
app.get('/dashboard', isAuth,function(req, res){
        res.sendFile(__dirname + '/views/dashboard.html');
});
    
app.listen(3003,function(){
    console.log("Server Started at PORT 3003");
})