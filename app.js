if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// console.log(process.env.SECRET);

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

// In a serverless environment (Vercel), this module can be re-invoked on
// every cold start. Reconnecting from scratch each time can create many
// rapid, overlapping connections to Atlas, which sometimes causes TLS/SSL
// handshake errors. Caching the connection avoids that.
let isConnecting = null;

async function main() {
  if (mongoose.connection.readyState === 1) {
    // Already connected (warm serverless instance reusing this module).
    return;
  }
  if (!isConnecting) {
    isConnecting = mongoose.connect(dbUrl, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 20000,
      family: 4,
    });
  }
  await isConnecting;
}

const dbReady = main();
dbReady
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
    isConnecting = null;
  });

// Safety net: if a promise rejection anywhere is never explicitly handled,
// log it instead of letting Node crash the whole serverless process. A
// crashed process is why one failed DB connection could break totally
// unrelated requests until Vercel spun up a fresh instance.
process.on("unhandledRejection", (reason) => {
  console.log("Unhandled Rejection (kept process alive):", reason);
});
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception (kept process alive):", err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// On a cold serverless start, the very first request can otherwise reach a
// route before the Mongo connection has finished establishing. Waiting here
// ensures every request (even the first one) only proceeds once the DB is
// actually ready, instead of failing and only succeeding on retry.
app.use(async (req, res, next) => {
  try {
    await dbReady;
    next();
  } catch (err) {
    next(err);
  }
});

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

// app.get("/", (req, res) =>{
//     res.send("Hi, I am root");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// app.get("/demouser", async(req, res) =>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "student123"
//     });

//    let registeredUser = await User.register(fakeUser, "abc123");
//    res.send(registeredUser);
// });

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "Invalid listing/review ID.";
  }
  let { statusCode = 500, message = "Something went wrong!" } = err;

  // Safety net: if this error occurred before the currUser-setting
  // middleware ran, make sure the error page can still render without
  // crashing on an undefined "currUser".
  if (typeof res.locals.currUser === "undefined") {
    res.locals.currUser = req.user || null;
  }
  if (typeof res.locals.success === "undefined") {
    res.locals.success = "";
  }
  if (typeof res.locals.error === "undefined") {
    res.locals.error = "";
  }

  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

const port = process.env.PORT || 8080;

// Vercel (and other serverless platforms) import this module and handle
// invoking it themselves, so only call app.listen() when running locally.
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

module.exports = app;
