const express=require('express');
const cors=require("cors");
const morgan=require("morgan");
const dotenv=require('dotenv');
const connectDb=require("./config/db");
const { updateMany } = require('./models/userModel');
const { getUserController } = require('./controllers/userController');

//dot en config
dotenv.config();

//DB connection
connectDb();



//rest object
const app= express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

//route

app.use('/api/v1/test',require('./routes/testRoutes'));
app.use('/api/v1/auth',require('./routes/authRoutes'));
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/restaurant',require('./routes/restaurantRoute'));
app.use('/api/v1/category',require('./routes/categoryRoutes'));
app.use('/api/v1/food',require('./routes/foodRoutes'))

app.get('/',(req,res)=>{
    return res.status(200).send("<p>welcone</p>")
});

const PORT=process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    console.log(`sever running on ${PORT}`);
} )

