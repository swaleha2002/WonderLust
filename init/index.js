const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL ="mongodb://127.0.0.1:27017/WanderLust";

main()
.then(()=>{
    console.log("connected to DB")
})
.catch((err)=>{
console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    //to clean any data present previously
    await Listing.deleteMany({});
     initData.data = initData.data.map((obj) => ({
       ...obj, owner: "6571961246ccbd52b43bfbde"
}));
    
    await Listing.insertMany(initData.data);//initData is object in data.js
    console.log("Data was initialised");
};
initDB();