const path = require("node:path")
const express = require("express")
const app = express()
const assetsPath = path.join(__dirname, "public")
app.use(express.static(assetsPath))
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const dotenv = require('dotenv');
dotenv.config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })) 

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

const db = require("./db/pool")


app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [username]);
      const user = rows[0];

      if (!user) {
        console.log("Incorrect Username")
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.hashed_password);
      if (!match) {
        console.log("Incorrect Password")
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});


const signUpFormRoute = require("./routes/sign-up-formRoute")
app.use("/sign-up", signUpFormRoute)

const signInFormController = require("./routes/sign-in-formRoute")
app.use("/sign-in", signInFormController)

const postRoute = require("./routes/postRoute")
app.use("/post", postRoute)

const memberShipRoute = require("./routes/membershipRoute")
app.use("/membership", memberShipRoute)

app.get('/', function (req, res) {
    res.render('index');
})

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


app.listen(process.env.PORT || 3000, (error) => {
  if (error) {
    throw error
  }
  console.log(`My first Express app - listening on port ${process.env.PORT || 3000}!`)
})