'use strict';

class Stack {
    _data;

    // Constructor to initialize an empty stack
    constructor() {
        this._data = [];
    }

    // Returns the number of elements in the stack
    getSize = () => {
        return this._data.length;
    }

    // Adds an element to the top of the stack
    push = (...element) => {
        this._data.push(...element);
    }

    // Removes and returns the element from the top of the stack
    pop = () => {
        if (this.isEmpty()) {
            throw new Error("ERROR: Trying to pop from an empty stack");
        }
        return this._data.pop();
    }

    // Checks if the stack is empty
    isEmpty = () => {
        return this.getSize() === 0;
    }

    // Prints the stack
    print = () => {
        const text = '| ' + this._data.join(' | ');
        console.log('-'.repeat(text.length));
        console.log(text);
        console.log('-'.repeat(text.length));
    }

    // Returns the element at the top of the stack without removing it
    peek = () => {
        return this._data[this._data.length - 1];
    }

    // Creates a copy of the stack
    copy = () => {
        const newStack = new Stack();
        newStack._data = [...this._data];
        return newStack;
    }
}

const main = () => {
    const stack1 = new Stack();
    stack1.push(10, 9, 8, 7);
    stack1.push(6);
    const stack2 = stack1.copy();
    stack2.push(5);
    stack1.print();
    stack2.print();
    console.log(stack1.peek());
    while (!stack1.isEmpty()) {
        console.log(stack1.pop());
    }
}

main();
