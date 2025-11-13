import LinkedList from "./LinkedList.js";

export default class HashSet {
    constructor(capacity = 16, loadFactor = 0.77) {
        this.initialCapacity = capacity;
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

    set(key) {
        let index = this.hash(key) % this.capacity;

        if (index < 0 || index >= this.capacity) {
            throw new Error("Trying to access index out of bounds.");
        }

        const bucket = this.buckets[index];
        if (!bucket) {
            this.buckets[index] = new LinkedList(key, null);
            this.currentSize++;
            return;
        }

        const nodeIndex = bucket.find(key);

        if (nodeIndex === null) {
            this.addEntry(bucket, key);
        }
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

        if (!bucket) return false;

        const nodeIndex = bucket.find(key);

        if (nodeIndex === null) {
            return false;
        }
        else {
            bucket.removeAt(nodeIndex);
            if (bucket.size === 0) this.buckets[index] = null;
            this.currentSize--;
            return true;
        }
    }

    length() {
        return this.currentSize;
    }

    clear() {
        this.capacity = this.initialCapacity;
        this.buckets = [];
        this.currentSize = 0;
    }

    entries() {
        const entries = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                let temp = bucket.head;
                while (temp !== null) {
                    entries.push(temp.key);
                    temp = temp.next;
                }
            }
        }
        return entries;
    }

    addEntry(bucket, key) {
        if (this.currentSize >= this.capacity * this.loadFactor) {
            this.resizeSet();
            this.set(key);
        }
        else {
            bucket.append(key, null);
            this.currentSize++;
        }
    }

    resizeSet() {
        const newCapacity = this.capacity *= 2;
        const keys = this.entries();
        this.clear();
        this.capacity = newCapacity;
        for (const k of keys) {
            this.set(k);
        }
    }
}