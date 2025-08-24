const playerName = document.getElementById('name');
const createCharacter = document.getElementById('createCharacter');


const savingPlayerName = () => {
    const playerNameValue = playerName.value;
    localStorage.setItem('playerName', playerNameValue);
}


createCharacter.addEventListener('click', savingPlayerName);

window.addEventListener('load', () => { 
    const playerNameValue = localStorage.getItem('playerName');
    playerName.value = playerNameValue;
});


