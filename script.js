const API = "https://rickandmortyapi.com/api/character"

const loader = document.getElementById("loader")

const cardContainer = document.querySelector(".main-container")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")

const minusBtn = document.getElementById("minus")
const plusBtn = document.getElementById("plus")

let currentIndex = 0
let allCharacters = []

function card(characters) {
    showLoader()

    const { id, name, species, image } = characters

    const idCharacter = document.createElement("p")
    idCharacter.textContent = id

    const nameCharacter = document.createElement("h1")
    nameCharacter.textContent = name

    const speciesCharacter = document.createElement("p")
    speciesCharacter.textContent = species

    const imageCharacter = document.createElement("img")
    imageCharacter.src = image
    imageCharacter.className = "character-img"

    const card = document.createElement("div")
    card.className = "character-card"

    card.appendChild(idCharacter)
    card.appendChild(nameCharacter)
    card.appendChild(speciesCharacter)
    card.appendChild(imageCharacter)

    imageCharacter.onload = () => {
        cardContainer.innerHTML = ""
        cardContainer.appendChild(card)
        hideLoader()
    }

}


function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}



async function fetchData(url) {

    try {
        showLoader()

        let response = await fetch(url)
        if (!response.ok) {
            throw new Error("Request error")
        }
        let data = await response.json()
        allCharacters = data.results

        while (data.info.next) {
            response = await fetch(data.info.next)
            if (!response.ok) {
                throw new Error("Request error")
            }
            data = await response.json()
            allCharacters = allCharacters.concat(data.results)
        }




        card(allCharacters[currentIndex])

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + allCharacters.length) % allCharacters.length;
            card(allCharacters[currentIndex])
        })

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % allCharacters.length;
            card(allCharacters[currentIndex])
        })

        minusBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 10 + allCharacters.length) % allCharacters.length
            card(allCharacters[currentIndex])
        })

        plusBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 10) % allCharacters.length
            card(allCharacters[currentIndex])
        })


    } catch (error) {
        console.error("Error", error);
    }
}

fetchData(API)