interface User {
  id: number;
  name: string;
  role: "user" | "super-admin";
}

const users: User[] = [
  {
    id: 1,
    name: "Jack",
    role: "user",
  },
  {
    id: 2,
    name: "John",
    role: "user",
  },
  {
    id: 3,
    name: "Jurij",
    role: "super-admin",
  },
];

const findUserWithCallback = (
  userId: number,
  callback: (result: Error | User) => void,
) => {
  setTimeout(() => {
    const foundedUser = users.find((user) => user.id === userId);

    if (!foundedUser) {
      callback(new Error(`User with id: ${userId} not found`));
      return;
    }
    callback(foundedUser);
  }, 500);
};

const handleUserCallback = (result: Error | User) => {
  if (result instanceof Error) {
    console.log(result.message);
    return;
  }
  console.log(
    `Founded User { id: ${result.id}, name: ${result.name}, role: ${result.role} }`,
  );
};

// findUserWithCallback(3, handleUserCallback);

// findUserWithCallback(7, handleUserCallback);

const findUserWithPromise = (userId: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    const foundedUser = users.find((user) => user.id === userId);

    if (!foundedUser) {
      reject(new Error(`User with id: ${userId} not found`));
    } else {
      resolve(foundedUser);
    }
  });
};

// findUserWithPromise(1)
//   .then((user) => {
//     console.log(`Founded User { id: ${user.id}, name: ${user.name}, role: ${user.role} }`);
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

console.log("=====================ASYNC/AWAIT========================")
const findUserWithAsyncAwait = async (userId: number): Promise<void> => {
  try {
    const foundedUser = await findUserWithPromise(userId);
    console.log(
      `Founded User { id: ${foundedUser.id}, name: ${foundedUser.name}, role: ${foundedUser.role} }`,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
findUserWithAsyncAwait(3);
