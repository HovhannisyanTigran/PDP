'use strict';

class Queue {
    _data;

    // Constructor to initialize an empty queue
    constructor() {
        this._data = [];
    }

    // Adds an element to the rear of the queue
    enqueue = (...element) => {
        this._data.push(...element);
    }

    // Removes and returns the element from the front of the queue
    dequeue = () => {
        return this._data.shift();
    }

    // Returns the element at the front of the queue without removing it
    front = () => {
        return this._data[0];
    }

    // Returns the number of elements in the queue
    getSize = () => {
        return this._data.length;
    }

    // Checks if the queue is empty
    isEmpty = () => {
        return this.getSize() === 0;
    }

    // Prints the elements of the queue
    print = () => {
        const text = '| ' + this._data.join(' | ') + ' |';
        console.log('-'.repeat(text.length));
        console.log(text);
        console.log('-'.repeat(text.length));
    }

    // Creates a deep copy of the current queue
    copy = () => {
        const newQueue = new Queue();
        newQueue._data = [...this._data];
        return newQueue;
    }
}

const main = () => {
    const q1 = new Queue();
    q1.enqueue(1, 2, 3, 4);
    q1.enqueue(5);
    const q2 = q1.copy();
    q2.enqueue(6, 7);
    q1.print();
    q2.print();
    while (!q1.isEmpty()) {
        console.log(q1.dequeue());
    }
}

main();
