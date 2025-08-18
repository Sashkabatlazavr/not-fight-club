const playerName = document.getElementById('playerName');
const playerAvatar = document.getElementById('playerAvatar');

window.addEventListener('load', () => { 
    playerName.textContent = localStorage.getItem('playerName');
    playerAvatar.src = localStorage.getItem('currentAvatar');
    enemyDice();
});

const enemyName = document.getElementById('enemyName');
const enemyAvatar = document.getElementById('enemyAvatar');
const playerHealth = document.getElementById('playerHealth');
const enemyHealth = document.getElementById('enemyHealth');
const attackOptions = document.getElementById('attackOptions');
const defenseOptions = document.getElementById('defenseOptions');
const defenseCheckboxes = document.querySelectorAll('input[name="defense"]');
const attackRadio = document.querySelectorAll('input[name="attack"]');
const attackButton = document.getElementById('attackButton');
let enemyRandom = 0;


const enemyDice = () => {
    const enemyDice = Math.floor(Math.random() * 3) + 1; 
    enemyAvatar.src = `assets/enemy${enemyDice}.webp`;
    if (enemyDice == 1) {
        enemyName.textContent = enemyStats[0].name;
        enemyRandom = 0;
    }
    else if (enemyDice == 2) {
        enemyName.textContent = enemyStats[1].name;
        enemyRandom = 1;
    }
    else if (enemyDice == 3) {
        enemyName.textContent = enemyStats[2].name;
        enemyRandom = 2;
    }
}


const enemyStats = [
    { dmg: 20, critical: 10, numofattacks: 2, numofdefenses: 1, name: 'Elon Musk'},
    { dmg: 10, critical: 1, numofattacks: 1, numofdefenses: 4, name: 'Courage the Cowardly Dog'},   
    { dmg: 35, critical: 25, numofattacks: 3, numofdefenses: 3, name: 'Kaidou of the Beasts'}  
];

    
const playerStats =  {
        dmg: 30,
        critical: 10,
    };

const critRate = 1.5;


document.addEventListener('DOMContentLoaded', function() {
    const maxDefenseChoices = 2;
    defenseCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = document.querySelectorAll('input[name="defense"]:checked');
            
            if (checkedBoxes.length > maxDefenseChoices) {
                this.checked = false;
                alert('You can only select 2 defense options!');
            }
        });
    });
});

const fightCalculation = () => {
    let playerAttack = null;
    attackRadio.forEach(radio => {
        if (radio.checked) {
            playerAttack = radio.value;
        }
    });
    let playerDefense = [];
    defenseCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            playerDefense.push(checkbox.value);
        }
    });
    const stats = enemyStats[enemyRandom];
    let enemyAttacks = [];
    for (let i = stats.numofattacks; i > 0; i--) {
        const randomAttack = attackRadio[Math.floor(Math.random() * attackRadio.length)];
        enemyAttacks.push(randomAttack.value); 
    }
    let enemyDefense = [];
    for (let i = stats.numofdefenses; i > 0; i--) {
        const randomDefense = defenseCheckboxes[Math.floor(Math.random() * defenseCheckboxes.length)];
        enemyDefense.push(randomDefense.value);
    }



    console.log('playerDefense', playerDefense);
    console.log('playerAttack', playerAttack);
    console.log('enemyAttacks', enemyAttacks);
    console.log('enemyDefense', enemyDefense);

    if (Math.random() < playerStats.critical) {
        enemyHealth.textContent = enemyHealth.textContent - playerStats.dmg * critRate;
        console.log('critical hit');
    } else if (enemyDefense.includes(playerAttack)) {
        console.log('playerAttack is blocked');  
    } else {
        enemyHealth.textContent = enemyHealth.textContent - playerStats.dmg;
        console.log('normal hit');
    }

    if (Math.random() < enemyStats[enemyRandom].critical) {
        playerHealth.textContent = playerHealth.textContent - enemyStats[enemyRandom].dmg * critRate;
        console.log('critical hit', enemyStats[enemyRandom].dmg * critRate);
    } else if (playerDefense.includes(enemyAttacks)) {
        console.log('enemyAttack is blocked');
    } else {
            playerHealth.textContent = playerHealth.textContent - enemyStats[enemyRandom].dmg;
            console.log('normal hit', enemyStats[enemyRandom].dmg);
        }
    
}


attackButton.addEventListener('click', fightCalculation);

//TODO
//Добавить уникальность зон
//Добавить пробитие защиты