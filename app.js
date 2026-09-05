if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const dbUrl = process.env.ATLASDB_URL;

// ===============================
// DATABASE CONNECTION
// ===============================

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// ===============================
// APP CONFIGURATION
// ===============================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

// ===============================
// SESSION STORE
// ===============================

const store = MongoStore.create({
  mongoUrl: dbUrl,

  crypto: {
    secret: process.env.SECRET,
  },

  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE");
});

// ===============================
// SESSION OPTIONS
// ===============================

const sessionOptions = {
  store,

  secret: process.env.SECRET,

  resave: false,

  saveUninitialized: true,

  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// ===============================
// SESSION + FLASH
// ===============================

app.use(session(sessionOptions));

app.use(flash());

// ===============================
// PASSPORT
// ===============================

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

// ===============================
// GLOBAL VARIABLES FOR EJS
// ===============================
//
// IMPORTANT:
// currUser will ALWAYS exist.
// Logged in  -> user object
// Logged out -> null
//

app.use((req, res, next) => {
  res.locals.currUser = req.user || null;

  res.locals.success = req.flash("success");

  res.locals.error = req.flash("error");

  next();
});

// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
  res.redirect("/listings");
});

// ===============================
// ROUTES
// ===============================

app.use("/listings", listingsRouter);

app.use("/listings/:id/reviews", reviewsRouter);

app.use("/", userRouter);

// ===============================
// 404 ERROR
// ===============================

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
  console.log("ERROR:", err);

  // Handle MongoDB CastError
  if (err.name === "CastError") {
    err.statusCode = 400;

    err.message = "Invalid listing/review ID.";
  }

  // IMPORTANT:
  // If response has already been sent,
  // don't try to send another response.

  if (res.headersSent) {
    return next(err);
  }

  // Make sure currUser exists
  // while rendering error.ejs

  res.locals.currUser = req.user || null;

  const { statusCode = 500, message = "Something went wrong!" } = err;

  res.status(statusCode).render("error.ejs", { message });
});

// ===============================
// SERVER
// ===============================

const port = process.env.PORT || 8080;

// Vercel/serverless environment
// should not call app.listen()

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

module.exports = app;
