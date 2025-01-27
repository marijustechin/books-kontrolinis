const express = require("express");

// endpointai
const userRouter = require("./routers/user.router");
const bookRouter = require("./routers/book.router");
const authorRouter = require("./routers/author.router");

const app = express();

// Midlvares visokios
app.use(express.json());
// app.use(
//   cors({
//     // Dėl slapukų ir cross-origin resource share
//     // turi būti nurodomas fronto URL
//     credentials: true,
//     origin: process.env.CLIENT_URL,
//   })
// );
// app.use(cookieParser());

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/authors", authorRouter);

// sitoj eilej klaidos turi buti paskutines
// app.use(errorsMiddleware);

module.exports = app;
