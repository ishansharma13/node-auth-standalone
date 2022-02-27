const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(session({
    secret: 'abcjajajb',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post("/register",(req,res)=>{
    const {name,email,password}=req.body;

    res.send(200);

})





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
app.listen(3003,function(){
    console.log("Server Started at PORT 3003");
})