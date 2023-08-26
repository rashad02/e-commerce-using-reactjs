const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const promoRouter = require("./routes/promo-routes");
const userRoutes = require("./routes/user-routes");
const orderRouter = require('./routes/order-routes');
const paymentRouter = require('./routes/payment-routes');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// let
//     MONGODB_URI = "mongodb+srv://daily-solution-db:DAtFo066IiXPMeoC@daily-solution-db.yqjsa.mongodb.net/daily-solution?retryWrites=true&w=majority"

// console.log("aaa: ", MONGODB_URI);
// const connect = mongoose.connect(MONGODB_URI || 'mongodb://localhost/daily-solution', { useUnifiedTopology: true, useNewUrlParser: true });

// connect.then(db => {
//     console.log("Connected Mongo server! ");
// });
const { MongoClient } = require("mongodb");
const username = encodeURIComponent("daily-solution-db");
const password = encodeURIComponent("4uRvx1zvw6NSodkc");
const cluster = "daily-solution-db.yqjsa.mongodb.net";
const authSource = "authDB";
const authMechanism = "DEFAULT";
let uri =
    `mongodb+srv://${username}:${password}@${cluster}/?authMechanism=${authMechanism}`;
const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const database = client.db("daily-solution");
        console.log("aaa: ", database);
        // const ratings = database.collection("<collName>");
        // const cursor = ratings.find();
        // await cursor.forEach(doc => console.dir(doc));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '../client/public'));
app.use(express.static(path.join(__dirname, '../client/build')))


app.use('/payment/', paymentRouter);
app.use('/order/', orderRouter);
app.use('/promo/', promoRouter);
app.use('/user/', userRoutes);


app.listen(port, error => {
    if (error) throw error;
})


app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
})

