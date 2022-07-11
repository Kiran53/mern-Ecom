import express, { json } from 'express';
import { connect } from 'mongoose';
// const path = require('path');
import { util } from 'config';
require('dotenv').config()
import authRoutes from './routes/auth';
import itemRoutes from './routes/item';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/order';
import cookieParser from 'cookie-parser';
import path from "path";
const app = express();
app.use(json())
app.use(cookieParser())

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
    // app.use(express.static(path.join(__dirname, '/client/build')))
    // app.get('*', (req, res) => {
      //     res.sendFile(path.join(__dirname, '/client/build'))
      // })
      // const dbURI = config.get('dbURI');
      const dbURI = `mongodb+srv://KiranEkom:Oneto34five@cluster0.w8jmi.mongodb.net/?retryWrites=true&w=majority`
      const port = process.env.PORT || 4000;
      connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
      .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`+ util.getEnv('NODE_ENV') )))
      .catch((err) => console.log(err));
      
      