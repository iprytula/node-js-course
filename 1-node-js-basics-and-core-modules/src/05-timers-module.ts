const setTimeoutExample = () => {
  console.log("Set timeout example started");

  setTimeout(() => {
    console.log("setTimeout invoked after 1 second");
  }, 1000);

  console.log("Runs immediately, Node doesn't wait for set timeout to end");
};
setTimeoutExample();

console.log("==========================================================");

const clearTimeoutExample = () => {
  console.log("Clear timeout example started");

  const timeoutId = setTimeout(() => {
    console.log("This message not going to appear in console");
  }, 2000);

  clearTimeout(timeoutId);
  console.log("Cancelled 2 seconds timeout");
};
clearTimeoutExample();

console.log("==========================================================");

const setIntervalExample = () => {
  console.log("Clear interval example started");
  let count = 0;

  const intervalId = setInterval(() => {
    count++;
    console.log(count);

    if (count === 3) {
      clearInterval(intervalId);
      console.log("Interval cleared");
    }
  }, 2000);
};
setIntervalExample();

console.log("==========================================================");

const setImmediateExample = () => {
  console.log("Set immediate example started");
  setImmediate(() => {
    console.log("setImmediate invoked!")
  });
};
setImmediateExample();

console.log("==========================================================");
