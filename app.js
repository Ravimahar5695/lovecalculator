require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected");
});

const loveSchema = mongoose.Schema({
    yourName: String,
    friendName: String,
    lovePercent: Number
});

const Love = mongoose.model("Love", loveSchema);

app.get("/", (req, res) => {
    res.render("home", {
        title: "Love Calculator",
        yourName: "Your Name",
        friendName: "Friend Name",
        result: null});
});

app.post("/", (req, res) => {
    Love.findOne({
        yourName: req.body.yourName,
        friendName: req.body.friendName},
        (err, name) => {
        if(err){
            res.send(err);
        } else{
            if(name){
                res.render("home", {
                    title: "Love Calculator",
                    yourName: name.yourName,
                    friendName: name.friendName,
                    result: name.lovePercent + "%"
                });
            } else{
                Love.findOne({
                    yourName: req.body.friendName,
                    friendName: req.body.yourName},
                    (err, name) => {
                    if(err){
                        res.send(err);
                    } else{
                        if(name){
                            res.render("home", {
                                title: "Love Calculator",
                                yourName: name.friendName,
                                friendName: name.yourName,
                                result: name.lovePercent + "%"
                            });
                        } else{
                            const randomNumber = Math.floor(Math.random()*100+1);
                            res.render("home", {
                                title: "Love Calculator",
                                yourName: req.body.yourName,
                                friendName: req.body.friendName,
                                result: randomNumber + "%"
                            });
                            const newLove = new Love({
                                yourName: req.body.yourName,
                                friendName: req.body.friendName,
                                lovePercent: randomNumber
                            });
                            newLove.save();
                        }
                    }
                });
            }
        }
    });
});

app.listen(process.env.PORT||5000, () => {
    console.log("app is running");
});