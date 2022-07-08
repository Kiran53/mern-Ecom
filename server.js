const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const config = require('config');
const router = express.Router();
const user= require('./models/User');
const bcrypt=require('bcrypt')
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname+'/client/src'))

// app.use(express.json());
// app.use("/test", router);
// router.route("/").post(function(req, res) {
//   res.send("Not implemented")
// });
// let pd
// bcrypt.hash("123",10,(err,hash)=>{
//   bcrypt.compare("124",hash).then(result=>console.log(result))
// })
app.get('/',(req, res)=> console.log("here"))
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

const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
  .catch((err) => console.log(err));