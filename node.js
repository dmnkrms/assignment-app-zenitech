class Node {
  constructor(name, value, root) {
    this.name = name;
    this.value = value ? value : 0;
    this.root = root ? root : "root";
    this.adjacents = [];
  }

  addAdjacent(node) {
    this.adjacents.push(node);
  }

  removeAdjacent(node) {
    const index = this.adjacents.indexOf(node);
    if (index > -1) {
      this.adjacents.splice(index, 1);
      return node;
    }
  }

  getAdjacents() {
    return this.adjacents;
  }
}

module.exports = Node;
