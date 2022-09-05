//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  episodeList.forEach(elem => {
      rootElem.innerHTML += `
          <div class="col-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${elem.name} - S0${elem.season}E0${elem.season}</h5>
            </div>
            <img src=${episodeList[0].url} alt="">
            <div class="card-body">
              <p class="card-text">${elem.summary}</p>
            </div>
          </div>
          </div>
      `;
  });

  console.log(typeof srcImg);

}

window.onload = setup;
