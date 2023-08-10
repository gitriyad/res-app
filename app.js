//Required Variables

let envVariable = require("./config/env");
let express = require("express");
let app = express();
let mongoose = require("mongoose");
let session = require("express-session");
let mongoDbStore = require("connect-mongodb-session")(session);
let path = require("path");
let PORT = process.env.PORT || 3000;
let store = new mongoDbStore({
  uri: envVariable.ConnectionString,
  collection: "sessions",
});
let rootDir = require("./utility/rootDir");
let userRoutes = require("./route/userRoute");

//Execute for All requests

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "view", "views"));
app.use(express.static(path.join(rootDir, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: envVariable.secretKey,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//Rendering Routes

app.use(userRoutes);

//connecting to the database

mongoose
  .connect(envVariable.ConnectionString)
  .then((res) => {
    console.log("Connected");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("connectionError", err);
  });
