const mongoose = require("mongoose");
const Review = require("./review");

const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title : {
        type : String,
        required : true 
    },
    description : String,
    image: {
             url: String,
             filename: String,
         },
    price : Number,
    location : String,
    country : String,
    category : {
        type: String,
        enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing pools", "Camping", "Farms", "Arctic", "Beachs", "Domes"],
    },
    maxGuests : {
        type: Number,
        default: 1,
        min: 1,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id: {$in : listing.reviews}});
    };
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;