const express = require("express");
const cors = require("cors");
const app = express();
const setupContactRoutes = require("./app/routes/contact_routes");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.json ({message:"Welcome to contact book application."})
});
setupContactRoutes(app);
module.exports = app;