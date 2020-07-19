const express = require("express");
const app = express(); 
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const url = process.env.MONGOLAB_OLIVE_URI || "mongodb://localhost:27017/node-demo";
mongoose.connect(url,{
	useNewUrlParser: true ,
	useUnifiedTopology: true
     });
var nameSchema = new mongoose.Schema({
 firstName: String,
 lastName: String,
 email: String,
 phonenumber:Number,
 image:String
});
var User = mongoose.model("User", nameSchema);


app.get("/",(req,res)=> {
	res.sendFile(__dirname + "/form1.html");
});

app.post("/addname", (req, res) => {
 var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.send("Thanking you to spending time with my work and datas are saved successfully.....");
 })
 .catch(err => {
 res.status(400).send("unable to save data , please check your data and retry ......");
 });
});

app.listen(port, ()=> {
	console.log("server listening on port" + port);
});