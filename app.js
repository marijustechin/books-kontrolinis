const express = require("express");
const cookieParser = require("cookie-parser"); // refreshToken saugosime cookies
const errorsMiddleware = require("./middlewares/error.middleware");

// endpointai
const userRouter = require("./routers/user.router");
const bookRouter = require("./routers/book.router");
const authorRouter = require("./routers/author.router");

const app = express();

// Midlvares visokios
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/authors", authorRouter);

// sitoj eilej klaidos turi buti paskutines
app.use(errorsMiddleware);

module.exports = app;
