const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const promoRouter = require("./routes/promo-routes");
const userRoutes = require("./routes/user-routes");
const orderRouter = require('./routes/order-routes');
const paymentRouter = require('./routes/payment-routes');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

const connect = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/daily-solution', {useUnifiedTopology: true, useNewUrlParser: true});

connect.then( db => {
    console.log("Connected Mongo server! ");
  });
  
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get("*", function(req, res){
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
    if(error) throw error;
})


app.get('*', (req,res)=> {
    res.setHeader('Content-Type', 'text/html');

    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
})

