import LinkedList from "./LinkedList.js";

export default class HashMap {
    constructor(capacity = 16, loadFactor = 0.77) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(capacity);
        this.entries = 0;
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

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds.");
        }

        const bucket = this.buckets[index];
        if (!bucket) {
            const newBucket = new LinkedList();
            this.entries++;
            newBucket.append(key, value);
            this.buckets[index] = newBucket;
            return;
        }

        const node = bucket.find(key);

        if (node) {
            node.value = value;
        }
        else {
            bucket.append(key, value);
            this.entries++;
        }

    }

    get(key) {
        const index = this.hash(key) % this.capacity;
    
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds.");
        }

        const bucket = this.buckets[index];

        if (!bucket) {
            return null;
        }

        return bucket.find(key) ? bucket.find(key).value : null;
    }

}