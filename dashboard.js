async function runSearch() {
  const query = document.getElementById("searchBox").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`/.netlify/functions/scraper?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    resultsDiv.innerHTML = "";

    if (data.results && data.results.length > 0) {
      data.results.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        resultsDiv.appendChild(img);
      });
    } else {
      resultsDiv.innerHTML = "<p>No results found.</p>";
    }
  } catch (err) {
    resultsDiv.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}
