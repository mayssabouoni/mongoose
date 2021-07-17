const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();

// Installing and setting up Mongoose:
const DB = process.env.MONGO_URI.replace("<password>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB is connected"));

// Create a person with this prototype:
let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
let Person = mongoose.model("Person", personSchema);

//Create and Save a Record of a Model:
const person=new Persons({
    name:"sana",
    age: "30",
    favouriteFoods:["chocolat","burritos"]
    });
    person.save((err)=>{
    (err)? console.log('err',err): console.log('done') 
    });

    //Create Many Records with model.create():
    Persons.create([
        {name:"raja",age:"36", favouriteFoods:["fish","hamburger"]},
        {name:"Sonia",age:"30", favouriteFoods:["lazaniya","orange"]}]
        ,(err)=>{
        (err)? console.log('err',err): console.log('done') 
    });

    //Use model.find() to Search Your Database:
    Persons.find({ name: "sana" }, (err, data) => {
        if (err) console.log(err);
        console.log(data);
      });
   
    //Use model.findOne() to Return a Single Matching Document from Your Database:
    Persons.findOne({ favoriteFoods: { $all: ["fish"] } }, (err, data) => {
        if (err) console.log(err);
        console.log(data);
      });

      
      //Use model.findById() to Search Your Database By _id:
      Persons.findById("60b9170c1b99461510ff8078", (err, data) => {
        if (err) console.log(err);
        console.log(data);
      });
      

    //Perform Classic Updates by Running Find, Edit, then Save:
    Persons.findById("60b9170c1b99461510ff8078", (err, result) => {
        if (err) console.log(err);
        result.favoriteFoods.push("hamburger");
        result.save((err, data) => {
          console.log(data);
        });
      });
      


    //Perform New Updates on a Document Using model.findOneAndUpdate():
    Persons.findOneAndUpdate({ name: "sana" }, { age: 20 }, (err, data) => {
        if (err) console.log(err);
        console.log(data);
      });

    //Delete One Document Using model.findByIdAndRemove:
       Persons.findOneAndRemove({ name: "raja" }, (err, data) => {
        if (err) console.log(err);
        console.log(data);
      });

     //MongoDB and Mongoose - Delete Many Documents with model.remove():
     Persons.remove({ name: "sana" }, (err, data) => {
        if (err) console.log(err);
        console.log(data);
      });
     
    //Chain Search Query Helpers to Narrow Search Results:
  Persons.find({ favoriteFoods: { $all: ["burritos"] } })
  .sort({ age: "asc" })
  .limit(1)
  .select("name")
  .exec((err, data) => {
    if (err) console.log(err);
    console.log(data);
  });


// to start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});