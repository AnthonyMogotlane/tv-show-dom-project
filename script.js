// Program func to desplay episodes
function program(data) {
  const allEpisodes = data.map(episode => {
    return {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number,
      airdate: episode.airdate,
      airstamp: episode.airtime,
      imageMedium: episode.image.medium,
      imageOriginal: episode.image.original,
      summary: episode.summary,
      _linksSelf: episode._links.self.href
    }
  })


  function setup() {
    makePageForEpisodes(allEpisodes);
  }

  // Template
  function makePageForEpisodes(episodeList) {
    const rootElem = document.getElementById("root");
    const display = document.getElementById("display-count")
    let content = "";
    episodeList.forEach(elem => {
      content += `
              <div class="col-12 col-lg-3 col-sm-4">
              <div class="card">
              <div class="card-body">
              <h5 class="card-title">${elem.name} - S0${elem.season}E0${elem.number}</h5>
              </div>
              <img src=${elem.imageMedium} alt="">
              <div class="card-body">
              <p class="card-text">${elem.summary}</p>
              </div>
              </div>
              </div>
            `;
    });
    rootElem.innerHTML = content;
    display.innerHTML = `Displays ${episodeList.length}/${allEpisodes.length}`;
  }

  setup();

  //search field
  const searchField = document.querySelector("#search");
  searchField.addEventListener("keyup", (e) => {
    let inputText = e.target.value.toLowerCase();

    let temp = allEpisodes.filter(episode => {
      if (episode.name.toLowerCase().includes(inputText)) return episode;
      if (episode.summary.toLowerCase().includes(inputText)) return episode;
    })
    // Template
    makePageForEpisodes(temp);
  })

  // Dropdown - Episodes
  const dropdown = document.querySelector(".dropdown");

  allEpisodes.forEach(episode => {
    dropdown.innerHTML += `
        <option value="${episode.id}">S0${episode.season}E0${episode.number} - ${episode.name}</options>
    `;
  })

  dropdown.addEventListener("change", () => {
    let selectedId = dropdown.options[dropdown.selectedIndex].value;
    let temp = allEpisodes.find(episode => {
      if (episode.id == selectedId) return episode;
    })

    // Template
    if (selectedId !== "none") {
      makePageForEpisodes([temp])
    } else {
      makePageForEpisodes(allEpisodes)
    }

  })
}

// Fetching episodes
fetch('https://api.tvmaze.com/shows/82/episodes')
  .then(response => response.json())
  .then(data => {
    program(data)
  })
  .catch(error => console.warn(error))








