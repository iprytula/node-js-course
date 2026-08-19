import process from "node:process";

const nodeEnv = process.env.NODE_ENV ?? "development";
const port = Number(process.env.PORT ?? 3000);

const command = process.argv[2] ?? "start";

const shouldFail = process.argv.includes("--fail");
const shouldCrash = process.argv.includes("--crash");

// DO NOT START ASYNC HERE
// NODE IS ALREADY SHUTTING DOWN

process.on("exit", (code) => {
  console.log(`Process is finished with exit code ${code}`);
});

const main = () => {
  console.log(command);

  if (shouldFail) {
    console.error("Manual failure triggered with --fail flag");
    process.exit(1);
  }

  if (shouldCrash) {
    console.error("Manual crash triggered with --crash flag");
    process.exit(1);
  }
};

main();
