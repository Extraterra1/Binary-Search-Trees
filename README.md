# Binary Tree Implementation

This repository contains a simple implementation of a Binary Tree in JavaScript. The code includes a `Node` class and a `Tree` class with various methods to manage and manipulate binary trees.

## Node Class

The `Node` class represents a node in the binary tree. It has the following attributes:

- `data`: The data contained in the node.
- `left`: A reference to the left child node.
- `right`: A reference to the right child node.

## Tree Class

The `Tree` class is used to manage the binary tree. It includes the following methods:

### `buildTree(arr, start, end)`

This method builds a binary search tree from a sorted array. It takes an array, the start index, and the end index as parameters and returns the root node of the constructed tree.

### `prettyPrint(node, prefix, isLeft)`

This method prints a visual representation of the binary tree in a human-readable format. It is used for debugging and visualization.

### `insert(val, node)`

Inserts a new node with the given value into the binary tree. It returns an error message if the value is not unique.

### `delete(val)`

Deletes a node with the given value from the binary tree.

### `find(val, node)`

Finds and returns a node with the specified value in the binary tree.

### `findSmallest(node)`

Finds and returns the smallest node in the binary tree.

### `findParent(val, node)`

Finds and returns the parent node of a node with the specified value in the binary tree.

### `height(node)`

Calculates and returns the height of the binary tree.

### `levelOrder(callback)`

Performs a level-order traversal of the binary tree and returns an array of node values. If a callback function is provided, it can be used to process each node during traversal.

### `preOrder(callback)`

Performs a pre-order traversal of the binary tree and returns an array of node values. If a callback function is provided, it can be used to process each node during traversal.

### `inOrder(callback)`

Performs an in-order traversal of the binary tree and returns an array of node values. If a callback function is provided, it can be used to process each node during traversal.

### `postOrder(callback)`

Performs a post-order traversal of the binary tree and returns an array of node values. If a callback function is provided, it can be used to process each node during traversal.

### `depth(node)`

Calculates and returns the depth of a specific node in the binary tree.

### `isBalanced()`

Checks whether the binary tree is balanced (the height of the left and right subtrees differs by at most 1).

### `rebalance()`

If the tree is unbalanced, this method rebalances it to ensure that it is a balanced binary search tree.

## Usage

To create and interact with a binary tree, you can use the provided code examples in the repository. Simply follow the code comments and customize it according to your requirements.

For example, you can construct a binary tree from a sorted array, insert and delete nodes, and perform various tree traversals.

## Example

Here is an example of how to use the binary tree implementation:

```javascript
const arr = getRandomArray(10);
const tree = new Tree();
tree.buildTree(arr, 0, arr.length - 1);
console.log('Printing Level Order');
console.log(tree.levelOrder());
console.log('Printing Pre Order');
console.log(tree.preOrder());
console.log('Printing In Order');
console.log(tree.inOrder());
console.log('Printing Level Order');
console.log(tree.postOrder());
```
