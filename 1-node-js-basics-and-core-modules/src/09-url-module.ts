const runUrlDemo = () => {
  const apiUrl = new URL("https://api.acedevhub.com/users?page=2&limit=10&sort=latest");
  console.log('apiUrl.href :', apiUrl.href);
  console.log('apiUrl.protocol :', apiUrl.protocol);
  console.log('apiUrl.hostname :', apiUrl.hostname);
  console.log('apiUrl.pathname :', apiUrl.pathname);

  console.log('apiUrl.searchParams :', apiUrl.searchParams);
  
  apiUrl.searchParams.set("page", "10");
  apiUrl.searchParams.set("limit", "20");

  console.log('apiUrl.href :', apiUrl.href);

  const queryParams = new URLSearchParams({
    search: "node js",
    page: "1",
    limit: "5"
  });

  apiUrl.search = queryParams.toString();

  console.log('apiUrl.href :', apiUrl.href);
};

runUrlDemo();