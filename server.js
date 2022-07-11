const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const config = require('config');
require('dotenv').config()
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const cookieParser = require('cookie-parser')
const path = require("path");
const app = express();
app.use(express.json())
app.use(cookieParser())


app.use('/api',authRoutes);
app.use('/api',itemRoutes);
app.use('/api',cartRoutes);
app.use('/api',orderRoutes);

// if(process.env.NODE_ENV === 'production' || 1) {
  //     app.use(express.static('client/build'));
  //     app.get('*', (req, res) => {
    //       res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    //     });
    // }
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '/client/build'))
      })
      const dbURI = 'mongodb+srv://KiranEkom:Oneto34five@cluster0.w8jmi.mongodb.net/?retryWrites=true&w=majority'
      const port = process.env.PORT || 4000;
      mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
      .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port} ` )))
      .catch((err) => console.log(err));
      
      