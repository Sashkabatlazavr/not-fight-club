const playerName = document.getElementById('playerNameSettings');
const editPlayerName = document.getElementById('editPlayerName');
const inputPlayerName = document.getElementById('inputPlayerName');

let toggle = false;

const changingName = () => {
    if (toggle == false) {
    playerName.classList.add('hidden');
    inputPlayerName.classList.remove('hidden');
        inputPlayerName.value = playerName.textContent;
        editPlayerName.textContent = 'Save';
        toggle = true;
    }
    else if (toggle == true) {
        localStorage.setItem('playerName', inputPlayerName.value);
        playerName.textContent = inputPlayerName.value;
        inputPlayerName.classList.add('hidden');
        playerName.classList.remove('hidden');
        editPlayerName.textContent = 'Edit';
        toggle = false;
    }
}



window.addEventListener('load', () => { 
    playerName.textContent = localStorage.getItem('playerName');
});

editPlayerName.addEventListener('click', changingName);