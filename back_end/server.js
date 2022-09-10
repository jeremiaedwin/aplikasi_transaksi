const express = require("express");
const cors = require("cors");
const LocalStrategy = require("passport-local")
const passport = require('passport')  // authentication
const bodyParser = require('body-parser')
const User = require('./app/models/user.model')

const app = express();

//session 
const session = require('express-session'); // express-sessions
const { v4: uuidv4 } = require('uuid'); // uuid, To call: uuidv4();
// body parser
app.use(bodyParser.urlencoded({ extended: false }));
// session
app.use(session({
  genid: function (req) {
    return uuidv4();
  },
  secret: '=fmLV*U@FL`N]]~/zqtFCch.pBTGoU',
  resave: false,
  saveUninitialized: true, 
  cookie: { maxAge: 60 * 60 * 1000 }
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome page." });
});

require("./app/routes/transaksi.routes")(app);
require("./app/routes/app_routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});