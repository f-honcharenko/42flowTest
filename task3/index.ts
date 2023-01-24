import { IncrementalMap } from "./incrementalMap";

const map = new IncrementalMap<number>();

// zero sn
map.set("a", 111);
map.set("b", 12);
map.set("c", 0);
console.log("a", map.get("a")); // 1
console.log("b", map.get("b")); // 2

console.log("snapshot #1");
map.snapshot(1);

map.set("a", 21);
console.log("a", map.get("a")); // 12
console.log("b", map.get("b")); // 2
map.snapshot(2);

map.loadSnapshot(1);
console.log("loadSnapshot");
console.log("a", map.get("a")); // 12
console.log("b", map.get("b")); // 2
