const express = require("express");
const cors = require("cors");

const UserRoutes = require("./routes/UserRoutes");
const AdminRoutes = require("./routes/AdminRoutes");

const connectDB = require("./config/mongoose");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/user', UserRoutes);
app.use('/admin', AdminRoutes);

app.listen(port, () => {
  console.log(`mindSparkle backend listening on port ${port}`);
});


