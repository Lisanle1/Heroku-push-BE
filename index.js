const express = require("express");
const dotenv=require('dotenv')
const auth= require ('./modules/authModule')
const registerRouter= require ('./router/registerRouter')
const employeeRouter= require('./router/employeeRouter');
const productRouter=require ('./router/productRouter')
const mongo =require('./connect')
const cors=require('cors')
dotenv.config();
const app = express();
mongo.connect();
app.use(cors());
app.use(express.json());

app.use("/register",registerRouter)
app.use("/",auth.authenticationUser)
app.use("/employees", employeeRouter);// middlewares
app.use("/products",productRouter)
app.listen(process.env.PORT);

