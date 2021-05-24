const express = require("express");
const router = express.Router();
const Node = require("../../models/node");

router.get("/", (req, res) => {
  Node.find({ root: "root" })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/:name", (req, res) => {
  const body = req.body;
  const name = req.params.name;
  const root = req.params.root;
  const vertex = body.graph.findVertex(name, root);
  if (vertex) {
    res.json(vertex);
  } else {
    res
      .status(404)
      .send({ success: false, error: { message: "No category found" } });
  }
});

router.post("/", (req, res) => {
  const body = req.body;
  const node = body.graph.addVertex(body.name);
  if (node) {
    const nodeToSave = new Node({
      name: node.name,
      value: node.value,
      root: node.root,
      adjacents: node.adjacents,
    });
    nodeToSave
      .save()
      .then((savedNode) => res.json(savedNode.toJSON()))
      .catch((err) => console.log(err));
  } else {
    res.send({ success: false, error: { message: "Category already exists" } });
  }
});

router.delete("/:name", (req, res) => {
  const body = req.body;
  const name = req.params.name;
  const vertex = body.graph.removeVertex(name);
  if (vertex) {
    Node.findOneAndDelete({ name: name, root: "root" }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted category : ", docs);
        res.status(204).end();
      }
    });
    if (vertex.adjacents != []) {
      var adjacents = vertex.adjacents.map((node) => {
        return node.name;
      });
      Node.deleteMany({ name: adjacents, root: name }, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.status(204).end();
        }
      });
    }
  } else {
    res
      .status(404)
      .send({ success: false, error: { message: "No category found" } });
  }
});

router.get("/:name/sales", (req, res) => {
  const body = req.body;
  const name = req.params.name;

  searchedNodes = body.graph.searchdfs(body.graph.findVertex(name));
  visitedOrder = Array.from(searchedNodes);
  let sales = 0;
  for (const node of visitedOrder) {
    sales += node.value;
  }
  res.json(sales);
});

module.exports = router;
