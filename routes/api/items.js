const express = require("express");
const router = express.Router();
const Node = require("../../models/node");

router.post("/", (req, res) => {
  const body = req.body;
  const edge = body.graph.addEdge(body.root, body.name, body.value);

  if (edge) {
    const sourceNode = edge[0];
    const destinationNode = edge[1];
    const itemToSave = new Node({
      name: destinationNode.name,
      value: destinationNode.value,
      root: destinationNode.root,
      adjacents: destinationNode.adjacents,
    });
    itemToSave
      .save()
      .then((savedItem) => res.json(savedItem.toJSON()))
      .catch((err) => console.log(err));

    // Update source node adjacency array
    Node.findOneAndUpdate(
      { name: sourceNode.name, root: sourceNode.root },
      sourceNode,
      function (err, doc) {
        if (err) return res.status(500, { error: err });
      }
    );
  } else {
    res
      .status(400)
      .send({ success: false, error: { message: "Item already exists" } });
  }
});

router.delete("/:name/:root", (req, res) => {
  const body = req.body;
  const name = req.params.name;
  const root = req.params.root;
  const rootNode = body.graph.removeVertex(name, root);
  if (rootNode) {
    Node.findOneAndDelete({ name: name, root: root }, (err, doc) => {
      if (err) console.log(err);
    });

    Node.findOneAndUpdate({ name: root, root: "root" }, rootNode, (err) => {
      if (err) console.log(err);
    });
    res.status(204).end();
  } else {
    res
      .status(404)
      .send({ success: false, error: { message: "Item not found" } });
  }
});

module.exports = router;
