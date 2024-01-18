class HashTable {
    // Initializing HashTable
    constructor(size = 10) {
        this.size = size;
        this.table = new Array(size).fill(null).map(() => []);
    }

    // Convert a key into index
    hash = (key) => {
        key = String(key);
        let hashValue = 0;
        let charCode = 0;
        for (let i = 0; i < key.length; i++) {
            charCode = key.charCodeAt(i);
            hashValue = (hashValue * 14215) + hashValue + charCode;
        }
        return Math.abs(hashValue % this.size);
    }

    // Check if the key exists
    has = (key) => {
        const index = this.hash(key);
        return !!this.table[index].find(item => item.key === key);
    }

    // Insert or update a key-value pair
    set = (key, value) => {
        const index = this.hash(key);
        const existingItem = this.table[index].find(item => item.key === key);
        if (existingItem) {
            existingItem.value = value;
            return;
        }
        this.table[index].push({ key, value });
    }

    // Get the value by key
    get = (key) => {
        const index = this.hash(key);
        return this.table[index].find(item => item.key === key);
    }

    // Remove a key-value pair
    remove = (key) => {
        const index = this.hash(key);
        const initialLength = this.table[index].length;
        this.table[index] = this.table[index].filter(item => item.key !== key);
        return initialLength !== this.table[index].length;
    }

    // Print hash table
    print = () => {
        for (let i = 0; i < this.size; i++) {
            console.log(`${i}:`, this.table[i].map(entry => `${entry.key}: ${entry.value}`).join(' | '));
        }
        console.log('\n');
    }
}

const main = () => {
    const hashTable = new HashTable();

    hashTable.set(1, 3);
    hashTable.set(2, 5);
    hashTable.set(3, 7);
    hashTable.set(4, 9);
    hashTable.set(5, 11);
    hashTable.set("one", "One");
    hashTable.set("two", 2);
    hashTable.set("three", "III");

    console.log(hashTable.get("one"));
    console.log(hashTable.get("two"));
    console.log(hashTable.get("three"));

    console.log("HAS one", hashTable.has("one"));
    console.log("HAS four", hashTable.has("four"));

    hashTable.remove("one");
    console.log("After remove 'one'");
    hashTable.print();
    hashTable.set(5, 23);
    hashTable.print();
}

main();
