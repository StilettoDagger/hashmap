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

        const nodeIndex = bucket.find(key);

        if (nodeIndex === null) {
            bucket.append(key, value);
            this.entries++;
        }
        else {
            bucket.at(nodeIndex).value = value;
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

        const nodeIndex = bucket.find(key);

        return nodeIndex === null ? bucket.at(nodeIndex).value : null;
    }

    has(key) {
        const index = this.hash(key) % this.capacity;

        if (index < 0 || index >= this.buckets.length) {
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

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds.");
        }

        const bucket = this.buckets[index];

        const nodeIndex = bucket.find(key);

        if (nodeIndex === null) {
            throw new Error(`Key ${key} can not be found.`);
        }
        else {
            bucket.remove(nodeIndex);
        }
    }

}