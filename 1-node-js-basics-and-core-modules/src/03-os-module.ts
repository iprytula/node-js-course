import * as os from "node:os";

function runOsDemo() {
  console.log("Platform:    ", os.platform());
  console.log("Architecture:", os.arch());
  console.log("OS Type:     ", os.type());
  console.log("OS Release:  ", os.release());
  console.log("Home Dir:    ", os.homedir());
  console.log("Temp Dir:    ", os.tmpdir());
  console.log("CPU Count:   ", os.cpus().length);
  console.log(
    "Total RAM:   ",
    `${(os.totalmem() / Math.pow(1024, 3)).toFixed(2)} GB`,
  );
  console.log(
    "Free RAM:    ",
    `${(os.freemem() / Math.pow(1024, 3)).toFixed(2)} GB`,
  );
  console.log("Uptime:      ", `${(os.uptime() / 3600).toFixed(2)} hours`);
  console.log("User Info:   ", os.userInfo().username);
  console.log("Network:     ", Object.keys(os.networkInterfaces()).join(", "));
}

runOsDemo();
