const app = require("./app.js");
const config = require("./app/config/index");
const mongoose = require("mongoose");

mongoose.connect(config.database.uri)
    .then(()=>{
        console.log("Connected to the database!");
    })
    .catch((err)=>{
        console.log("Cannot connect to the database!", error);
        process.exit();
    })



const PORT = config.app.port;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});