const URL_API_CHARACTERS = 'https://rickandmortyapi.com/api/character/'
const URL_API_EPISODES = 'https://rickandmortyapi.com/api/episode/'

function fetchData() {
  fetch(URL_API_CHARACTERS)
  .then(response => {
    if(response.status === 400) {
      throw Error('error sorry')
    }
    return response.json()
  })
  .then(data => {
    const characters = data.results.map(character => {
      return `
      <div class="character">
      <img src="${character.image}" alt="${character.name}">
      <div class="character-person" onclick="features(${character.id})">
      <h4>${character.name}</h4>
      <p>Specie: ${character.species}</p>
      </div>
      </div>
      `
    })
    document.getElementById('AllCharacters').insertAdjacentHTML('beforeend', characters)
  })
  .catch(err => console.error('No found ' + err))
}
fetchData()

function features(valueInfo) {
  fetch(URL_API_CHARACTERS)
  .then(response => {
    if(response.status === 400) {
      throw Error('error sorry')
    }
    return response.json()
  })
  .then(data => {
    info = data.results.map(features => {
      if(valueInfo === features.id) {
        swal(`Character ${features.name}`,`
        Name: ${features.name}
        Status: ${features.status}
        Species: ${features.species}
        Gender: ${features.gender}
        Origin: ${features.origin.name}
        Location: ${features.location.name}
          `);
      }
    })
  })
}
features()

function searchEpisodie() {
  let valueInput = document.getElementById('episodes').value
  infoEpidodes = document.getElementById('descriptionEpisodes')
  fetch(`${URL_API_EPISODES}${valueInput}`)
  .then(response => response.json())
  .then(data => {
    infoEpidodes.innerHTML =
        `
        <ul>Number episode: ${data.id}</ul>
        <ul>Name: ${data.name}</ul>
        <ul>Air date: ${data.air_date}</ul>
        <ul>Episode: ${data.episode}</ul>
        `
        if(valueInput > 41) {
          infoEpidodes.innerHTML = `Episode no found`
        }
        if(!valueInput || undefined) {
          infoEpidodes.style.display = "none"
        } else {
          infoEpidodes.style.display= "flex"
        }
  })
}
searchEpisodie()