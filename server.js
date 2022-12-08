const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");

const orderRoutes = require("./routes/orders");

const app = express();
dotenv.config();

// Mongo Database...
mongoose.connect(process.env.DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());


app.use("/orders", orderRoutes);



app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});



const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`.bold.magenta)
});