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
mongoose.connect(process.env.MONGODB_URI || dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
  .catch((err) => console.log(err));
if(process.env.NODE_ENV === 'production'){    
  app.use(express.static('client/build'))  // set static folder 
  //returning frontend for any route other than api 
  app.get('*',(req,res)=>{     
      res.sendFile (path.resolve(__dirname,'client','build',         
                    'index.html' ));    
  });
}