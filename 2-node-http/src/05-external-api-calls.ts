const API_URL = "https://jsonplaceholder.typicode.com/users/1";

interface PlaceholderUser {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface PublicUser {
  id: number;
  name: string;
  email: string;
  company: string;
}

const transformUser = (rawData: PlaceholderUser): PublicUser => {
  return {
    id: rawData.id,
    name: rawData.name,
    email: rawData.email,
    company: rawData.company.name,
  };
};

const fetchExternalUser = async (): Promise<void> => {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(`upstream api failed with http status: ${response.status}`);
      return;
    }

    const rawUser = (await response.json()) as PlaceholderUser;
    const user = transformUser(rawUser);

    console.log(user);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("request failed due API response took too long");
      return;
    }

    const message = error instanceof Error ? error.message : "unknown";
    console.error("External API failed: ", message);
  } finally {
    clearTimeout(timeout);
  }
};

fetchExternalUser();
