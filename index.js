// async function getdata(search_value){
  //     const response = await fetch("https://api.genshin.dev/characters/" + search_value);
  //     const data = response.json();
  //     return data;
// }

// async function find_data(){
//     const data = await getdata(document.getElementById("gi-finder").value);
//     console.log(data);
//     document.getElementById("char-name").innerHTML = "Name : " + data.name;
//     document.getElementById("char-des").innerHTML = data.description;
//     document.getElementById("char-weapon").innerHTML = "Weapon : "+ data.weapon;
// }

// Get necessary DOM elements

const characterList = document.getElementById('character-list');

// Fetch character data from the API
fetch('https://api.genshin.dev/characters/')
  .then(response => response.json())
  .then(data => {
    // Display character data
    data.forEach(character => {
      fetchCharacterDetails(character);
    });
  })
  .catch(error => {
    console.log('Error fetching character data:', error);
  });

// Fetch individual character details from the API
function fetchCharacterDetails(character) {
  fetch(`https://api.genshin.dev/characters/${character}`)
    .then(response => response.json())
    .then(data => {
      const characterCard = createCharacterCard(data);
      characterList.appendChild(characterCard);
    })
    .catch(error => {
      console.log(`Error fetching details for character '${character}':`, error);
    });
}

// Function to create a character card
function createCharacterCard(character) {
  const characterCard = document.createElement('div');
  characterCard.classList.add('character-card');

  const nameElement = document.createElement('div');
  nameElement.classList.add('character-name');
  if(character.name == "Ayato"){
    character.name = "Kamisato Ayato";
  }
  // else if(character.name == "Traveler"){
  //   character.name = "Aether";
  // }
  nameElement.textContent = character.name;

  const infoElement = document.createElement('div');
  infoElement.classList.add('character-info');
  infoElement.innerHTML = `
    <div class="card-detail"><strong>Element:</strong> ${character.vision}</div>
    <div class="card-detail"><strong>Rarity:</strong> <span class="character-rarity">${character.rarity}★</span></div>
  `;

  const imageElement = document.createElement('img');
  imageElement.classList.add('character-image');
  character.name = character.name.replace(" ","_")
  // if(character.name == "Kamisato Ayaka"){
  //   character.name = "Ayaka";
  // }
  // else if(character.name == "Arataki Itto"){
  //   character.name = "Itto";
  // }
  // else if(character.name == "Kaedehara Kazuha"){
  //   character.name = "Kazuha";
  // }
  // else if(character.name == "Sangonomiya Kokomi"){
  //   character.name = "Kokomi";
  // }
  // else if(character.name == "Raiden Shogun"){
  //   character.name = "Raiden";
  // }
  // else if(character.name == "Kujou Sara"){
  //   character.name = "Sara";
  // }
  // else if(character.name == "Shikanoin Heizou"){
  //   character.name = "Heizou";
  // }
  // else if(character.name == "Tartaglia"){
  //   character.name = "Childe";
  // }
  if(character.name == "Traveler" && character.vision == "Anemo"){
    character.name = "traveler-anemo";
  }
  else if(character.name == "Traveler" && character.vision == "Dendro"){
    character.name = "traveler-dendro";
  }
  else if(character.name == "Traveler" && character.vision == "Electro"){
    character.name = "traveler-electro";
  }
  else if(character.name == "Traveler" && character.vision == "Geo"){
    character.name = "traveler-geo";
  }
  imageElement.src = "pic\\Potrait\\"+ character.name + ".png";
  imageElement.alt = character.name;  
  

  const descriptionElement = document.createElement('div');
  descriptionElement.classList.add('character-description');
  

  characterCard.appendChild(nameElement);
  characterCard.appendChild(infoElement);
  characterCard.appendChild(imageElement);
  characterCard.appendChild(descriptionElement);

  // Add click event listener
  characterCard.addEventListener('click', () => {
    // Perform the desired action when the card is clicked
    // Construct the URL with query parameters
    if(character.name == "Aether"){
      character.name = "traveler"
    }
    var data = {
      characterName: character.name,
      // characterVision: character.vision,
      // Include other relevant data as needed
    };
    var queryString = new URLSearchParams(data).toString();
    var url = 'character.html?' + queryString;
  
    // Navigate to the new page with the data
    window.location.href = url;
  });
  return characterCard;
}
