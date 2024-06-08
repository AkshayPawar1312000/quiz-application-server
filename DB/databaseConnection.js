// MongoDB database connection file establishes and manages the connection to the MongoDB database.


const  mongoose  = require("mongoose");
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log('connection successful');
    }).catch((error)=>console.log(error));