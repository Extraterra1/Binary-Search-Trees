class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }
  buildTree(arr, start, end) {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const newNode = new Node(arr[middle]);

    newNode.left = this.buildTree(arr, start, middle - 1);
    newNode.right = this.buildTree(arr, middle + 1, end);

    return (this.root = newNode);
  }
  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
  insert(val, node = this.root) {
    if (val === node.data) return 'value must be unique';
    if (val > node.data && node.right) return this.insert(val, node.right);
    if (val > node.data && !node.right) return (node.right = new Node(val));
    if (val < node.data && node.left) return this.insert(val, node.left);
    if (val < node.data && !node.left) return (node.left = new Node(val));
  }

  delete(val) {
    const node = this.find(val);
    if (typeof node !== 'object') return node;
    const nodeHasChildren = !!(node.left || node.right);
    const nodeHasBothChildren = !!(node.left && node.right);
    const leftChild = node.left;
    const rightChild = node.right;

    let root = this.root;
    if (val === this.root.data) {
      const nodeToDelete = root;
      const successor = this.findSmallest(root.right);
      const [successorParent, location] = this.findParent(successor.data);
      nodeToDelete.data = successor.data;
      successorParent[location] = successor.right;
      return;
    }
    while (true) {
      if (root.left && root.left.data === val) {
        if (!nodeHasChildren) return (root.left = null);
        if (nodeHasBothChildren) {
          const nodeToDelete = root.left;
          const successor = this.findSmallest(nodeToDelete.right);

          const [successorParent, location] = this.findParent(successor.data);
          nodeToDelete.data = successor.data;
          successorParent[location] = successor.right;
          return;
        }
        if (nodeHasChildren && !nodeHasBothChildren) {
          let childTmp;
          if (root.right.left) childTmp = [root.right.left, 'left'];
          if (root.right.right) childTmp = [root.right.right, 'right'];
          const [child, childLocation] = childTmp;
          const parent = root.left;
          parent.data = child.data;
          parent[childLocation] = child[childLocation];

          return;
        }
      }
      if (root.right && root.right.data === val) {
        if (!nodeHasChildren) return (root.right = null);
        if (nodeHasBothChildren) {
          const nodeToDelete = root.right;
          let successor = this.findSmallest(nodeToDelete.right);
          const [successorParent, location] = this.findParent(successor.data);
          nodeToDelete.data = successor.data;
          successorParent[location] = successor.right;
          return;
        }
        if (nodeHasChildren && !nodeHasBothChildren) {
          let childTmp;
          if (root.right.left) childTmp = [root.right.left, 'left'];
          if (root.right.right) childTmp = [root.right.right, 'right'];
          const [child, childLocation] = childTmp;
          const parent = root.right;
          parent.data = child.data;
          parent[childLocation] = child[childLocation];

          return;
        }
      }
      if (val < root.data) {
        root = root.left;
      } else {
        root = root.right;
      }
    }
  }

  find(val, node = this.root) {
    if (!node) return 'node not found';
    if (node.data === val) return node;

    if (val < node.data) return this.find(val, node.left);
    return this.find(val, node.right);
  }

  findSmallest(node = this.root) {
    if (!node.left) return node;
    return this.findSmallest(node.left);
  }

  findParent(val, node = this.root) {
    if (this.root.data === val) return null;
    if (node.left.data === val) return [node, 'left'];
    if (node.right.data === val) return [node, 'right'];

    if (val < node.data) return this.findParent(val, node.left);
    if (val > node.data) return this.findParent(val, node.right);
  }

  height(node = this.root) {
    if (!node) return 0;
    const lHeight = this.height(node.left);
    const rHeight = this.height(node.right);

    if (lHeight > rHeight) return lHeight + 1;
    return rHeight + 1;
  }

  levelOrder(callback) {
    const height = this.height();
    const arr = [];
    for (let i = 0; i <= height; i++) {
      this.getLevel(i).forEach((e) => arr.push(e));
    }
    console.log(arr);
    arr.forEach((e) => callback(e));
  }

  getLevel(level, node = this.root) {
    const values = [];
    if (!node) return values;
    if (level === 1) values.push(node.data);
    if (level > 1) {
      values.push(...this.getLevel(level - 1, node.left));
      values.push(...this.getLevel(level - 1, node.right));
    }
    return values;
  }

  preOrder(callback = (e) => values.push(e), node = this.root, values = []) {
    if (!node) return;
    if (node) {
      callback(node.data);
      if (node.left) this.preOrder(callback, node.left, values);
      if (node.right) this.preOrder(callback, node.right, values);
    }
    return values;
  }
  inOrder(callback = (e) => values.push(e), node = this.root, values = []) {
    if (!node) return;
    if (node) {
      if (node.left) this.inOrder(callback, node.left, values);
      callback(node.data);
      if (node.right) this.inOrder(callback, node.right, values);
    }
    return values;
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const tree = new Tree();
tree.buildTree(arr, 0, arr.length - 1);
// tree.insert(11);
// tree.delete(5);
// tree.levelOrder((e) => console.log(`item ${e}`));
// const preorder = tree.preOrder((e) => console.log(e));
// const inOrder = tree.inOrder((e) => console.log(e));

tree.prettyPrint();
