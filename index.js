const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;
const app = express();
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
mongoose
  .connect("mongodb://127.0.0.1:27017/POSTE_TN")
  .then(() => {
    console.log("connected to DB");
  })
  .catch((error) => {
    console.log(error.message);
  });
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log("application running on " + port);
});
