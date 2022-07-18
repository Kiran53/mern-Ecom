const express = require('express');
const mongoose = require('mongoose');
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


app.use('/api', authRoutes);
app.use('/api', itemRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);

app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build'))
})
// console.log(process.env.dbURI)
const dbURI = process.env.dbURI
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port} `)))
  .catch((err) => console.log(err));

