'use strict';

class Node {
    _data;
    _next;
    constructor(data, next = null) {
        this._data = data;
        this._next = next;
    }
}

class LinkedList {
    _head;
    _size;
    constructor() {
        this._head = null;
        this._size = 0;
    }

    // Inserts new node with given data to end of list
    insertLast = (data) => {
        if (this.isEmpty()) {
            return this.insertFirst(data);
        }
        let current = this._head;
        while (current._next) {
            current = current._next;
        }
        current._next = new Node(data);
        this._size++;
    }

    // Inserts new node with given data to start of list
    insertFirst = (data) => {
        this._head = new Node(data, this._head);
        this._size++;
    }

    // Inserts new node with given data after given value
    insertAfter = (nodeValue, newValue) => {
        let current = this._head;
        while (current) {
            if (current._data === nodeValue) {
                current._next = new Node(newValue, current._next);
                this._size++;
            }
            current = current._next;
        }
    }

    // Inserts new node with given data before given value
    insertBefore = (nodeValue, newValue) => {
        if (this.isEmpty()) {
            return;
        }

        if (this._head._data === nodeValue) {
            return this.insertFirst(newValue);
        }

        for (let current = this._head; current; current = current._next) {
            if (current._next._data === nodeValue) {
                current._next = new Node(newValue, current._next);
                this._size++;
                return;
            }
        }
    }

    // Removes last node of the list
    deleteLast = () => {
        if (this.isEmpty()) {
            return;
        }
        if (!this._head._next) {
            this._size--;
            const deletedValue = this._head._data;
            this._head = null;
            return deletedValue;
        }
        let current = this._head;
        while (current._next._next) {
            current = current._next;
        }
        const deletedValue = current._next._data;
        this._size--;
        current._next = null;
        return deletedValue;
    }

    // Removes first node of the list
    deleteFirst = () => {
        if (this.isEmpty()) {
            return;
        }
        this._head = this._head._next;
        this._size--;
    }

    // Removes node with given value from the list
    delete = (value) => {
        if (this.isEmpty()) {
            return;
        }
        if (this._head._data === value) {
            return this.deleteFirst();
        }
        for (let current = this._head; current._next; current = current._next) {
            if (current._next._data === value) {
                current._next = current._next._next;
                this._size--;
                return;
            }
        }
    }

    // Clears the list
    clear = () => {
        this._head = null;
        this._size = 0;
    }

    // Finds and returns node with given value
    find = (value) => {
        let current = this._head;
        while (current) {
            if (current._data === value) {
                return current;
            }
            current = current._next;
        }
    }

    // Checks if the list is empty
    isEmpty = () => {
        return this._size === 0;
    }

    // Reverses the list
    reverse() {
        let prev = null;
        let current = this._head;
        let nextNode = null;
        while (current) {
            nextNode = current._next;
            current._next = prev;
            prev = current;
            current = nextNode;
        }
        this._head = prev;
    }

    // Prints the list
    print = (message = '') => {
        if (this.isEmpty()) {
            console.log(message, '\t', 'List is empty');
            return;
        }

        let current = this._head;
        const values = [];
        while (current) {
            values.push(current._data);
            current = current._next;
        }
        console.log(message, '\t', values.join('->'));
    }
}

const main = () => {
    const ll = new LinkedList();
    ll.print('Initial');
    ll.insertLast(10);
    ll.print('Inserted 10');
    ll.insertFirst(11);
    ll.print('Inserted 11');
    ll.insertLast(22);
    ll.insertFirst(33);
    ll.print('Inserted 22 33');
    console.log('Find 10', ll.find(10));
    ll.insertAfter(10, 13);
    ll.print('Inserted 13 after 10');
    ll.insertBefore(11, 24);
    ll.print('Inserted 24 after 11');
    ll.insertLast(15);
    ll.print('Inserted 15');
    ll.reverse();
    ll.print('Reverse');
    ll.delete(33);
    ll.print('Deleted 33');
    ll.delete(22);
    ll.print('Deleted 22');
    ll.delete(10);
    ll.print('Deleted 10');
    ll.deleteLast();
    ll.print('Deleted Last');
    ll.print('FInal');
}

main();
