import path from "node:path";
import process from "node:process";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system", "fs-demo");
const SYNC_FILE_PATH = path.join(DEMO_FOLDER_PATH, "sync-note.txt");
const CALLBACK_FILE_PATH = path.join(DEMO_FOLDER_PATH, "callback-note.txt");
const PROMISE_FILE_PATH = path.join(DEMO_FOLDER_PATH, "promise-note.txt");

interface FileResult {
  style: string;
  fileName: string;
  content: string;
  sizeInBytes: number;
}

const ensureDemoFolderExists = (): void => {
  if (!fs.existsSync(DEMO_FOLDER_PATH)) {
    fs.mkdirSync(DEMO_FOLDER_PATH, { recursive: true });
  }
};

const runSyncExample = (): FileResult => {
  // Write content to file
  fs.writeFileSync(SYNC_FILE_PATH, "Created using fs", "utf8");

  fs.appendFileSync(SYNC_FILE_PATH, " | Appended using fs ", "utf8");

  const content = fs.readFileSync(SYNC_FILE_PATH, "utf8");

  const stats = fs.statSync(SYNC_FILE_PATH);

  return {
    style: "sync",
    content,
    fileName: path.basename(SYNC_FILE_PATH),
    sizeInBytes: stats.size,
  };
};

const runCallbackExample = (): Promise<FileResult> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      CALLBACK_FILE_PATH,
      "Created using callback fs",
      "utf8",
      (writeError) => {
        if (writeError) {
          reject(writeError);
          return;
        }

        fs.appendFile(
          CALLBACK_FILE_PATH,
          " | Append using callback fs",
          "utf8",
          (appendError) => {
            if (appendError) {
              reject(appendError);
              return;
            }

            fs.readFile(CALLBACK_FILE_PATH, "utf8", (readError, content) => {
              if (readError) {
                reject(readError);
                return;
              }

              fs.stat(CALLBACK_FILE_PATH, (statError, stats) => {
                if (statError) {
                  reject(statError);
                  return;
                }

                resolve({
                  style: "callback",
                  content,
                  sizeInBytes: stats.size,
                  fileName: path.basename(CALLBACK_FILE_PATH),
                });
              });
            });
          },
        );
      },
    );
  });
};

const runPromiseExample = async (): Promise<FileResult> => {
  await fsPromises.writeFile(
    PROMISE_FILE_PATH,
    "Created using promise fs",
    "utf8",
  );

  await fsPromises.appendFile(
    PROMISE_FILE_PATH,
    " | Appended using promise fs",
    "utf8",
  );

  const content = await fsPromises.readFile(PROMISE_FILE_PATH, "utf8");
  const stats = await fsPromises.stat(PROMISE_FILE_PATH);

  return {
    style: "promises",
    content,
    fileName: path.basename(PROMISE_FILE_PATH),
    sizeInBytes: stats.size,
  };
};

const main = async () => {
  try {
    ensureDemoFolderExists();
    const syncResult = runSyncExample();
    console.log("syncResult :", syncResult);

    const callbackResult = await runCallbackExample();
    console.log("callbackResult :", callbackResult);

    const promisesResult = await runPromiseExample();
    console.log("promisesResult :", promisesResult);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    console.error("File", message);
  }
};
main();
