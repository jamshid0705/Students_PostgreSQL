const express = require("express");
const app = express();
const tumanRout = require("../routes/tuman");
const maktabRout = require("../routes/maktab");
const sinfRout = require("../routes/sinf");
const uquvchiRout=require("../routes/uquvchi")

app.use(express.json());
app.use("/api/v1/tuman", tumanRout);
app.use("/api/v1/maktab", maktabRout);
app.use("/api/v1/sinf", sinfRout);
app.use("/api/v1/uquvchilar",uquvchiRout)

module.exports = app;
