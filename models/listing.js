const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review= require("./review.js");

const listingSchema=new Schema({
    title:{
    type:String,
    required:true,
    },
    description:String,
    image:{
        type:String,
        set:(v)=>v===""?"https://unsplash.com/photos/silhouette-of-plant-during-sunset-xg8z_KhSorQ":v,//v-->original value
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
      type:Schema.Types.ObjectId,
      ref:"Review"

        }
    ],
    Owner:{
        type:Schema.Types.ObjectId,
        ref:"Users",
    },
});

listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){
await Review.deleteMany({_id :{$in:listing.reviews}})
}
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;