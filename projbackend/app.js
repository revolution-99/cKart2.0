// This is the file where database is connected i.e. MongoDB connection with database
// NOTE:: .env file don't get uploaded on GitHub repository or server usually
require("dotenv").config();

// Proper order is not required when we are requring datas. We can place in whatever the way we like to place
const mongoose = require("mongoose");
// Express is required here to listen to the commands
const express = require("express");
// This app will use the express
const app = express();

// Declaration of the middle wires requirements
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// A single slash (/) is used to go back to the previous folder. You can name it "auth" also since the whole enviroment is og javaScript, but "auth.js" is my preferable and ya it's good. It's just like the img src="" in CSS.

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
// For payment using paypal
const paymentRoutes = require("./routes/payment")

// DATABASE Connection
mongoose
// Process is the thing where we can store all the environment variables.
// Remember you have to use the same name as of in .env file. Here the name is "DATABASE"
  .connect(process.env.DATABASE, {
    // These 3 are the syntaxes which will keep the database connection alive. Among these useNewUrlParser is mandatory.
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch( () => {
    console.log("Check the spelling. You are wrong here.")
  })
// Just like "myFunc().run().then().catch()" . It's just like a try and catch block. The then portion runs if there is a success in run() otherwise catch() portion runs.

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// MY ROUTES
// After using the "/api", whennever we have to access the websites, we have to put "/api" before it. Because it's the medium through which all the routes will pass.

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes)
app.use("/api", orderRoutes)
app.use("/api", paymentRoutes)

// PORT
// Process.env.PORT is used because whenever the project is uploaded in in host like digital ocean or AWS then the port is process.env.PORT not 3000. 3000 is the local port which will work in localhost only.
const port = process.env.PORT || 3000;
// STARTING A SERVER
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
