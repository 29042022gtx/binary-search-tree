import Tree from './Tree.mjs';

console.log('\x1b[2J\x1b[3J\x1b[H');
const arr = [];
for (let i = 0; i < 10; i++) {
  let num = Math.round(Math.random() * 100);
  while (arr.includes(num)) {
    num = Math.round(Math.random() * 100);
  }
  arr.push(num);
}

const tree = new Tree(arr);
Tree.prettyPrint(tree.root);
console.log(`Balanced: ${tree.isBalanced()}`);
tree.levelOrder((node) => {
  console.log(node.data);
});
console.log();
tree.inOrder((node) => {
  console.log(node.data);
});
console.log();
console.log();
tree.preOrder((node) => {
  console.log(node.data);
});
console.log();
tree.postOrder((node) => {
  console.log(node.data);
});

for (let i = 0; i < 5; i++) {
  let num = Math.round(Math.random() * 100) + 100;
  while (arr.includes(num)) {
    num = Math.round(Math.random() * 100) + 100;
  }
  arr.push(num);
  tree.insert(num);
}
console.log(`Balanced: ${tree.isBalanced()}`);
tree.rebalance();
Tree.prettyPrint(tree.root);
console.log(`Balanced: ${tree.isBalanced()}`);
tree.levelOrder((node) => {
  console.log(node.data);
});
console.log();
tree.inOrder((node) => {
  console.log(node.data);
});
console.log();
console.log();
tree.preOrder((node) => {
  console.log(node.data);
});
console.log();
tree.postOrder((node) => {
  console.log(node.data);
});
