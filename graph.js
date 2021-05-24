const Node = require("./node");

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addVertex(name, value, root) {
    const parent = root ? root : "root";
    const key = { [name]: parent };

    const exisiting = this.findVertex(name, parent);
    if (exisiting) {
      return null;
    } else {
      const vertex = new Node(name, value, root);
      this.nodes.set(key, vertex);
      return vertex;
    }
  }

  removeVertex(name, root) {
    const parent = root ? root : "root";
    const key = { [name]: parent };
    for (let k of this.nodes.keys()) {
      if (JSON.stringify(key) === JSON.stringify(k)) {
        let rootNode = {};
        if (parent === "root") {
          rootNode = this.findVertex(name);
        } else {
          rootNode = this.findVertex(root);
        }

        if (rootNode.getAdjacents() != []) {
          rootNode.removeAdjacent(this.nodes.get(k));
        }
        this.nodes.delete(k);
        return rootNode;
      }
    }
    return null;
  }

  findVertex(name, root) {
    const parent = root ? root : "root";
    const key = { [name]: parent };
    for (let k of this.nodes.keys()) {
      if (JSON.stringify(key) === JSON.stringify(k)) {
        return this.nodes.get(k);
      }
    }
    return null;
  }

  addEdge(sourceName, destinationName, value) {
    const sourceNode = this.findVertex(sourceName);
    const destinationNode = this.addVertex(destinationName, value, sourceName);

    if (!sourceNode || !destinationNode) {
      return null;
    } else {
      sourceNode.addAdjacent(destinationNode);
      return [sourceNode, destinationNode];
    }
  }

  *searchdfs(first) {
    const visited = new Map();
    const visitList = [];

    visitList.push(first);

    while (visitList.length > 0) {
      const node = visitList.pop();
      if (node && !visited.has(node)) {
        yield node;
        visited.set(node);
        node.getAdjacents().forEach((adj) => visitList.push(adj));
      }
    }
  }
}

module.exports = Graph;
