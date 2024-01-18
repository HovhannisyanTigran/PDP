class Node {
    constructor(v) {
        this.val = v;
        this.left = null;
        this.right = null;
        this.ht = 0;
    }
    BF() {
        return (this.left?.ht ?? -1) - (this.right?.ht ?? -1);
    }
}

class Tree {
    constructor(values) {
        values.forEach(value => {
            this.push(value);
        })
    }

    push(value) {
        if (!this.root) {
            this.root = new Node(value);
        } else {
            this.root = this.insert(value);
        }
    }

    insert(value, root = this.root) {
        if (value > root.val) {
            if (!root.right) {
                root.right = new Node(value);
                if (!root.left) {
                    root.ht++;
                }
                return root;
            }
            root.right = this.insert(value, root.right);
            root.ht = Math.max(root.left?.ht || 0, root.right?.ht || 0) + 1;
            const bf = root.BF();
            if (bf < -1 || bf > 1) {
                if (root.right.BF() < 0) {
                    return this.rightRight(root);
                } else {
                    return this.rightLeft(root);
                }
            }
        } else {
            if (!root.left) {
                root.left = new Node(value);
                if (!root.right) {
                    root.ht++;
                }
                return root;
            }
            root.left = this.insert(value, root.left);
            root.ht = Math.max(root.left?.ht || 0, root.right?.ht || 0) + 1;
            const bf = root.BF();
            if (bf < -1 || bf > 1) {
                if (root.left.BF() < 0) {
                    const aaa = this.leftRight(root);
                    return aaa;
                } else {
                    return this.leftLeft(root);
                }
            }
        }
        return root;
    }

    rightRight(root) {
        const newRoot = root.right;
        root.right = root.right.left;
        newRoot.left = root;
        root.ht -= 2;
        return newRoot;
    }

    rightLeft(root) {
        const newRoot = root.right.left;
        const tmp = newRoot.left;
        newRoot.left = root;
        root.right.left = root.right.left.right;
        newRoot.right = root.right;

        root.right = tmp;
        newRoot.ht++;
        newRoot.left.ht -= 2;
        newRoot.right.ht--;
        return newRoot;
    }

    leftLeft(root) {
        const newRoot = root.left;
        root.left = newRoot.right;
        newRoot.right = root;
        newRoot.right.ht -= 2;
        return newRoot;
    }

    leftRight(root) {
        const newRoot = root.left.right;
        const tmp = newRoot.right;
        newRoot.right = root;
        root.left.right = root.left.right.left;
        newRoot.left = root.left;
        root.left = tmp;
        newRoot.ht++;
        newRoot.left.ht--;
        newRoot.right.ht -= 2;
        return newRoot;
    }

    inOrder(root = this.root) {
        if (!root) {
            return '';
        }
        return this.inOrder(root.left) + root.val + '(BF=' + root.BF() + ') ' + this.inOrder(root.right);
    }

    preOrder(root = this.root) {
        if (!root) {
            return '';
        }
        return root.val + '(BF=' + root.BF() + ') ' + this.preOrder(root.left) + this.preOrder(root.right);
    }
}

function processData(input) {
    const values = input.split('\n')[1].split(' ').map(Number);
    const tree = new Tree([...values]);
    tree.push(Number(input.split('\n')[2]));
    console.log('In order', tree.inOrder());
    console.log('Pre order', tree.preOrder());
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});


// Input (stdin)
// 6
// 17 6 10 18 22 16
// 21
//
// Expected Output
// 6(BF=0) 10(BF=0) 16(BF=0) 17(BF=0) 18(BF=0) 21(BF=0) 22(BF=0)
// 17(BF=0) 10(BF=0) 6(BF=0) 16(BF=0) 21(BF=0) 18(BF=0) 22(BF=0)
