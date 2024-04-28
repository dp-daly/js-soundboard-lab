/*------------------------ Cached Element References ------------------------*/

//Grab all relevant DOM elements. 
//I also added the btn class to all soundButtons directly in the html.
const audioFiles = document.querySelectorAll('audio')
const soundButtons = document.querySelectorAll('.btn')
const randomizerButton = document.querySelector('#randomizer')

/*-------------------------------- Constants --------------------------------*/

//Provides access to all sound files in an array using Array.from().
//Array.from() taken from nodeList level up materials in "intro to the DOM" but in hindsight this - and adding ids directly to the audio tags - made things more difficult later on.
const audioFilesArray = Array.from(audioFiles)

//Provides access to all buttons in an array.
const soundButtonsArray = Array.from(soundButtons)


/*-------------------------------- Variables --------------------------------*/

//Empty variables for storing the results of the randomIdx logic...
let randomSound
let randomSoundBtnId
//...and for storing a value based on events. 
let chosenSound

/*-------------------------------- Functions --------------------------------*/

//Make connection between btn id and audio file id.
//I altered the html directly to create id tags for the sounds which were the button ids + "_audio". 
    const clickChoice = (event1) => {
    let chosenSound = document.getElementById(event1.target.id + "_audio")
    chosenSound.play()
}
 
//Define randomChoice() using identical logic to RPS game.
function randomChoice() {
    const randomIdx = Math.floor(Math.random() * audioFilesArray.length)
    randomSound = audioFilesArray[randomIdx] 
    //Storing the RandomSound's button id for later use when toggling styles
    randomSoundId = randomSound.getAttribute("id")
    getRandomSoundBtnId = randomSoundId.slice(0, -6)
    randomSoundBtnId = document.getElementById(getRandomSoundBtnId)
 }

 //Call randomChoice() when the randomizer btn is clicked.
 function makeRandomMusic(event2) {
    if (event2.target === randomizerButton) {
        randomChoice();
        randomSound.play()
        render();
    }
  }

//Add a CSS class to the randomBtn 
// ! This doesn't work. I think it is related to CSS specificity and the ids/classes I added to the html earlier? 
function render() {
    randomSoundBtnId.classList.add("showRandomChoice");
}

/*----------------------------- Event Listeners -----------------------------*/

//Calls makeRandomMusic() when the randomizer button is clicked.
document.querySelector("#randomizer").addEventListener("click", makeRandomMusic);

//Efficiently attaches an eventListener to all 16 sound buttons.
soundButtonsArray.forEach((button) => {
    button.addEventListener("click", clickChoice)
});