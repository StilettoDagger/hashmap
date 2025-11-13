import HashMap from "./HashMap.js";

const hashMap = new HashMap(16, 0.75);

hashMap.set('apple', 'red')
hashMap.set('banana', 'yellow')
hashMap.set('carrot', 'orange')
hashMap.set('dog', 'brown')
hashMap.set('elephant', 'gray')
hashMap.set('frog', 'green')
hashMap.set('grape', 'purple')
hashMap.set('hat', 'black')
hashMap.set('ice cream', 'white')
hashMap.set('jacket', 'blue')
hashMap.set('kite', 'pink')
hashMap.set('lion', 'golden')

console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
console.log(hashMap.length);

console.log(hashMap.entries);
console.log(hashMap);

hashMap.set("moon", "silver");

console.log(hashMap);
console.log(hashMap.entries());


console.log(hashMap.has("lion"));
console.log(hashMap.has("moon"));
console.log(hashMap.remove("lion"));
console.log(hashMap.has("lion"))
console.log(hashMap.remove("lion"));
console.log(hashMap.length())
console.log(hashMap);










