const path = require("path");
const express = require("express");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
require("./db/mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "../views/partials"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/landing"));
app.use("/users", require("./routes/users"));
app.use("/tasks", require("./routes/tasks"));

app.listen(PORT, () => {
  console.log(`The application is running on port: ${PORT}`);
  console.log("Press Ctrl+C to terminate...");
});
