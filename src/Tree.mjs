import Node from './Node.mjs';

class Tree {
  root = new Node();

  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(array, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const mid = Math.round((end + start) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

console.clear();
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const tree = new Tree(arr);
prettyPrint(tree.root);

export default Tree;
