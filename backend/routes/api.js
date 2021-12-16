const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/blockchain";
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
       user: "krm.krish@gmail.com",
       pass: "uzcvynmmganjrisp", //this password is generated from gmail
    },
});

var url = "mongodb://localhost:27017/";


generateVerificationToken = function (user,pass) {
    const verificationToken = jwt.sign(
        { ID: user, PASS:pass},
        "dgfgpspdifgskdfngussj490385jsp8ms",//this is the encrytion-decrytion token
        { expiresIn: "7d" }
    );
    return verificationToken;
};

MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  const db = client.db('blockchain')
    db.listCollections().toArray(function(err, items) {
    if(items.length<1)
     db.createCollection("login", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    var myobj = { email: "admin@gmail.com", password: "admin"};
    db.collection("login").insertOne(myobj, function(err, res) {
    if (err) throw err;
    client.close()
    })})
})
})

router.post('/', async(req,res) => {
    var url1 = "mongodb://localhost:27017/blockchain";
    MongoClient.connect(url1, function(err, db) {
        if (err) throw err;
        var dbo = db.db("blockchain");
        var query = { email: req.body.username, password:req.body.password};
        dbo.collection("login").find(query).toArray(function(err, result) {
          if (err) return(res.json('Connection Error'))
          else if(result.length==0) return(res.json('Invalid Credentials'))
          else return(res.json('Login Successful'))
          db.close();
        });
      });
})


router.post('/signup', function(req, res){
    if (req.body.email=='') {
        return res.send( "Missing email" );
     }
     else{       
        const verificationToken = generateVerificationToken(req.body.email,req.body.password);
        const url12 = `http://localhost:9001/verify?token=${verificationToken}`
        transporter.sendMail({
          to: req.body.email,
          subject: 'Verify Account',
          html: `Click <a href = '${url12}'>here</a> to confirm your email credentials. <br/> Email:${req.body.email} <br/> Pass:${req.body.password}`        })
        return res.send(         `Sent a verification email to ${req.body.email}`        );
    } 
});


router.get('/verify', function(req, res12){
    const { token } =  req.query
    
    let payload = null
        payload = jwt.verify(
           token,
           "dgfgpspdifgskdfngussj490385jsp8ms",//this is the jwt encryption-decryption token
        );

      if(payload!=undefined)
            if(payload.ID!=undefined)
            {
                var url145 = "mongodb://localhost:27017/";
                MongoClient.connect(url145, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("blockchain");
                    var myobj  = { email: payload.ID, password:payload.PASS};
                    console.log(payload)
                    dbo.collection("login").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        return res12.send('Successfully registered')
                        db.close();
                      });
                });
            }
})

module.exports = router;