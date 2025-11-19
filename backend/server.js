const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/connectionDb');
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use('/recipe',require('./Router/recipe'))

app.use('/User',require('./Router/User'))

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running in port ${PORT}`)
})