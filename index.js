const express = require ("express");
const mongoose = require("mongoose");
const cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

require('dotenv').config();
const cardRouter = require('./routes/card');

const connectDB = async () => {
    const options = {
        autoIndex: true, 
        useNewUrlParser: true, 
    }
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@flashcard.txiwu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, options);
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
}

connectDB();
const app = express();

app.use(express.json());

app.use(express.urlencoded());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/card', cardRouter)

const PORT = 5000;
app.listen(5000, () => console.log(`Server started on 5000: 5000`))