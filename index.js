const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const homeDataRouter = require("./routers/homeRouter");
const formRouter = require("./routers/fromRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config("./.env");

const app = express();

//* Setup Middlewares...
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/auth", authRouter);
app.use("/home", homeDataRouter);
app.use("/api", formRouter);
app.get("/", (req, res) => {
  res.status(200).send("OK From Server");
});

const PORT = process.env.PORT || 4001;

dbConnect();

app.listen(PORT, () => {
  console.log(`Listening on Port:${PORT}`);
});
