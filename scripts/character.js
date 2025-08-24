const characterName = document.getElementById('characterName');
const changeAvatar = document.getElementById('changeAvatar');
const dialog = document.getElementById('dialogCharacter');
const avatar1 = document.getElementById('avatar1');
const avatar2 = document.getElementById('avatar2');
const avatar3 = document.getElementById('avatar3');
const avatar1Button = document.getElementById('avatar1Button');
const avatar2Button = document.getElementById('avatar2Button');
const avatar3Button = document.getElementById('avatar3Button');
const mainAvatar = document.getElementById('mainAvatar');

const wincounter = document.getElementById('wincounter');
const lostcounter = document.getElementById('lostcounter');
const totalfights = document.getElementById('totalfights');
const winrate = document.getElementById('winrate');





let activeAvatar;

changeAvatar.addEventListener('click', () => {
    dialog.showModal();
    dialog.classList.add('activeDiaglog');
    dialog.classList.remove('dialogCharacter');
    activeAvatarButton();
});

const savingAvatar = () => {
    const avatar = activeAvatar.src;
    localStorage.setItem('currentAvatar', avatar);
}

function closeOnBackDropClick({ currentTarget, target }) {
    const dialog = currentTarget;
    const isClickedOnBackDrop = target === dialog
    if (isClickedOnBackDrop) {
        dialog.classList.add('dialogCharacter');
        dialog.classList.remove('activeDiaglog');
        dialog.close();
    }
}

dialog.addEventListener('click', closeOnBackDropClick);

window.addEventListener('load', () => { 
    characterName.textContent = localStorage.getItem('playerName');
    if (localStorage.getItem('currentAvatar') == null) {
        mainAvatar.src = 'assets/cat.jpg';
    } else {
        mainAvatar.src = localStorage.getItem('currentAvatar');
    }
    if (localStorage.getItem('wincounter') == null || localStorage.getItem('wincounter') == 0) {
        localStorage.setItem('wincounter', 0);
    } else {
        wincounter.textContent = localStorage.getItem('wincounter');
        lostcounter.textContent = localStorage.getItem('lostcounter');
    }
    totalfights.textContent = wincounter.textContent *1 + lostcounter.textContent *1;
    if (totalfights.textContent == 0) {
        winrate.textContent = '0%';
    } else {
        winrate.textContent = (wincounter.textContent / totalfights.textContent * 100).toFixed(2) + '%';
    }
    activeAvatarButton();
});


const activeAvatarButton = () => {
    if (mainAvatar.src === avatar1.src) {
        avatar1Button.disabled = true;
        avatar1Button.textContent = 'Active avatar';
    }
    else if (mainAvatar.src === avatar2.src) {
        avatar2Button.disabled = true;
        avatar2Button.textContent = 'Active avatar';
    }
    else if (mainAvatar.src === avatar3.src) {
        avatar3Button.disabled = true;
        avatar3Button.textContent = 'Active avatar';
    }
}

const updateMainAvatar = (selectedAvatar) => {
    mainAvatar.src = selectedAvatar.src;
}

const changeAvatar1 = () => {
    activeAvatar = avatar1;
    avatar1Button.disabled = true;
    avatar1Button.textContent = 'Active avatar';
    console.log(activeAvatar);
    avatar2Button.disabled = false;
    avatar2Button.textContent = 'Change avatar';
    avatar3Button.disabled = false;
    avatar3Button.textContent = 'Change avatar';
    updateMainAvatar(avatar1);
    savingAvatar();
}

const changeAvatar2 = () => {
    activeAvatar = avatar2;
    avatar2Button.disabled = true;
    avatar2Button.textContent = 'Active avatar';
    console.log(activeAvatar);
    avatar1Button.disabled = false;
    avatar1Button.textContent = 'Change avatar';
    avatar3Button.disabled = false;
    avatar3Button.textContent = 'Change avatar';    
    updateMainAvatar(avatar2);
    savingAvatar();
}   

const changeAvatar3 = () => {
    activeAvatar = avatar3;
    avatar3Button.disabled = true;
    avatar3Button.textContent = 'Active avatar';
    avatar1Button.disabled = false;
    avatar1Button.textContent = 'Change avatar';
    avatar2Button.disabled = false;
    avatar2Button.textContent = 'Change avatar';
    updateMainAvatar(avatar3);
    savingAvatar();
    console.log(localStorage.getItem('currentAvatar'));
}

avatar1Button.addEventListener('click', changeAvatar1);
avatar2Button.addEventListener('click', changeAvatar2);
avatar3Button.addEventListener('click', changeAvatar3);


