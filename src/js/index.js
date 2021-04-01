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
        Specie: ${features.species}
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
    setTimeout(() => {
      infoEpidodes.innerHTML =
          `
          <p><span>Number episode: </span>${data.id}</p>
          <p><span>Name: </span>${data.name}</p>
          <p><span>Episode: </span>${data.episode}</p>
          <p><span>Air date: </span>${data.air_date}</p>
          `
          if(valueInput > 41 || valueInput <= 0) {
            infoEpidodes.innerHTML = `Episode no found`
          }
          if(!valueInput || undefined) {
            infoEpidodes.style.display = "none"
          } else {
            infoEpidodes.style.display= "flex"
          }
    }, 300)
  })
  .catch(err => console.error('error' + err))
}
searchEpisodie()

function searchCharacters() {
  valueInfo = document.getElementById('characters').value
  infoCharacter = document.getElementById('descriptionCharacters')
  fetch(`${URL_API_CHARACTERS}${valueInfo}`)
  .then(response => response.json())
  .then(data => {
    setTimeout(() => {
      infoCharacter.innerHTML = `
      <div class="info">
      <img src="${data.image}">
      <p><span>Number Character: </span>${data.id}</p>
      <p><span>Name: </span>${data.name}</p>
      <p><span>Status: </span>${data.status}</p>
      <p><span>Specie: </span>${data.species}</p>
      <p><span>Gender: </span>${data.gender}</p>
      <p><span>Type: </span>${data.type}</p>
      </div>
      `
      if(!valueInfo || undefined){
        infoCharacter.style.display = 'none'
      } else {
        infoCharacter.style.display = "flex"
      }
      if(valueInfo > 671 || valueInfo <= 0){
        infoCharacter.innerHTML = `Character no found`
      }
    }, 200)
  })
  .catch(err => console.error('error' + err))
}
searchCharacters()

