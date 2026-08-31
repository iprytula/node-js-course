import { Readable, Transform, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

const readableStream = Readable.from([
  "Hello ",
  "from ",
  "Node.js ",
  "stream!",
]);

const uppercaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString();

    callback(null, text.toUpperCase());
  },
});

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log("received chunk:", chunk.toString());

    callback();
  },
});

const main = async () => {
  try {
    await pipeline(readableStream, uppercaseTransform, writableStream);
    console.log("Pipeline completed");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    console.error("Stream failed: ", message);
  }
};
main();
