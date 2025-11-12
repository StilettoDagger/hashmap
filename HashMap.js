import LinkedList from "./LinkedList.js";

export default class HashMap {
    constructor(capacity = 16, loadFactor = 0.77) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = [];
        this.currentSize = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 1000000;
        }

        return hashCode;
    }

    set(key, value) {
        let index = this.hash(key) % this.capacity;

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds.");
        }

        const bucket = this.buckets[index];
        if (!bucket) {
            const newBucket = new LinkedList();
            this.addEntry(newBucket, key, value)
            this.buckets[index] = newBucket;
            return;
        }

        const nodeIndex = bucket.find(key);

        if (nodeIndex === null) {
            this.addEntry(bucket, key, value);
        }
        else {
            bucket.at(nodeIndex).value = value;
        }

    }

    get(key) {
        const index = this.hash(key) % this.capacity;
    
        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds.");
        }

        const bucket = this.buckets[index];

        if (!bucket) {
            return null;
        }

        const nodeIndex = bucket.find(key);

        return nodeIndex !== null ? bucket.at(nodeIndex).value : null;
    }

    has(key) {
        const index = this.hash(key) % this.capacity;

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds.");
        }

        const bucket = this.buckets[index];

        if (!bucket) {
            return false;
        }

        return bucket.contains(key);
    }

    remove(key) {
        const index = this.hash(key) % this.capacity;

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds.");
        }

        const bucket = this.buckets[index];

        const nodeIndex = bucket.find(key);

        if (nodeIndex === null) {
            throw new Error(`Key ${key} can not be found.`);
        }
        else {
            bucket.removeAt(nodeIndex);
            if (bucket.size === 0) this.buckets[index] = null;
            this.currentSize--;
        }
    }

    length() {
        return this.currentSize;
    }

    clear() {
        this.buckets = [];
        this.currentSize = 0;
    }

    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                let temp = bucket.head;
                while (temp !== null) {
                    keys.push(temp.key);
                    temp = temp.next;
                }
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                let temp = bucket.head;
                while (temp !== null) {
                    values.push(temp.value);
                    temp = temp.next;
                }
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                let temp = bucket.head;
                while (temp !== null) {
                    entries.push([temp.key, temp.value]);
                    temp = temp.next;
                }
            }
        }
        return entries;
    }

    addEntry(bucket, key, value) {
        if (this.currentSize >= this.capacity * this.loadFactor) {
            this.capacity *= 2;
        }
        bucket.append(key, value);
        this.currentSize++;
    }
}