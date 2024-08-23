import Node from './Node.mjs';

class Tree {
  root = new Node();

  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  levelOrder(callback) {
    if (callback == null) {
      throw new Error('No callback is specified!');
    }
    const queue = [this.root];
    let node;
    while (queue.length != 0) {
      node = queue.shift();
      if (node == null) {
        continue;
      }
      callback(node);
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  levelOrderRec(callback) {
    if (callback == null) {
      throw new Error('No callback is specified!');
    }
    const root = this.root;
    subLevelOrderRec();

    function subLevelOrderRec(arr = [root]) {
      if (arr.length == 0) {
        return [];
      }
      const newArr = [];
      for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
        if (arr[i].left != null) {
          newArr.push(arr[i].left);
        }
        if (arr[i].right != null) {
          newArr.push(arr[i].right);
        }
      }
      subLevelOrderRec(newArr);
    }
  }

  find(value) {
    let node = this.root;
    while (node != null) {
      if (value == node.data) {
        break;
      }
      if (value < node.data) {
        node = node.left;
        continue;
      }
      node = node.right;
    }
    return node;
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
      parentNode.left = node;
    } else {
      parentNode.right = node;
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
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const arr = [1, 2, 5, 6, 7];
const tree = new Tree(arr);
prettyPrint(tree.root);
tree.levelOrder((node) => {
  console.log(node.data);
});
tree.levelOrderRec((node) => {
  console.log(node.data);
});
export default Tree;
