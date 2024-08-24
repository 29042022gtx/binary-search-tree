import Node from './Node.mjs';

class Tree {
  root = new Node();

  constructor(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++)
        if (arr[j] == arr[i]) {
          arr.splice(j, 1);
          j -= 1;
        }
    }
    arr.sort((a, b) => {
      return a - b;
    });
    this.root = this.buildTree(arr);
  }

  rebalance() {
    const arr = [];
    this.inOrder((node) => {
      arr.push(node.data);
    });
    this.root = this.buildTree(arr);
  }

  isBalanced() {
    let balanced = true;
    this.levelOrder((node) => {
      let leftHeight;
      let rightHeight;
      if (node.left == null) {
        leftHeight = 0;
      } else {
        leftHeight = this.height(node.left);
      }
      if (node.right == null) {
        rightHeight = 0;
      } else {
        rightHeight = this.height(node.right);
      }
      const subtract = leftHeight - rightHeight;
      if (subtract > 1 || subtract < -1) {
        balanced = false;
      }
    });
    return balanced;
  }

  depth(node) {
    let targetNode = this.find(node.data);
    if (targetNode == null) {
      return 0;
    }
    let nodes = [];
    const wrapperNode = new Node();
    wrapperNode.left = this.root;
    let subNodes = [wrapperNode];
    let heightVal = -1;

    while (true) {
      heightVal += 1;
      nodes = subNodes;
      subNodes = [];
      while (nodes.length != 0) {
        targetNode = nodes.pop();
        if (targetNode.left != null) {
          subNodes.push(targetNode.left);
        }
        if (targetNode.right != null) {
          subNodes.push(targetNode.right);
        }
      }
      const gotTarget = subNodes.some((subNode) => {
        return node.data == subNode.data;
      });
      if (gotTarget) {
        break;
      }
    }
    return heightVal;
  }

  height(node) {
    let nodeInTree = this.find(node.data);
    if (nodeInTree == null) {
      return 0;
    }
    let nodes = [];
    let subNodes = [nodeInTree];
    let heightVal = -1;

    while (subNodes.length != 0) {
      heightVal += 1;
      nodes = subNodes;
      subNodes = [];
      while (nodes.length != 0) {
        nodeInTree = nodes.pop();
        if (nodeInTree.left != null) {
          subNodes.push(nodeInTree.left);
        }
        if (nodeInTree.right != null) {
          subNodes.push(nodeInTree.right);
        }
      }
    }
    return heightVal;
  }

  postOrder(callback) {
    function subPostOrder(node) {
      if (node == null) {
        return [];
      }
      return [node]
        .concat(subPostOrder(node.right))
        .concat(subPostOrder(node.left));
    }

    if (callback == null) {
      throw new Error('No callback is specified!');
    }
    const arr = subPostOrder(this.root);
    for (let i = arr.length - 1; i >= 0; i--) {
      callback(arr[i]);
    }
  }

  preOrder(callback) {
    function subPreOrder(node) {
      if (node == null) {
        return [];
      }
      return subPreOrder(node.right)
        .concat(subPreOrder(node.left))
        .concat(node);
    }

    if (callback == null) {
      throw new Error('No callback is specified!');
    }
    const arr = subPreOrder(this.root);
    for (let i = arr.length - 1; i >= 0; i--) {
      callback(arr[i]);
    }
  }

  inOrder(callback) {
    function subInOrder(node) {
      if (node == null) {
        return [];
      }
      return subInOrder(node.right).concat(node).concat(subInOrder(node.left));
    }

    if (callback == null) {
      throw new Error('No callback is specified!');
    }
    const arr = subInOrder(this.root);
    for (let i = arr.length - 1; i >= 0; i--) {
      callback(arr[i]);
    }
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

    if (callback == null) {
      throw new Error('No callback is specified!');
    }
    const root = this.root;
    subLevelOrderRec();
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

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = Math.round((end + start) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  static prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      Tree.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      Tree.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

export default Tree;
