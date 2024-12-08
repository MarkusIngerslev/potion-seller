// Node class to represent individual nodes in the tree
class Node {
  constructor(value) {
      this.value = value;
      this.parent = null;
      this.childNodes = [];
  }

  firstChild() {
      return this.childNodes[0] || null;
  }

  lastChild() {
      return this.childNodes[this.childNodes.length - 1] || null;
  }

  hasChildNodes() {
      return this.childNodes.length > 0;
  }

  appendChild(child) {
      if (child.parent) {
          child.parent.removeChild(child);
      }
      child.parent = this;
      this.childNodes.push(child);
      return child;
  }

  removeChild(child) {
      const index = this.childNodes.indexOf(child);
      if (index !== -1) {
          this.childNodes.splice(index, 1);
          child.parent = null;
      }
      return child;
  }

  replaceChild(newChild, oldChild) {
      const index = this.childNodes.indexOf(oldChild);
      if (index !== -1) {
          if (newChild.parent) {
              newChild.parent.removeChild(newChild);
          }
          this.childNodes[index] = newChild;
          newChild.parent = this;
          oldChild.parent = null;
      }
      return oldChild;
  }
}

// Tree class to manage the tree structure
export default class Tree {
  constructor() {
      this.root = null;
  }

  dump(node = this.root, level = 0) {
      if (!node) return;
      
      console.log("  ".repeat(level) + node.value);
      for (const child of node.childNodes) {
          this.dump(child, level + 1);
      }
  }

  addValue(value) {
      const newNode = new Node(value);
      if (!this.root) {
          this.root = newNode;
      } else {
          // Simple strategy: add as child to the leftmost bottom node
          let current = this.root;
          while (current.hasChildNodes()) {
              current = current.firstChild();
          }
          current.appendChild(newNode);
      }
      return newNode;
  }

  findValue(value) {
      const search = (node) => {
          if (!node) return null;
          if (node.value === value) return node;
          
          for (const child of node.childNodes) {
              const result = search(child);
              if (result) return result;
          }
          return null;
      };
      
      return search(this.root);
  }

  removeValue(value) {
      const node = this.findValue(value);
      if (!node) return null;
      
      if (node === this.root) {
          this.root = null;
      } else {
          node.parent.removeChild(node);
      }
      return node;
  }
}