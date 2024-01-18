'use strict';

class Graph {
    _data = [];
    _size = 0;
    _isDirected = false;
    constructor(size, data, isDirected) {
        this._size = size;
        this._isDirected = isDirected;
        this._data = new Array(this._size).fill(null).map(() => new Array(this._size).fill(0));

        data.forEach(([start, end, value]) => {
            this.addEdge(start, end, value);
        })
    }

    // Adding a vertex into graph
    addVertex = (connectedVertices = []) => {
        this._size++;
        const newVertexIndex = this._size - 1;
        this._data[newVertexIndex] = [];
        for (let i = 0; i < this._size; i++) {
            const vertex = connectedVertices.find(vertex => vertex.index === i);
            if (vertex) {
                this.addEdge(newVertexIndex, i, vertex.value)
            } else {
                this._data[newVertexIndex][i] = 0;
                this._data[i][newVertexIndex] = 0
            }
        }
    }

    // Adding an edge into graph
    addEdge = (start, end, value = 1) => {
        if (!this._data[start][end] || this._data[start][end] > value) {
            this._data[start][end] = value;
            if (!this._isDirected) {
                this._data[end][start] = value;
            }
        }
    }

    // Prints graph
    print = () => {
        console.log('\n');
        for (let i = 0; i < this._size; i++) {
            console.log(i, '|\t', this._data[i].join('\t'));
        }
        console.log('\n');
    }

    // Remove vertex from graph
    removeVertex = (vertex) => {
        if (vertex < 0 || vertex >= this._size) {
            console.log('Vertex NOT Found');
            return;
        }
        for (let i = 0; i < this._size; i++) {
            this._data[i].splice(vertex, 1);
        }
        this._data.splice(vertex, 1);
        this._size--;
    }

    // Remove edge from graph
    removeEdge = (start, end) => {
        this._data[start][end] = 0;
        if (!this._isDirected) {
            this._data[end][start] = 0;
        }
    }
    // Returns neighbors of vertex
    getNeighbors = (vertex) => {
        return this._data[vertex].map((v, i) => v ? i : undefined).filter(i => !isNaN(Number(i)));
    }

    // Find shortest path between vertices
    shortestPath = (start, end) => {
        console.log(start, end, this._size);
        if (start < 0 || start >= this._size || end < 0 || end >= this._size) {
            console.log('No path found.');
            return [];
        }
        const visited = new Array(this._size).fill(false);
        const queue = [start];
        const parent = new Array(this._size).fill(-1);
        const values = new Array(this._size).fill(-1);

        visited[start] = true;
        values[start] = 0;
        while (queue.length) {
            const currentVertex = queue.shift();
            const neighbors = this.getNeighbors(currentVertex);
            for (const neighbor of neighbors) {
                const value = values[currentVertex] + this._data[currentVertex][neighbor];
                if (!visited[neighbor] || value < values[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                    parent[neighbor] = currentVertex;
                    values[neighbor] = value;
                }
            }
        }

        const path = [];
        let current = end;
        while (current !== -1) {
            path.unshift(current);
            current = parent[current];
        }

        if (path.length > 1) {
            console.log('Shortest Path:', path.join(' -> '), ': Value is', values[end]);
            return path;
        } else {
            console.log('No path found.');
            return [];
        }
    }

    // Depth-first search
    dfs = (current, parent, visited = new Set(), cb = () => { }) => {
        visited.add(current);
        const neighbors = this.getNeighbors(current);
        for (const neighbor of neighbors) {
            if (neighbor !== parent) {
                if (cb(neighbor)) {
                    return true;
                } else if (!visited.has(neighbor)) {
                    return this.dfs(neighbor, current, visited, cb);
                }
            }
        }
        return false;
    }

    // Print graph in Depth-first search order
    dfsPrint = () => {
        const visited = new Set();
        this._data.forEach((v, startVertex) => {
            if (!visited.has(startVertex)) {
                process.stdout.write('| ' + startVertex + ' | ')
                this.dfs(startVertex, -1, visited, (vertex) => {
                    if (!visited.has(vertex)) {
                        process.stdout.write(vertex + ' | ')
                    }
                });
            }
        });
        process.stdout.write('\n');
    }

    // Breadth-first search
    bfs = (start = 0) => {
        const visited = new Set();
        const queue = [];
        const startVertexes = new Set([start, ...this._data.keys()]);
        startVertexes.forEach(startVertex => {
            if (!visited.has(startVertex)) {
                visited.add(startVertex);
                queue.push(startVertex);
                while (queue.length) {
                    const current = queue.shift();
                    const neighbors = this.getNeighbors(current);
                    neighbors.forEach(neighbor => {
                        if (!visited.has(neighbor)) {
                            queue.push(neighbor);
                            visited.add(neighbor);
                        }
                    })
                }
            }
        });

        console.log([...visited].join(' | '));
    }

    // Checks is grahp cyclic
    isCyclic = () => {
        let isCyclic = false;
        const visited = new Set();

        this._data.forEach((v, startVertex) => {
            if (!visited.has(startVertex) && !isCyclic) {
                isCyclic = this.dfs(startVertex, -1, visited, vertex => visited.has(vertex));
            }
        });

        return isCyclic;
    }
}

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function main() {
    const n = parseInt(readLine().trim(), 10);
    const gb = Array();
    let pair;
    do {
        const line = readLine();
        pair = line && line.replace(/\s+$/g, '').split(' ').map(gbTemp => parseInt(gbTemp, 10));
        pair && gb.push(pair);
    } while (pair?.length);
    const graph = new Graph(n, gb, false);
    graph.print();
    graph.addVertex([{ index: 7, value: 2 }, { index: 8, value: 9 }]);
    graph.addEdge(3, 9, 11);
    graph.print();
    graph.removeVertex(9);
    graph.print();
    graph.shortestPath(0, 8);
    console.log('Is Graph Cyclic ? :', graph.isCyclic());
    graph.dfsPrint();
    graph.removeVertex(8);
    graph.removeVertex(1);
    graph.print();
    graph.bfs(3);
}

// Test Data
// 9
// 0 1 1
// 0 2 2
// 1 4 3
// 4 6 3
// 2 3 4
// 3 5 5
// 5 8 6
// 6 7 7
// 7 8 2
// 1 6 9