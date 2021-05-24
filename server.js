const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Node = require("./models/node");
const Graph = require("./graph");

const categories = require("./routes/api/categories");
const items = require("./routes/api/items");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
const url =
  "mongodb+srv://test:test@cluster0.g9mvi.mongodb.net/shop?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) =>
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

const graphObj = new Graph();
mongoose.connection.once("open", () => {
  mongoose.connection.db.collection("nodes", (err, collection) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.log(err);
      } else {
        for (const node of data) {
          if (node.root === "root") {
            graphObj.addVertex(node.name);
          } else {
            graphObj.addEdge(node.root, node.name, node.value);
          }
        }
      }
    });
  });
});

graph = (req, res, next) => {
  req.body.graph = graphObj;
  next();
};

app.use(graph);
app.use("/api/categories/", categories);
app.use("/api/items/", items);

app.get("/api", (req, res) => {
  Node.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
