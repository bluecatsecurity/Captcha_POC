var express = require('express');
var axios = require('axios');
var app = express();
const secretKey = "<the secret provided by google of your registered user>";
const PORT = process.env.PORT || 3001;

// Middleware donde defino el contenido de lo estático 
app.use(express.static(__dirname +'/public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req,res)=>{
    
    res.sendFile(__dirname + '/public/index.html');
    
});


app.post('/login',  (req,res,next)=>{
    
    if(!req.body.recaptcha) return res.json({"success": false, "description": 'Debe Clickear en el CAPTCHA'});
   
    var googleUrl = 'https://www.google.com/recaptcha/api/siteverify&secret';
    var response = req.body.recaptcha;
    var remoteip = <your site || res.connection.remoteAddress >;
    var googleVerify = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${response}&remoteip=${remoteip}`
    
   
    axios.post(googleVerify,{})
        .then((response)=>{
          
            if(!response.data.success) return res.status(401).json({"success": false, "description":"CAPTCHA INVÁLIDO"});
            
            return res.status(200).json({"success":true, "Description": "CAPTCHA CORRECTO"});
        });    
   
   
});




app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})