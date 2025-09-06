const apiUrl = "http://localhost:3000/currencies";

async function fetchData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
}

fetchData();
