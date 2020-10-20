//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const itemsSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Pen"
});
const item2 = new Item({
  name: "Pencil"
});
const item3 = new Item({
  name: "Eraser"
});
const defaultItems = [item1, item2, item3];



app.get("/", function(req, res) {

  Item.find({}, function(err, founditems) {

    if (founditems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("yay saved the first items");
        }
      });
      res.redirect("/");
    } else {

      res.render("list", {
        listTitle: "Today",
        newListItems: founditems
      });

    }

  });
});

app.post("/", function(req, res) {

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  })
item.save();
res.redirect("/");

});

app.post("/delete", function(req, res) {
  const deletingItem = (req.body.checkbox)

  Item.findByIdAndRemove(deletingItem, function(err){
    if(!err)
    {
      console.log("deleted!");
      res.redirect("/");
    }
  });
});


app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
