const textBuffer = Buffer.from("Node");
console.log('textBuffer :', textBuffer);

const engBuffer = Buffer.from("Hello");
console.log(engBuffer.length);

const fixedBuffer = Buffer.alloc(5);
console.log('fixedBuffer :', fixedBuffer);

fixedBuffer.write("API");
console.log('fixedBuffer after write() :', fixedBuffer);

const chunks = [
  Buffer.from("Hello"),
  Buffer.from("Node"),
  Buffer.from("JS")
];

const combineBuffer = Buffer.concat(chunks);
console.log("combineBuffer :", combineBuffer);

console.log("combineBuffer.toString() :", combineBuffer.toString("utf8"));
