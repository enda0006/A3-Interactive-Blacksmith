// Assignment 1: Blacksmith — The Tiny Forge

// PLAN: Write a short pseudocode plan for making a sword here.

// 1. Select the forge, heat, sword count, status, image, and message elements.
//    Find their IDs in index.html.
const forge = document.querySelector("#forge")
const heatText = document.querySelector("#heat-value")
const swordText = document.querySelector("#sword-count")
const statusText = document.querySelector("#forge-status")
const forgeImage = document.querySelector("#forge-image")
const messageText = document.querySelector("#action-message")
// Select the form, heat input, and game control buttons.
const heatForm = document.querySelector("#heat-form")
const heatInput = document.querySelector("#heat-input")
const makeSwordButton = document.querySelector("#make-sword-button")
const resetForgeButton = document.querySelector("#reset-forge-button")

// 2. Create the two state variables: heat and swords made.
let heat = 20
let swordsMade = 0

// 3. Write getForgeStatus(heatValue). Return the correct status string.
function getForgeStatus(heatValue){
    if(heatValue < 30){
        return "Too cold"
    }
    else if(heatValue < 70){
        return "Ready to forge"
    }
    else{
        return "Roaring fire"
    }
}

// 4. Write updateForge(). Update text and apply one status class.
//    Change the supplied forge image src and alt to match the heat.
//    Keep the most recent action message visible.
function updateForge(){
    const status = getForgeStatus(heat)

    heatText.textContent = heat
    swordText.textContent = swordsMade
    statusText.textContent = status

    forge.classList.remove("is-cold", "is-ready", "is-roaring")

    if(status === "Too cold"){
        forge.classList.add("is-cold")
        forgeImage.setAttribute("src", "assets/forge-cold.svg")
        forgeImage.setAttribute("alt", "A stone forge with dark coals and no flames")
    }
    else if(status === "Ready to forge"){
        forge.classList.add("is-ready")
        forgeImage.setAttribute("src", "assets/forge-ready.svg")
        forgeImage.setAttribute("alt", "A stone forge with a small orange fire")
    }
    else{
        forge.classList.add("is-roaring")
        forgeImage.setAttribute("src", "assets/forge-roaring.svg")
        forgeImage.setAttribute("alt", "A stone forge with tall bright flames and sparks")
    }
}

// 5. Write resetForge(). Restore the state, message, and display.
// Resettingg game to its starting state and clear the input and feefback.
function resetForge(){
    heat = 20
    swordsMade = 0

    heatInput.value = ""
    messageText.textContent = ""

    updateForge()
}

// 6. Write heatForge(amount). Add heat, cap it, and update the page.
function heatForge(amount){
    heat = heat + amount

    if(heat > 100){
        heat = 100
    }

    messageText.textContent = "The forge got hotter by " + amount + " heat."

    updateForge()
}

// 7. Write makeSword(). Handle both success and insufficient heat.
function makeSword(){
    if(heat >= 30){
        heat = heat - 30
        swordsMade = swordsMade + 1

        messageText.textContent = "Success! You made a sword."
    }
    else{
        messageText.textContent = "The forge is too cold. You need at least 30 heat to make a sword."
    }

    updateForge()
}

// PLAN FOR EVENT HANDLERS:
// 1. Listen for the heat form submission.
// 2. Prevent the page from refreshing.
// 3. Read the heat input and convert it to a number.
// 4. Check if the input is a valid positive whole number.
// 5. If invalid, display an error message.
// 6. If valid, call heatForge(amount) and clear the input.
// 7. Listen for the Make sword button and call makeSword().
// 8. Listen for the Reset forge button and call resetForge().
// 9. Initialize the game when the page loads.

// Listen for the heat form submission.
heatForm.addEventListener("submit", addHeat)

function addHeat(event) {
    event.preventDefault()

    const amount = Number(heatInput.value)

    if (
        heatInput.value.trim() === "" ||
        !Number.isFinite(amount) ||
        !Number.isInteger(amount) ||
        amount <= 0
    ) {
        messageText.textContent = "Please enter a positive whole number for the heat."
        return
    }

    heatForge(amount)
    heatInput.value = ""
}

// Listen for the Make sword button.
makeSwordButton.addEventListener("click", makeSword)

// Listen for the Reset forge button.
resetForgeButton.addEventListener("click", resetForge)

// 8. Initialize the game when the page loads.
resetForge()

