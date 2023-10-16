const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  //- damit bei jedem Click die alten News vorher gelöscht werden
  let output = document.querySelector(".output");
  output.innerHTML = "";

  //   inputs ziehen
  let suchWort = document.querySelector("#suche");
  let language = document.querySelector("#sprache").value;
  let sortierung = document.querySelector("#relevanz").value;

  fetch(
    `https://newsapi.org/v2/everything?q=${suchWort.value}&language=${language}&sortBy=${sortierung}&apiKey=58b30cc124774eb59ad56b5688e9dbc6`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const news = data.articles;

      news.forEach((singleNew) => {
        let titel = singleNew.title;
        let beschreibung = singleNew.description;
        let button = singleNew.url;
        let img = singleNew.urlToImage;

        let newsItem = document.createElement("div");

        let headline = document.createElement("h3");
        headline.textContent = `${titel}`;
        newsItem.appendChild(headline);

        let text = document.createElement("p");
        text.textContent = `${beschreibung}`;
        newsItem.appendChild(text);

        if (img != null) {
          let picture = document.createElement("img");
          picture.setAttribute("src", img);
          picture.setAttribute("alt", "Bild konnte nicht geladen werden");
          newsItem.appendChild(picture);
        } else {
        }

        let showMore = document.createElement("button");
        showMore.textContent = "Show More";

        showMore.addEventListener("click", () => {
          window.open(`${button}`).catch((err) => {
            console.log("Fehler beim Weiterleiten");
          });
        });

        newsItem.appendChild(showMore);

        document.querySelector(".output").appendChild(newsItem);
      });
    });
  suchWort.value = "";
});
