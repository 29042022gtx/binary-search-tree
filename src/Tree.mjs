import Node from './Node.mjs';

class Tree {
  root = new Node();

  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  deleteItem(value) {
    let parentNode = this.root;
    let node = parentNode;
    while (node != null) {
      if (value == node.data) {
        break;
      }
      parentNode = node;
      if (value < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    
    if (node == null) return;
    if (node.left == null) {
      node = node.right;
    } else {
      node.left.right = node.right;
      node = node.left;
    }

    if (value < parentNode.data) {
      parentNode.left = node
    } else {
      parentNode.right = node
    }
  }

  insert(value) {
    let node = this.root;
    if (node == null) {
      this.root = new Node(value);
      return;
    }
    while (true) {
      if (value < node.data) {
        if (node.left == null) {
          node.left = new Node(value);
          break;
        }
        node = node.left;
        continue;
      }
      if (node.right == null) {
        node.right = new Node(value);
        break;
      }
      node = node.right;
    }
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

console.log('\x1b[2J\x1b[3J\x1b[H');
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const arr = [1, 2, 5, 6, 7];
const tree = new Tree(arr);
tree.insert(8);
prettyPrint(tree.root);
tree.deleteItem(9);
prettyPrint(tree.root);

export default Tree;
