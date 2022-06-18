const express=require('express');
const tasks=require('./tasks');
const app=express();
const connectDb=require('../db/connect');
const cors=require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();
app.use('/',tasks);
const start=async ()=>{
    try{
        await connectDb(process.env.MONGO_URL);
        app.listen(5000,console.log('Server is listening on port 5000'));
    }
    catch(error){
        console.log(error);
    }
}
start()
