import EventEmitter from "node:events";

const appEvents = new EventEmitter();

interface UserRegisterPayload {
  id: number;
  email: string;
}

appEvents.on("user:registered", (payload: UserRegisterPayload) => {
  console.log("1. Inside on(\"user:registered\"");
  console.log('payload :', payload);
  console.log("========================================");
});

appEvents.on("user:registered", (payload: UserRegisterPayload) => {
  console.log("2. Inside second on(\"user:registered\"");
  console.log('payload :', payload);
  console.log("========================================")
});

appEvents.once("app:started", () => {
  console.log("3. Inside once(\"app:started\". Should be logged one time only.");
  console.log("========================================")
});

const registerUser = () => {
  const user: UserRegisterPayload = {
    id: 1,
    email: "example_user@gmail.com"
  }

  console.log("user saved");
  console.log("========================================");

  appEvents.emit("user:registered", user)
};

const emitApplicationStarted = () => {
  appEvents.emit("app:started");
  appEvents.emit("app:started");
  appEvents.emit("app:started");
  appEvents.emit("app:started");
  appEvents.emit("app:started");
  appEvents.emit("app:started");
  appEvents.emit("app:started");
  appEvents.emit("app:started");
  appEvents.emit("app:started");
}

registerUser();
emitApplicationStarted();