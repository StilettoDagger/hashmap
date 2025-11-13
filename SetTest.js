import HashMap from "./HashMap.js";
import HashSet from "./HashSet.js";

const hashSet = new HashSet(16, 0.75);

hashSet.set("red");
hashSet.set("green");
hashSet.set("blue");
hashSet.set("blue");
hashSet.set("purple");
hashSet.set("orange");
hashSet.set("yellow");
hashSet.set("white");
hashSet.set("black");
hashSet.set("golden");
hashSet.set("pink");
hashSet.set("cyan");
hashSet.set("lime");

console.log(hashSet.entries());
console.log(hashSet.length());
console.log(hashSet.has("white"));
console.log(hashSet.has("amber"));

console.log(hashSet);

hashSet.set("amber");

console.log(hashSet);
console.log(hashSet.length());

console.log(hashSet.entries());


hashSet.remove("white");

console.log(hashSet);
console.log(hashSet.entries());
console.log(hashSet.length());

hashSet.set("white");

console.log(hashSet);
console.log(hashSet.entries());
console.log(hashSet.length());




