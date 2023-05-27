const urlParams = new URLSearchParams(window.location.search);
let oldName = urlParams.get('characterName');
let vision = urlParams.get('characterVision');
// console.log(oldName)
// console.log(vision)

if(oldName == "Arataki_Itto"){
  oldName = "Arataki-Itto"
}
else if(oldName == "Childe"){
  oldName = "Tartaglia"
}
else if(oldName == "Raiden_Shogun"){
  oldName = "Raiden"
}
else if(oldName == "Hu_Tao"){
  oldName = "hu-tao"
}
else if(oldName == "Shikanoin_Heizou"){
  oldName = "shikanoin-heizou"
}
else if(oldName == "Yae_Miko"){
  oldName = "Yae-Miko"
}
else if(oldName == "Kaedehara_Kazuha"){
  oldName = "Kazuha"
}
else if(oldName == "Sangonomiya_Kokomi"){
  oldName = "Kokomi"
}
else if(oldName == "Kuki_Shinobu"){
  oldName = "Kuki-Shinobu"
}
else if(oldName == "Kujou_Sara"){
  oldName = "sara"
}
else if(oldName == "Yun_Jin"){
  oldName = "yun-jin"
}
else if (oldName == "traveler" && vision == "Anemo"){
  oldName = "traveler-anemo";
}
else if (oldName == "traveler" && vision == "Dendro"){
  oldName = "traveler-dendro";
}
else if (oldName == "traveler" && vision == "Electro"){
  oldName = "traveler-electro";
}
else if (oldName == "traveler" && vision == "Geo"){
  oldName = "traveler-geo";
}

// let characterName = oldName.replace("_"," ")
let characterName = oldName

if(characterName == "Kamisato_Ayaka"){
  characterName = "Ayaka"
}
else if(characterName == "Kamisato_Ayato"){
  characterName = "Ayato"
}

// console.log(characterName)

let characterdata;

async function getCharacterData(characterName) {
  try {
    const response = await fetch(`https://api.genshin.dev/characters/` + characterName);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching details for character '${characterName}':`, error);
    return null;
  }
}

async function fetchData() {
  try {
    characterdata = await getCharacterData(characterName);
    displayCharacterData();
  } catch (error) {
    console.log("Error:", error);
  }
}


function displayCharacterData() {
  // console.log("pic\\Potrait\\"+ (characterdata.name).replace(" ","_") + ".png");
  const characterContainer = document.getElementById('character-container');
  const characterCard = document.createElement('div');
  characterCard.className = "card"

  const cardheader = document.createElement('div');
  cardheader.className = "cardheader"    
  characterContainer.appendChild(characterCard)

  // const characterDetail = document.getElementById('character-detail');
  // const detailcard = document.createElement('div');
  // detailcard.className = "detailcard"
  // characterDetail.appendChild(detailcard)

  const characterSkill = document.getElementById('character-skill');
  const skilldetail = document.createElement('div');
  skilldetail.className = "skilldetail"
  characterSkill.appendChild(skilldetail)

  const skillname = document.createElement('h1')
  skillname.innerHTML = ""  
  const skilldes = document.createElement('p')
  skilldes.innerHTML = ""

  skilldetail.appendChild(skillname)
  skilldetail.appendChild(skilldes)
  
  if (characterdata) {
    

    const characterNameElement = document.createElement('h2');
    characterNameElement.textContent = characterdata.name;
    
    const characterTitleElement = document.createElement('h3');
    characterTitleElement.textContent = characterdata.title;
    
    const elementElement = document.createElement('p');
    elementElement.innerHTML = `<strong>Element:</strong>: ${characterdata.vision}`;
        
    const rarity = document.createElement('p');
    rarity.innerHTML = `<strong>Rarity:</strong> ${characterdata.rarity} ★`;
    
    const weaponElement = document.createElement('p');
    weaponElement.innerHTML = `<strong>Weapon:</strong> ${characterdata.weapon}`;

    const birthday = document.createElement('p');
    if(oldName == !"traveler"){
      birthday.innerHTML = `<strong>Birthday:</strong> ${(characterdata.birthday).slice(5,10)}`;
    }

    const nation = document.createElement('p');
    nation.innerHTML = `<strong>Nation:</strong> ${(characterdata.nation)}`;

    const affiliation = document.createElement('p');
    affiliation.innerHTML = `<strong>affiliation:</strong> ${(characterdata.affiliation)}`;

    const infoElement = document.createElement('div');
    infoElement.classList.add('character-info');

    const imageElement = document.createElement('img');
    imageElement.classList.add('character-image');

    if(characterdata.name == "Ayato"){
      imageElement.src = "pic\\Potrait\\Kamisato_Ayato.png";;
      imageElement.alt = characterdata.name;

    }
    else{
    imageElement.src = "pic\\Potrait\\"+ (characterdata.name).replace(" ","_") + ".png";;
    imageElement.alt = characterdata.name;
  }

    characterCard.appendChild(imageElement);
    characterCard.appendChild(cardheader)
    cardheader.appendChild(characterNameElement);
    cardheader.appendChild(characterTitleElement);
    cardheader.appendChild(rarity);
    cardheader.appendChild(elementElement);
    cardheader.appendChild(weaponElement);
    cardheader.appendChild(birthday);
    cardheader.appendChild(nation);
    cardheader.appendChild(affiliation);

    const navbar = document.createElement("ul")
    navbar.classList.add("navbar")
    detailcard.appendChild(navbar)

    const naskill = document.createElement("li")
    naskill.textContent = "Normal Attack";
    naskill.classList.add("skill")

    const elementalskill = document.createElement("li")
    elementalskill.textContent = "Elemental Skill";
    elementalskill.classList.add("skill")

    const ultimateskill = document.createElement("li")
    ultimateskill.textContent = "Ultimate Skill";
    ultimateskill.classList.add("skill")
    const passiveskill1 = document.createElement("li")
    passiveskill1.textContent = "Passive skill 1  ";
    passiveskill1.classList.add("skill")
    const passiveskill2 = document.createElement("li")
    passiveskill2.textContent = "Passive skill 2  ";
    passiveskill2.classList.add("skill")


    navbar.appendChild(naskill);
    navbar.appendChild(elementalskill);
    navbar.appendChild(ultimateskill);
    

    if(characterdata.skillTalents[3]){
      const extraskill = document.createElement("li")
      extraskill.textContent = "Extra Skill";
      extraskill.classList.add("skill")
      navbar.appendChild(extraskill);

      extraskill.addEventListener("click", () => {
        skillname.innerHTML = (characterdata.skillTalents)[3].name;
        skilldes.innerHTML = (characterdata.skillTalents)[3].description;
        skilldes.style.cssText = `
        padding:10px;
        background-color: snow;
        border-radius: 10px;
        opacity:0.8 ;
        `
      });
    }

    navbar.appendChild(passiveskill1);
    navbar.appendChild(passiveskill2);
    
    
    naskill.addEventListener("click", () => {
      skillname.innerHTML = (characterdata.skillTalents)[0].name;
      
      skilldes.innerHTML = (characterdata.skillTalents)[0].description;
      skilldes.scrollIntoView({behavior: "smooth"});
      skilldes.style.cssText = `
      padding:10px;
      background-color: snow;
      border-radius: 10px;
      opacity:0.8 ;
      `
    });
    elementalskill.addEventListener("click", () => {
      skillname.innerHTML = (characterdata.skillTalents)[1].name;
      skilldes.innerHTML = (characterdata.skillTalents)[1].description;
      skilldes.scrollIntoView({behavior: "smooth"});
      skilldes.style.cssText = `
      padding:10px;
      background-color: snow;
      border-radius: 10px;
      opacity:0.8 ;
      `
    });
    ultimateskill.addEventListener("click", () => {
      skillname.innerHTML = (characterdata.skillTalents)[2].name;
      skilldes.innerHTML = (characterdata.skillTalents)[2].description;
      skilldes.scrollIntoView({behavior: "smooth"});
      skilldes.style.cssText = `
      padding:10px;
      background-color: snow;
      border-radius: 10px;
      opacity:0.8 ;
      `
    });
    passiveskill1.addEventListener("click", () => {
      skillname.innerHTML = (characterdata.passiveTalents)[0].name;
      skilldes.innerHTML = (characterdata.passiveTalents)[0].description;
      skilldes.scrollIntoView({behavior: "smooth"});
      skilldes.style.cssText = `
      padding:10px;
      background-color: snow;
      border-radius: 10px;
      opacity:0.8 ;
      `
    });
    passiveskill2.addEventListener("click", () => {
      skillname.innerHTML = (characterdata.passiveTalents)[1].name;
      skilldes.innerHTML = (characterdata.passiveTalents)[1].description;
      skilldes.scrollIntoView({behavior: "smooth"});
      skilldes.style.cssText = `
      padding:10px;
      background-color: snow;
      border-radius: 10px;
      opacity:0.8 ;
      `
    });

    // if(characterdata.passiveTalents[2]){
      
    // }
    if(characterdata.passiveTalents[2]){
      const passiveskill3 = document.createElement("li")
      passiveskill3.textContent = "Passive skill 3  ";
      passiveskill3.classList.add("skill")
      navbar.appendChild(passiveskill3);

      passiveskill3.addEventListener("click", () => {
        skillname.innerHTML = (characterdata.passiveTalents)[2].name;
        if(characterName == "Kuki-Shinobu"){
          skilldes.innerHTML = "Gains 25% more rewards when dispatched on an Inazuma Expedition for 20 hours.";
        }
        else{
          skilldes.innerHTML = (characterdata.passiveTalents)[2].description;
        }
        skilldes.scrollIntoView({behavior: "smooth"});
          skilldes.style.cssText = `
        padding:10px;
        background-color: snow;
        border-radius: 10px;
        opacity:0.8 ;
        `
      });
    }


    
  }
  else {
    const errorElement = document.createElement('p');
    errorElement.textContent = `Error fetching details for character '${characterName}'`;
    characterContainer.appendChild(errorElement);
  }
}
fetchData();
