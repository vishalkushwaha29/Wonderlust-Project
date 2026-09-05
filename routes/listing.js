const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const { destination, category } = req.query;
    let filter = {};

    if (destination && destination.trim() !== "") {
      const searchTerm = destination.trim();
      filter.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
        { country: { $regex: searchTerm, $options: "i" } },
      ];
    }

    if (category && category.trim() !== "") {
      filter.category = category.trim();
    }

    const allListings = await Listing.find(filter);

    if (allListings.length === 0 && (destination || category)) {
      req.flash(
        "error",
        `No listings found${destination ? ` for "${destination}"` : ""}${category ? ` in "${category}"` : ""}`,
      );
    }

    const favoriteIds = req.user
      ? req.user.favorites.map((id) => id.toString())
      : [];

    res.render("listings/index.ejs", {
      allListings,
      destination: destination || "",
      category: category || "",
      favoriteIds,
    });
  }),
);

// Favorites — a logged-in user's saved listings.
// Registered before "/:id" so "favorites" isn't mistaken for a listing ID.
router.get(
  "/favorites/mine",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const user = await req.user.populate("favorites");
    const allListings = user.favorites;
    const favoriteIds = allListings.map((l) => l._id.toString());
    res.render("listings/favorites.ejs", { allListings, favoriteIds });
  }),
);

// Toggle a listing as a favorite for the logged-in user (AJAX)
router.post(
  "/:id/favorite",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const user = req.user;
    const alreadyFavorited = user.favorites.some((favId) => favId.equals(id));

    if (alreadyFavorited) {
      user.favorites = user.favorites.filter((favId) => !favId.equals(id));
    } else {
      user.favorites.push(id);
    }
    await user.save();

    res.json({ favorited: !alreadyFavorited });
  }),
);

// New route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }),
);

// create route
router.post(
  "/",
  validateListing,
  upload.single("listing[image]"),
  wrapAsync(async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  }),
);

// Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested does not exist!");
      return res.redirect("/listings");
    }
    let originalImageUrl =
      listing.image && listing.image.url ? listing.image.url : "";
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
  }),
);

//Update route

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
      await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  }),
);

// delete route

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect(`/listings`);
  }),
);

module.exports = router;
