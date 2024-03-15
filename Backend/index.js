import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.connection.js";
import userRoutes from "./routes/user.router.js";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type",
        "Content-Type: multipart/form-data"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// Connect database
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully");
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });

// Table creation
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Tables created");
    })
    .catch((error) => {
        console.error("Unable to create tables: ", error);
    });

// Main Routes
app.use("/user", userRoutes);

// Run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
