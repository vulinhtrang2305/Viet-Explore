const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./config/db');
require('dotenv').config();
const app = express();

//api
const spotRouter = require("./src/routers/spotsApi/spot.api")
const CategoryRouter = require("./src/routers/CategoryApi/category.api")
const FavouriteRouter = require("./src/routers/favouriteApi/favourite.api")
const ProvinceRouter = require("./src/routers/ProvinceApi/province.api")
const ReviewRouter = require("./src/routers/ReviewApi/review.api")
const SuggestRouter = require("./src/routers/SuggestApi/suggest.api")
const UserRouter = require("./src/routers/userApi/user.api")
const Upload = require("./upload")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router
app.use("/", spotRouter, CategoryRouter, FavouriteRouter, ProvinceRouter, ReviewRouter, SuggestRouter, UserRouter, Upload)

connectDb();
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});